DROP TABLE IF EXISTS Queries;
CREATE TABLE Queries (
  session_id UUID PRIMARY KEY,
  state CHAR(2),
  raw_query TEXT,
  parsed_query TEXT,
  created TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC')
);

DROP TABLE IF EXISTS Clicks;
CREATE TABLE Clicks (
  session_id UUID,
  click_event TEXT,
  created TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC')
);
