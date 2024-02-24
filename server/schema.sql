CREATE TABLE username(
    id SERIAL PRIMARY KEY,
    userid TEXT UNIQUE NOT NULL,
    icon_url TEXT DEFAULT 'https://soco-st.com/wp-content/themes/socost/upload/18225_color.svg',
    name TEXT NOT NULL
);

CREATE TABLE oauth(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    identify_type TEXT NOT NULL,
    identifier TEXT NOT NULL,
    credential TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES username (id)
);

CREATE TABLE post(
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES "user" (id)
);