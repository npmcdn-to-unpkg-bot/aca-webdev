DROP TABLE Queries;
CREATE TABLE Queries (
  session_id TEXT,
  state TEXT,
  raw_query TEXT,
  parsed_query TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE Clicks;
CREATE TABLE Clicks (
  session_id TEXT,
  click_event TEXT,  
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
