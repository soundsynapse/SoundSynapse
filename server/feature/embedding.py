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

#load_dotenv()

#client_id = os.environ["SP_CLI_KEY"]
#client_secret = os.environ["SP_SCR_KEY"]

#api_key = os.environ["OPENAI_API_KEY"]
#openai.api_key = api_key  # OpenAIのAPIキーを設定

#client_credentials_manager = spotipy.oauth2.SpotifyClientCredentials(
    #client_id, client_secret
)
#sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

music = Blueprint("music", __name__, url_prefix="/music")
CORS(music)

ai = Blueprint("embedding", __name__, url_prefix="/ai")
#def cosine_similarity(vec1, vec2):
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    #return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

#def matching(event_id, average_vector):
    db = get_db()
    cursor = db.cursor()

    user_vector = average_vector[0]  

    cursor.execute("SELECT userid, vector FROM username WHERE event_id = %s", (event_id,))
    users = cursor.fetchall()

    max_similarity = -1
    matching_user_id = None
    for user_id, vec in users:
        similarity = cosine_similarity(user_vector, vec)
        if similarity > max_similarity:
            max_similarity = similarity
            matching_user_id = user_id

    #return matching_user_id

#@music.route("/matching/<int:event_id>/<string:user_id>",methods=["GET"])
#def matching_ss(event_id, user_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT vector FROM username WHERE userid = %s", (user_id,))
    user_vector = cursor.fetchone()
    matching_user_id = matching(event_id, user_vector)
    
    #return jsonify({"matching_user_id": matching_user_id})
