from flask import Flask,Blueprint

app=Blueprint("app",__name__,url_prefix="/test")

@app.route("/")
def test():
    return "test"

def init_test():
    return "init_test()"