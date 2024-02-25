from flask import Flask, Blueprint,jsonify
from .db import get_db

event=Blueprint("event",__name__,url_prefix="/event")

@event.route("/create_event/<string:event_name>")
def create_event(event_name):
    db = get_db()
    cursor=db.cursor()

    cursor.execute(
        'INSERT INTO event (created,title) VALUES (NOW(),%s)',
        (event_name,)
    )
    db.commit()
    return "create_event"

@event.route("/delete_event/<string:event_name>")
def delete_event(event_name):
    db = get_db()
    cursor=db.cursor()

    cursor.execute(
        'DELETE FROM event WHERE title=%s',
        (event_name)
    )
    db.commit()
    return "delete_event"   

@event.route("/get_event")
def get_event():
    db = get_db()
    cursor=db.cursor()

    cursor.execute(
        'SELECT id,title FROM event '
    )
    results=cursor.fetchall()

    events = [{"id": result[0], "title": result[1]} for result in results]

    return jsonify(events)