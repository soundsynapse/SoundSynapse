DROP TABLE IF EXISTS username CASCADE;
DROP TABLE IF EXISTS oauth CASCADE;
DROP TABLE IF EXISTS post CASCADE;

CREATE TABLE username(
    id SERIAL PRIMARY KEY,
    userid TEXT  NOT NULL,
    icon_url TEXT DEFAULT 'https://soco-st.com/wp-content/themes/socost/upload/18225_color.svg',
    name TEXT NOT NULL
);

CREATE TABLE oauth(
    id SERIAL PRIMARY KEY,
    identify_type TEXT NOT NULL,
    identifier TEXT NOT NULL,
    credential TEXT NOT NULL,
    FOREIGN KEY (identifier) REFERENCES username (userid)
);

CREATE TABLE post(
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES username (id)
);