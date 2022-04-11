-- schema/07_create_results.sql
DROP TABLE IF EXISTS results CASCADE;
-- CREATE results
CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  winner_id INTEGER REFERENCES winners(id) ON DELETE CASCADE NOT NULL,
  loser_id INTEGER REFERENCES losers(id) ON DELETE CASCADE NOT NULL,
  final_score VARCHAR(255) NOT NULL
);