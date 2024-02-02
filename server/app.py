from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sklearn.metrics.pairwise import cosine_similarity
import openai
import os
import requests
import numpy as np
import return_artist as ra  # return_artist.pyはSpotify APIを呼び出すためのコード

app = Flask(__name__)

openai.api_key = ""

# 秘密鍵の設定
app.secret_key = os.urandom(24)

# データベース設定（SQLiteを使用する場合）
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///musicdatabase.db'  # musicdatabase.dbはデータベースファイル名
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# データベースモデルの定義 (ユーザーとトラック)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Track(db.Model):
    track_name = db.Column(db.String, nullable=False)
    # 他のトラック情報フィールド...
    acousticness=db.Column(db.Float)
    danceability=db.Column(db.Float)
    duration_ms=db.Column(db.Integer)
    energy=db.Column(db.Float)
    id = db.Column(db.Integer, primary_key=True)
    instrumentalness=db.Column(db.Integer)
    key=db.Column(db.Integer)
    liveness=db.Column(db.Float)
    mode=db.Column(db.Integer)
    speechiness=db.Column(db.Float)
    tempo=db.Column(db.Float)
    time_signature=db.Column(db.Integer)
    type=db.Column(db.String)
    valence=db.Column(db.Float)
    embedding=db.Column(db.PickleType)  # ベクトルを保存するためのカラム

class UserTrackSelection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    track_id = db.Column(db.Integer, db.ForeignKey('track.id'), nullable=False)

@app.route('/artist/<string:artist>')
def return_name(artist):
    return ra.return_artist(artist)

# 登録ページに遷移させる
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # ユーザー名が既に存在するか確認
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash('このユーザー名は既に使用されています。')
            return redirect(url_for('register'))

        # 新しいユーザーを作成し、データベースに追加
        new_user = User(username=username)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        flash('登録が完了しました。ログインしてください。')
        return redirect(url_for('login'))

    return render_template('register.html')

# ログイン処理
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            session['user_id'] = user.id
            return redirect(url_for('index'))

        flash('無効なユーザー名またはパスワードです。')

    return render_template('login.html')

import requests

# Spotify APIのエンドポイントと認証情報
SPOTIFY_API_ENDPOINT = 'https://api.spotify.com/v1/your_endpoint_here'
YOUR_ACCESS_TOKEN = 'your_access_token_here'

def get_spotify_tracks():
    # Spotify APIから曲情報を取得し、それをデータベースに保存します。
    
    # Spotify APIエンドポイントへのリクエスト
    headers = {'Authorization': f'Bearer {YOUR_ACCESS_TOKEN}'}
    response = requests.get(SPOTIFY_API_ENDPOINT, headers=headers)

    # レスポンスをJSON形式にパース
    tracks = response.json()

    # 各トラック情報をデータベースに保存
    for track_info in tracks['items']:
        save_track_to_database(track_info)

def save_track_to_database(track_info):
    # 取得した曲情報をデータベースに保存します。
    
    # 例: 曲情報から必要なフィールドを取得
    track_name = track_info['name']
    artist_name = track_info['artists'][0]['name']  # 例として最初のアーティスト名を取得
    
    # データベースに新しいトラックを追加
    new_track = Track(
    track_name=track_name,
    artist_name=artist_name,
    acousticness=0.75,  # 例: acousticnessの値を指定
    danceability=0.80,  # 例: danceabilityの値を指定
    duration_ms=300000,  # 例: duration_msの値を指定
    # 他のトラック情報フィールド...
)
    db.session.add(new_track)
    db.session.commit()

@app.route('/select_track', methods=['POST'])
def select_track():
    track_id = request.form['track_id']
    user_id = session.get('user_id')

    if not user_id:
        flash('ログインが必要です。')
        return redirect(url_for('login'))

    # 選択された曲とユーザーIDをUserTrackSelectionに保存
    user_track_selection = UserTrackSelection(user_id=user_id, track_id=track_id)
    db.session.add(user_track_selection)
    db.session.commit()

    return redirect(url_for('index'))

def get_embedding(text, model="text-embedding-ada-002"):
    text = text.replace("\n", " ")
    response = openai.Embedding.create(input=[text], model=model)
    return response['data'][0]['embedding']

@app.route('/generate_embeddings')
def generate_embeddings():
    # データベースから全曲の情報を取得
    tracks = Track.query.all()
    
    for track in tracks:
        # 各曲のテキストからベクトルを生成
        embedding = get_embedding(f"{track.artist_name} {track.track_name}")
        
        # 生成したベクトルをデータベースに保存
        track.embedding = embedding
        db.session.add(track)

    db.session.commit()
    return "ベクトル生成完了"

SIMILARITY_THRESHOLD = 0.5  # ベクトルの閾値

@app.route('/find_similar_users', methods=['GET', 'POST'])
def find_similar_users():
    current_user_id = session.get('user_id')

    if not current_user_id:
        flash('ログインが必要です。')
        return redirect(url_for('login'))

    # 現在のユーザーの選択した曲のエンベディングを取得
    current_user_selections = UserTrackSelection.query.filter_by(user_id=current_user_id).all()
    current_user_embeddings = [Track.query.get(selection.track_id).embedding for selection in current_user_selections]

    # 他の全ユーザーの選択した曲と比較
    similar_users = []
    all_users = User.query.filter(User.id != current_user_id).all()
    for user in all_users:
        user_selections = UserTrackSelection.query.filter_by(user_id=user.id).all()
        user_embeddings = [Track.query.get(selection.track_id).embedding for selection in user_selections]

        # コサイン類似度を計算
        similarity = cosine_similarity(current_user_embeddings, user_embeddings)
        average_similarity = np.mean(similarity)

        if average_similarity > SIMILARITY_THRESHOLD:  # 類似度の閾値を設定
            similar_users.append({'user': user, 'similarity': average_similarity})

    # 類似度が高いユーザーとその選択した曲を返す
    similar_users = sorted(similar_users, key=lambda x: x['similarity'], reverse=True)
    return render_template('similar_users.html', similar_users=similar_users)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True)
