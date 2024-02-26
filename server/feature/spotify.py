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

load_dotenv()

client_id = os.environ["SP_CLI_KEY"]
client_secret = os.environ["SP_SCR_KEY"]

# client_id = os.environ.get("SP_CLI_KEY")
# client_secret = os.environ.get("SP_SCR_KEY")
client_credentials_manager = spotipy.oauth2.SpotifyClientCredentials(
    client_id, client_secret
)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

music = Blueprint("music", __name__, url_prefix="/music")
CORS(music)


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


def insert_info_music(id, user_id):
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

    vector = np.array(
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

    #cursor.execute("UPDATE username SET vector=%s WHERE userid=%s", (vector, user_id))
    db.commit()

    return "insert ok!"


@music.route("/return_music/", methods=["POST"])
def return_music():
    data = request.get_json()
    music_ids = data["music"]
    user_id = data["userid"]  # Assuming this is the user ID
    event_id = int(data["eventid"])

    music_id1 = music_ids[0]
    music_id2 = music_ids[1]
    music_id3 = music_ids[2]

    insert_info_music(music_id1, user_id)
    insert_info_music(music_id2, user_id)
    insert_info_music(music_id3, user_id)

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "UPDATE username SET event_id = %s, music_id1 = %s, music_id2 = %s, music_id3 = %s WHERE userid = %s",
        (event_id, music_id1, music_id2, music_id3, user_id),
    )
    db.commit()
    return "ok"
