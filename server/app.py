from flask import Flask,g,current_app
from flask_cors import CORS
import os
import psycopg2

app = Flask(__name__, instance_relative_config=True)
CORS(app)
app.json.ensure_ascii = False

app.config.from_mapping(
    SECRET_KEY="dev",
    DB=os.environ["DATABASE_URL"],
)

# from feature import auth
# app.register_blueprint(auth.bp)

from feature import db
@app.route("/init_db")
def init_db():
    db.init_db()
    return "DB initialized"

if __name__ == "__main__":
    app.run(debug=True)
