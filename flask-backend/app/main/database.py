import sqlite3
from flask import current_app, g

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(current_app.config['DATABASE_URI'])
    return db

def log_query(session_id, state, raw_query, parsed_query):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("INSERT INTO Queries (session_id, state, raw_query, parsed_query) VALUES (?, ?, ?, ?)", (session_id, state, raw_query, parsed_query))
    conn.commit()
    cur.close()

def log_click(session_id, click_event):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("INSERT INTO Clicks (session_id, click_event) VALUES (?, ?)", (session_id, click_event))
    conn.commit()
    cur.close()
