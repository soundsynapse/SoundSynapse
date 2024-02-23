DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;

CREATE TABLE user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid TEXT UNIQUE NOT NULL,
    icon_url TEXT DEFAULT 'https://soco-st.com/wp-content/themes/socost/upload/18225_color.svg',
    name TEXT NOT NULL
);

CREATE TABLE oauth(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTERGER,
    identify_type TEXT NOT NULL,
    identifier TEXT NOT NULL,
    credential TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
    );

CREATE TABLE post(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INTEGER NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES user (id)
)
