CREATE TABLE 'schema' (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  year INT,
  competition VARCHAR(20),
  description VARCHAR(255),
  properties BLOB
);