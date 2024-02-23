import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
from flask import Flask, jsonify, request, render_template

client_id = os.environ.get("SP_CLI_KEY") 
client_secret = os.environ.get("SP_SCR_KEY")
client_credentials_manager = spotipy.oauth2.SpotifyClientCredentials(client_id, client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

app = Flask(__name__)

@app.route('/artist/<string:artist>')
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
@app.route('/info_music/<string:id>')
def info_music(id):
    #ずとまよの曲「勘が冴えて悔しいわ」のID->7zbfS30vKiHU8oBs6Wi1Qp
    result=sp.audio_features(id)
    return result