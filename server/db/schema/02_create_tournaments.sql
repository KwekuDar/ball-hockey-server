-- schema/02_create_urls.sql
DROP TABLE IF EXISTS urls CASCADE;
DROP TABLE IF EXISTS tournaments CASCADE;
-- CREATE URLS
CREATE TABLE tournaments (
  id SERIAL PRIMARY KEY NOT NULL,
  organizer_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  tournament_size INTEGER NOT NULL,
  team_format VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description VARCHAR(255),
  link DATE,
  location VARCHAR(255) NOT NULL
);