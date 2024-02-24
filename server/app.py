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

app1=Flask(__name__)
app1.json.ensure_ascii=False

@app1.route("/")
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    app1.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)), debug=True)