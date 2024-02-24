from flask import Flask
from flask_cors import CORS
import os

# app=Flask(__name__,instance_relative_config=True)
# CORS(app)
# app.json.ensure_ascii=False

# app.config.from_mapping(
#     SECRET_KEY="dev",
#     DATABASE=os.path.join(app.instance_path,"flaskr.sqlite")
# )

# try:
#     os.mkdir(app.instance_path)
# except OSError:
#     pass

# from feature import db
# db.init_app(app)
# from feature import auth
# app.register_blueprint(auth.bp)

app=Flask(__name__)
app.json.ensure_ascii=False

@app.route("/")
def hello():
  return "hello, heroku!!"

if __name__ == '__main__':
    app.run()