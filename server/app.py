from flask import Flask, jsonify, request
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from openai import OpenAI
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
app = Flask(__name__)

api_key = "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"
client = OpenAI(api_key=api_key)

client_id = 'a6bd17dc6fb74c3fba04930d83b6bc94' 
client_secret = 'f5f882869d3547f3a52216216981bed7' 
client_credentials_manager = spotipy.oauth2.SpotifyClientCredentials(client_id, client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

def get_embedding(text, model="text-embedding-ada-002"):
    response = client.embeddings.create(input=[text], model=model)
    return response.data[0].embedding

def load_and_update_data():
    # original_data.jsonからデータを読み込む
    with open('original_data.json', 'r', encoding='utf-8') as file:
        data = json.load(file)["data"]

    # ベクトルを生成してデータを更新
    updated_data = []
    for item in data:
        text = item["user_name"] + " " + item["song_name"]
        vector = get_embedding(text)
        updated_data.append({
            "user_name": item["user_name"],
            "song_name": item["song_name"],
            "vector": vector
        })

    # updated_data.jsonに結果を保存
    with open('updated_data.json', 'w', encoding='utf-8') as file:
        json.dump({"data": updated_data}, file, ensure_ascii=False)

#render_templateが定義されていいなくてエラー出るので一旦退避
# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route('/aritcle/<string:artist>')
def return_artist(artist):
    art_name=artist
    art_search = sp.search(art_name,type='artist')
    art_id = art_search['artists']['items'][0]['id'] 
    art_alb = sp.artist_albums(art_id, limit=50,album_type='album') 
    alb_ids = [alb['id'] for alb in art_alb['items']] 
    tra_id_name = []
    for alb_id in alb_ids:
        tracks = sp.album_tracks(alb_id, limit=50)["items"]
        for track_num,track in enumerate(tracks):
            dict = {'name':track["name"],'id':track["id"]}
            tra_id_name.append(dict)
    return tra_id_name

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    # updated_data.jsonからデータを読み込む
    with open('updated_data.json', 'r', encoding='utf-8') as file:
        data = json.load(file)['data']

    vectors = np.array([item['vector'] for item in data])
    cosine_sim_matrix = cosine_similarity(vectors)

    recommendations = []
    for i, user_data in enumerate(data):
        similarities = cosine_sim_matrix[i].copy()
        similarities[i] = 0
        top_3_indexes = np.argsort(similarities)[-3:][::-1]
        top_3_recommendations = [{"user_name": data[idx]['user_name'], "song_name": data[idx]['song_name']} for idx in top_3_indexes]
        recommendations.append({
            "user_name": user_data['user_name'],
            "song_name": user_data['song_name'],
            "recommendations": top_3_recommendations
        })

    return jsonify(recommendations)

if __name__ == '__main__':
    load_and_update_data()  # アプリケーション起動時に一度だけデータを更新
    app.run(debug=True)