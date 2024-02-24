#import sqlite3
import psycopg2

import click
from flask import current_app, g
import os

DB=os.environ["DATABASE_URL"]

def get_db():
    if not hasattr(g,"pg_conn"):
        g.pg_conn = psycopg2.connect(
            DB
        )
    return g.pg_conn


def close_db(e=None):
    db = g.pop("pg_conn", None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()
    cursor = db.cursor()

    with current_app.open_resource('schema.sql') as f:
        schema = f.read().decode('utf8')
        statements = schema.split(';')
        for statement in statements:
            if statement.strip() != '':
                cursor.execute(statement)
    db.commit()
# def init_db():
#     db = get_db()
#     cursor=db.cursor()

#     with current_app.open_resource("schema.sql") as f:
#         schema = f.read().decode("utf8")
#         for statement in schema.split(";"):
#             statement = statement.strip()  # Remove leading/trailing whitespaces
#             if statement:  # Skip empty statements
#                 if "CREATE TABLE" in statement:
#                     table_name = (
#                         statement.split("CREATE TABLE")[1].split("(")[0].strip()
#                     )
#                     cursor.execute(f"DROP TABLE IF EXISTS {table_name}")
#                 cursor.execute(statement)
#     db.commit()

# @click.command("init-db")
# def init_db_command():
#     """Clear the existing data and create new tables."""
#     close_db()
#     init_db()
#     click.echo("Initialized the database.")


# def init_app(app):
#     app.teardown_appcontext(close_db)
#     app.cli.add_command(init_db_command)
