from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
import numpy as np
import os
import re
from sklearn.metrics.pairwise import cosine_similarity
import openai

app = Flask(__name__)

# データベース設定（PostgreSQL）
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# データベースモデルの定義
class Track(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    track_name = db.Column(db.String, nullable=False)
    artist_name = db.Column(db.String)
    album_name = db.Column(db.String)
    release_date = db.Column(db.String)
    track_length = db.Column(db.Integer)
    popularity = db.Column(db.Integer)
    # 他のフィールドも同様に追加...
class UserTrackSelection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    track_id = db.Column(db.Integer, db.ForeignKey('track.id'), nullable=False)


# OpenAIのAPIキー設定
openai.api_key = "YOUR_API_KEY"

def get_embedding(text, model="text-embedding-ada-002"):
    text = text.replace("\n", " ")
    response = openai.Embedding.create(input=[text], engine=model)
    return response['data'][0]['embedding']

@app.before_first_request
def setup():
    # データベースのテーブルを作成
    db.create_all()

    # CSVからデータを読み込み、データベースに保存
    if not Track.query.first():
        df = pd.read_csv('A_table.csv')
        for _, row in df.iterrows():
            track = Track(
                track_name=row['トラック名'],
                artist_name=row['アーティスト名'],
                album_name=row['アルバム名'],
                release_date=row['発売日'],
                track_length=row['トラックの長さ'],
                popularity=row['人気度']
                # 他のフィールドも同様に追加...
            )
            db.session.add(track)
        db.session.commit()

@app.route('/')
def index():
    # データベースからトラック名を取得
    tracks = Track.query.with_entities(Track.track_name).all()
    tracks = [track[0] for track in tracks]
    return render_template('index.html', tracks=tracks)

@app.route('/recommend', methods=['POST'])
def recommend():
    selected_track = request.form.get('track')
    user_id = request.form.get('user_id')  # ユーザーIDを取得する

    # 選択されたトラックの情報を取得
    track_info = Track.query.filter_by(track_name=selected_track).first()

    # 選択されたトラックとユーザーIDをUserTrackSelectionに保存
    user_track_selection = UserTrackSelection(user_id=user_id, track_id=track_info.id)
    db.session.add(user_track_selection)
    db.session.commit()

    # ベクトル化
    embedding = get_embedding(' '.join([track_info.track_name, track_info.artist_name, track_info.album_name]))
    
    # 他の全トラックの情報を取得
    all_tracks = Track.query.all()
    all_embeddings = [get_embedding(' '.join([t.track_name, t.artist_name, t.album_name])) for t in all_tracks]

    # 類似度の計算
    similarity = cosine_similarity([embedding], all_embeddings)
    
    # 最も類似度が高い曲を見つける
    index_of_most_similar = similarity.argmax()
    most_similar_track = all_tracks[index_of_most_similar]

    # その曲を選んだ他のユーザーを見つける
    other_user_selection = UserTrackSelection.query.filter_by(track_id=most_similar_track.id).first()
    if other_user_selection:
        other_user_id = other_user_selection.user_id
        # 他のユーザーの名前を取得するロジックをここに追加
        # 例: other_user_name = User.query.get(other_user_id).name
    else:
        other_user_id = None
        # other_user_name = None

    return render_template('recommend.html', selected_track=selected_track, recommendation=most_similar_track.track_name, other_user=other_user_id)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)