DROP TABLE IF EXISTS username CASCADE;
DROP TABLE IF EXISTS oauth CASCADE;
DROP TABLE IF EXISTS post CASCADE;
DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS music CASCADE;
DROP TABLE IF EXISTS post CASCADE;
DROP TABLE IF EXISTS test CASCADE;

CREATE TABLE event(
    id SERIAL PRIMARY KEY,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT UNIQUE NOT NULL,
    body TEXT 
);

CREATE TABLE music(
    acousticness FLOAT,
    danceability FLOAT,
    duration_ms INTEGER,
    energy FLOAT,
    music_id TEXT,
    instrumentalness FLOAT,
    key INTEGER,
    liveness FLOAT,
    loudness FLOAT,
    mode INTEGER,
    speechiness FLOAT,
    tempo FLOAT,
    time_signature INTEGER,
    valence FLOAT
);

CREATE TABLE username(
    id SERIAL PRIMARY KEY,
    userid TEXT UNIQUE NOT NULL,
    icon_url TEXT DEFAULT 'https://soco-st.com/wp-content/themes/socost/upload/18225_color.svg',
    name TEXT NOT NULL,
    event_id INTEGER,
    music_id1 TEXT,
    music_id2 TEXT,
    music_id3 TEXT,
    FOREIGN KEY (event_id) REFERENCES event (id)
);

CREATE TABLE oauth(
    id SERIAL PRIMARY KEY,
    identify_type TEXT NOT NULL,
    identifier TEXT NOT NULL,
    credential TEXT NOT NULL,
    FOREIGN KEY (identifier) REFERENCES username (userid)
);
