import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
from flask import Flask, Blueprint,request
from dotenv import load_dotenv
import requests
from .db import get_db
from flask_cors import CORS

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

@music.route("/info_music/<string:id>")
def info_music(id):
    # ずとまよの曲「勘が冴えて悔しいわ」のID->7zbfS30vKiHU8oBs6Wi1Qp
    result = sp.audio_features(id)
    return result

@music.route("/return_music/", methods=["GET","POST"])
def return_music():
    data = request.json
    music_ids = data["music"]
    id=data["userid"]
    event_id=data["eventid"]

    music_id1=int(music_ids[0])
    music_id2=int(music_ids[1])
    music_id3=int(music_ids[2])

    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        'INSERT INTO username (event_id,music_id1,music_id2,music_id3) VALUES (%s,%s,%s,%s)',
        (event_id,music_id1,music_id2,music_id3)
    )
    db.commit()

@music.route("/test", methods=["POST"])
def test():
    data = request.json
    return print(data)

