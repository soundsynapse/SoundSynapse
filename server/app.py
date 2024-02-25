from flask import Flask, g, current_app
from flask_cors import CORS
import os
import psycopg2
from dotenv import load_dotenv
#from flask_session import Session

load_dotenv()

app = Flask(__name__, instance_relative_config=True)
app.json.ensure_ascii = False
CORS(app, origins=["http:"], methods=["GET", "POST"])

app.config.from_mapping(
    SECRET_KEY="dev",
    DB=os.environ["DATABASE_URL"],
)


# app.config.from_mapping(
#     SECRET_KEY="dev",
#     DB=os.environ.get("DATABASE_URL"),
# )

#Session(app)
from feature import auth

app.register_blueprint(auth.bp)

from feature import spotify

app.register_blueprint(spotify.music)

from feature import db

from feature import event
app.register_blueprint(event.event)
@app.route("/init_db")
def init_db():
    db.init_db()
    return "DB initialized!"


if __name__ == "__main__":
    app.run(debug=True)
