CREATE DATABASE wakemeup

CREATE TABLE timer(
    id SERIAL PRIMARY KEY,
    day DATE UNIQUE NOT NULL,
    sunrise TIME NOT NULL,
    description VARCHAR(255)   
)