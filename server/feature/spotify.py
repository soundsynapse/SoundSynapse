import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
from flask import Flask, Blueprint, request
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


def get_embedding_batch(texts, model="text-embedding-3-small"):
    data = {"input": texts, "model": model}
    response = openai.Embedding.create(**data)  # 展開して引数として渡す
    embeddings = [embedding["embedding"] for embedding in response["data"]]
    return embeddings


# 変更点: 数値属性をテキスト説明に変換する関数を追加
def convert_music_data_to_text(music_data):
    text_descriptions = []
    for data in music_data:
        description = f"Music ID {data['music_id']} has an acousticness of {data['acousticness']}, danceability of {data['danceability']}, duration of {data['duration_ms']} ms, energy of {data['energy']}, instrumentalness of {data['instrumentalness']}, key of {data['key']}, liveness of {data['liveness']}, loudness of {data['loudness']} dB, mode of {data['mode']}, speechiness of {data['speechiness']}, tempo of {data['tempo']} BPM, time signature of {data['time_signature']}, and valence of {data['valence']}."
        text_descriptions.append(description)
    return text_descriptions


def Matching_music(music1, music2, music3):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM music WHERE music_id = %s", (music1,))
    music1_data = cursor.fetchone()

    cursor.execute("SELECT * FROM music WHERE music_id = %s", (music2,))
    music2_data = cursor.fetchone()

    cursor.execute("SELECT * FROM music WHERE music_id = %s", (music3,))
    music3_data = cursor.fetchone()

    # 変更点: 音楽データの数値属性をテキスト説明に変換
    music_data_list = [music1_data, music2_data, music3_data]
    music_text_descriptions = convert_music_data_to_text(music_data_list)

    # 変更点: テキスト説明からエンベディングを取得
    music_vectors = get_embedding_batch(music_text_descriptions)

    cursor.execute("SELECT * FROM music")
    all_music_data = cursor.fetchall()

    # 変更点: 全音楽データに対しても同様の変換を適用
    all_music_text_descriptions = convert_music_data_to_text(all_music_data)
    all_music_vectors = get_embedding_batch(all_music_text_descriptions)

    similarities = cosine_similarity(music_vectors, all_music_vectors)
    most_similar_indices = np.argmax(similarities, axis=1)
    most_similar_music_ids = [
        all_music_data[i]["music_id"] for i in most_similar_indices
    ]

    return json.dumps(most_similar_music_ids)


# 使用例result = Matching_music("music_id1", "music_id2", "music_id3")
# print(result)


def Matching_music_test():

    # db = get_db()
    # cursor = db.cursor()

    # wait_seconds=2
    # #cursor.execute("SELECT * FROM music WHERE music_id = %s", (music1,))
    # music1_data = cursor.fetchone()
    embedding_test = get_embedding_batch("つかれたよーん")
    # cursor.execute("SELECT * FROM music WHERE music_id = %s", (music2,))
    # music2_data = cursor.fetchone()

    # cursor.execute("SELECT * FROM music WHERE music_id = %s", (music3,))
    # music3_data = cursor.fetchone()
    # music1, music2, music3の情報をJSON形式に変換してベクトル化
    # try:
    #     music1_vector = get_embedding(json.dumps(music1_data))
    # except :
    #     return "error"
    # while True:
    #     try:
    #         music2_vector = get_embedding(json.dumps(music2_data))
    #         break
    #     except:
    #         time.sleep(wait_seconds)
    # while True:
    #     try:
    #         music3_vector = get_embedding(json.dumps(music3_data))
    #         break
    #     except:
    #         time.sleep(wait_seconds)
    return embedding_test

    # return {"DBの情報": music1_data, "vectorの情報": music1_vector}


@music.route("/matching_music/")
def matching_music():
    result = Matching_music_test()
    return result


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

    closest = min(vectors, key=lambda x: abs(x[0] - average))
    matching_user =[]
    cursor.execute(
        "SELECT userid,music_id1,music_id2,music_id3 FROM username WHERE vector = %s", (closest[0],)
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


@music.route("/return_music/", methods=["POST","GET"])
def return_music():
    ave_index = 3
    data = request.get_json()
    music_ids = data["music"]
    user_id = data["userid"]  # Assuming this is the user ID
    event_id = int(data["eventid"])

    music_id1 = music_ids[0]
    music_id2 = music_ids[1]
    music_id3 = music_ids[2]

    ave1 = insert_info_music(music_id1)
    ave2 = insert_info_music(music_id2)
    ave3 = insert_info_music(music_id3)
    average = (ave1 + ave2 + ave3) / ave_index

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "UPDATE username SET event_id = %s, music_id1 = %s, music_id2 = %s, music_id3 = %s,vector=%s WHERE userid = %s",
        (
            event_id,
            music_id1,
            music_id2,
            music_id3,
            average,
            user_id,
        ),
    )
    db.commit()

    matching_result = matching(event_id, average)
    #print(closest)
    # Matching_music(music_id1, music_id2, music_id3)
    #waiwai
    return matching_result
