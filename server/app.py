from flask import Flask
from flask_cors import CORS
import os

app=Flask(__name__,instance_relative_config=True)
CORS(app)
app.json.ensure_ascii=False

app.config.from_mapping(
    SECRET_KEY="dev",
    DATABASE=os.environ['DATABASE_URL'],
)

from feature import db
db.init_db()
# from feature import auth
# app.register_blueprint(auth.bp)


@app.route("/")
def hello():
     return "init-db()"

from feature import test
app.register_blueprint(test.app)

if __name__ == '__main__':
    app.run()