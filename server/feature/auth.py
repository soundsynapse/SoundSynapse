import functools
from flask import (
    Blueprint,
    flash,
    g,
    redirect,
    render_template,
    request,
    session,
    url_for,
)
from .db import get_db
from requests_oauthlib import OAuth1Session
import urllib.parse as parse
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.environ["TW_CLI_KEY"]
api_secret = os.environ["TW_SCR_KEY"]

# Twitter Endpoint
twitter_base_url = "https://api.twitter.com"
authorization_endpoint = twitter_base_url + "/oauth/authenticate"
request_token_endpoint = twitter_base_url + "/oauth/request_token"
token_endpoint = twitter_base_url + "/oauth/access_token"
credentials = twitter_base_url + "/1.1/account/verify_credentials.json"

bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.route("/twitter_login", methods=("GET", "POST"))
def twitter_login():
    # 1.リクエストトークンを取得する。
    # (Step 1: Obtaining a request token:https://developer.twitter.com/en/docs/authentication/guides/log-in-with-twitter)
    twitter = OAuth1Session(api_key, api_secret)
    # oauth_callback = request.args.get('oauth_callback')
    oauth_callback = "https://soundsynapse-316201ce96e2.herokuapp.com/auth/callback"
    res = twitter.post(
        request_token_endpoint, params={"oauth_callback": oauth_callback}
    )
    request_token = dict(parse.parse_qsl(res.content.decode("utf-8")))
    print(request_token)
    oauth_token = request_token["oauth_token"]
    oauth_token_secret = request_token["oauth_token_secret"]
    # 2.リクエストトークンを指定してTwitterへ認可リクエスト(Authorization Request)を行う。
    # (Step 2: Redirecting the user:https://developer.twitter.com/en/docs/authentication/guides/log-in-with-twitter#tab2)
    return redirect(
        authorization_endpoint
        + "?{}".format(parse.urlencode({"oauth_token": oauth_token}))
    )


@bp.route("/callback")
def callback():
    db = get_db()

    # 3.ユーザー認証/同意を行い、認可レスポンスを受け取る。
    oauth_verifier = request.args.get("oauth_verifier")
    oauth_token = request.args.get("oauth_token")

    # 4.認可レスポンスを使ってトークンリクエストを行う。
    # (Step 3: Converting the request token to an access token:https://developer.twitter.com/en/docs/authentication/guides/log-in-with-twitter#tab3)
    twitter = OAuth1Session(api_key, api_secret, oauth_token)

    res = twitter.post(token_endpoint, params={"oauth_verifier": oauth_verifier})

    access_token = dict(parse.parse_qsl(res.content.decode("utf-8")))

    twitter = OAuth1Session(
        api_key,
        api_secret,
        access_token["oauth_token"],
        access_token["oauth_token_secret"],
    )
    response = twitter.get(
        "https://api.twitter.com/1.1/account/verify_credentials.json"
    )
    user_info = response.json()

    # ユーザー名とアイコンのURLを取得
    userid = user_info["screen_name"]
    icon_url = user_info["profile_image_url_https"]
    name = user_info["name"]

    cursor = db.cursor()

    cur = cursor.execute(
        "INSERT INTO username (userid,icon_url,name) VALUES (%s,%s,%s)",
        (userid, icon_url, name),
    )
    db.commit()
    last_inserted_id = cur.lastrowid
    db.execute(
        "INSERT INTO oauth (user_id,identify_type,identifier,credential) VALUES (%s,%s,%s,%s)",
        (last_inserted_id, "twitter", userid, access_token["oauth_token_secret"]),
    )
    db.commit()

    return {"userid": userid, "icon_url": icon_url, "name": name}
    # return redirect(url_for("index"))


@bp.before_app_request
def load_logged_in_user():
    user_id = session.get("user_id")

    if user_id is None:
        g.user = None
    else:
        g.user = (
            get_db().execute("SELECT * FROM user WHERE id=%s", (user_id,)).fetchone()
        )


@bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))


@bp.route("/")
def index():
    return "index"


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for("auth.login"))
        return view(**kwargs)

    return wrapped_view
