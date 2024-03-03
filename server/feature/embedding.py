import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
from flask import Flask, Blueprint, request, jsonify
from dotenv import load_dotenv
import requests
from .db import get_db
from flask_cors import CORS
import json
import numpy as np
import openai  # OpenAIのクライアントライブラリを使用

load_dotenv()

client_id = os.environ["SP_CLI_KEY"]
client_secret = os.environ["SP_SCR_KEY"]

api_key = os.environ["OPENAI_API_KEY"]
openai.api_key = api_key  # OpenAIのAPIキーを設定

client_credentials_manager = spotipy.oauth2.SpotifyClientCredentials(
    client_id, client_secret
)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

music = Blueprint("music", __name__, url_prefix="/music")
CORS(music)

ai = Blueprint("embedding", __name__, url_prefix="/ai")

def matching(event_id, average):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT vector FROM username WHERE event_id = %s AND vector !=%s",
        (
            event_id,
            average,
        ),
    )
    vectors = cursor.fetchall()

    closest = min(vectors, key=lambda x: abs(x[0] - average[0]))
    matching_user =[]
    cursor.execute(
        "SELECT name,icon_url,music_id1,music_id2,music_id3,userid FROM username WHERE vector = %s", (closest[0],)
    )
    matching_user.append(cursor.fetchone())
    return matching_user


@music.route("/artist/<string:artist>")
def return_artist(artist):
    art_name = artist
    art_search = sp.search(art_name, type="artist")
    art_id = art_search["artists"]["items"][0]["id"]
    art_alb = sp.artist_albums(art_id, limit=50, album_type="album")
    alb_ids = [alb["id"] for alb in art_alb["items"]]
    tra_id_name = []
    for alb_id in alb_ids:
        tracks = sp.album_tracks(alb_id, limit=50)["items"]
        for track_num, track in enumerate(tracks):
            dict = {"name": track["name"], "id": track["id"]}
            tra_id_name.append(dict)
    return tra_id_name


def info_music(id):
    # ずとまよの曲「勘が冴えて悔しいわ」のID->7zbfS30vKiHU8oBs6Wi1Qp
    result = sp.audio_features(id)
    return result


def insert_info_music(id):
    db = get_db()
    cursor = db.cursor()

    music_info = info_music(id)
    data_dict = music_info[0]

    acousticness = data_dict["acousticness"]
    danceability = data_dict["danceability"]
    duration_ms = data_dict["duration_ms"]
    energy = data_dict["energy"]
    instrumentalness = data_dict["instrumentalness"]
    key = data_dict["key"]
    liveness = data_dict["liveness"]
    loudness = data_dict["loudness"]
    mode = data_dict["mode"]
    speechiness = data_dict["speechiness"]
    tempo = data_dict["tempo"]
    time_signature = data_dict["time_signature"]
    valence = data_dict["valence"]

    ave_val = []
    ave_val.extend(
        [
            float(acousticness),
            float(danceability),
            float(duration_ms),
            float(energy),
            float(instrumentalness),
            float(key),
            float(liveness),
            float(loudness),
            float(mode),
            float(speechiness),
            float(tempo),
            float(time_signature),
            float(valence),
        ]
    )

    average = sum(ave_val) / len(ave_val)

    insert_sql = """
    INSERT INTO music (acousticness, danceability, duration_ms, energy,music_id, instrumentalness, key, liveness, loudness, mode, speechiness, tempo, time_signature, valence)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    cursor.execute(
        insert_sql,
        (
            acousticness,
            danceability,
            duration_ms,
            energy,
            id,
            instrumentalness,
            key,
            liveness,
            loudness,
            mode,
            speechiness,
            tempo,
            time_signature,
            valence,
        ),
    )

    # cursor.execute("UPDATE username SET vector=%s WHERE userid=%s", (average, user_id))
    db.commit()

    return average

def get_embedding(text, model="text-embedding-3-small"):
    text = text.replace("\n", " ")
    response = openai.Embedding.create(input=text, model=model)
    embedding = response['data'][0]['embedding']
    return np.array(embedding)

@music.route("/return_music/", methods=["POST", "GET"])
def return_music():
    data = request.get_json()
    music_ids = data["music"]
    user_id = data["userid"]
    event_id = int(data["eventid"])

    db = get_db()
    cursor = db.cursor()

    # 各音楽IDに対してベクトルを取得し、それらの平均を計算
    vectors = []
    for music_id in music_ids:
        # ここで音楽情報を取得し、テキスト化してベクトル化
        music_info = info_music(music_id)  # 仮の関数を呼び出し
        if music_info:
            music_features_text = json.dumps(music_info)
            music_vector = get_embedding(music_features_text)
            vectors.append(music_vector)

    # ベクトルの平均を計算
    if vectors:
        average_vector = np.mean(vectors, axis=0)
        average_vector_json = json.dumps(average_vector.tolist())
    else:
        return jsonify({"error": "No valid music vectors found"}), 400

    # 平均ベクトルをデータベースに保存
    cursor.execute(
        "UPDATE username SET event_id = %s, music_id1 = %s, music_id2 = %s, music_id3 = %s, vector = %s WHERE userid = %s",
        (
            event_id,
            music_ids[0] if len(music_ids) > 0 else None,
            music_ids[1] if len(music_ids) > 1 else None,
            music_ids[2] if len(music_ids) > 2 else None,
            average_vector_json,  
            user_id,
        ),
    )
    db.commit()

    #print(closest)
    # Matching_music(music_id1, music_id2, music_id3)
    #waiwai
    return "ok"

@music.route("/matching/<int:event_id>/<string:user_id>",methods=["GET"])
def matching_ss(event_id, user_id):
    db=get_db()
    cursor=db.cursor()
    cursor.execute("SELECT vector FROM username WHERE userid = %s ",(user_id,))
    average = cursor.fetchone()
    matching_result = matching(event_id, average)
    return matching_result
