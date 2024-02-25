from sklearn.metrics.pairwise import cosine_similarity
from openai import OpenAI
import json
import os
import numpy as np
import pandas as pd
from flask import Flask, jsonify
api_key = os.environ.get("OPEN_AI_KEY")
client = OpenAI(api_key=api_key)

def get_embedding(text, model="text-embedding-ada-002"):
    response = client.embeddings.create(input=[text], model=model)
    return response.data[0].embedding


def load_and_update_data():
    # original_data.jsonからデータを読み込む
    with open('updated_japanese_data.json', 'r', encoding='utf-8') as file:
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


@app.route('/get_recommendations/<string:recommendations>')
def get_recommendations(recommendations):
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