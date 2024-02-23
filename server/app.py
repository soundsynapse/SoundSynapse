from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
     return render_template('index.html')

app.json.ensure_ascii = False        

if __name__ == '__main__':
    app.run(debug=True)
