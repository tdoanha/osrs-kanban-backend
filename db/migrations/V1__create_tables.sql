CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  username VARCHAR(30),
  password VARCHAR(30),
  email VARCHAR(50), 
  stats VARCHAR(200);
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  project_description TEXT,
  created_on TIMESTAMP,
  created_by INT REFERENCES users(id),
  completed_on TIMESTAMP,
  completed_by INT REFERENCES users(id)
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30),
  task_description TEXT,
  project INT REFERENCES projects(id),
  assigned_to INT REFERENCES users(id),
  created_on TIMESTAMP,
  created_by INT REFERENCES users(id),
  completed_on TIMESTAMP,
  completed_by INT REFERENCES users(id)
);

CREATE TABLE dependencies (
  id SERIAL PRIMARY KEY,
  task INT REFERENCES tasks(id)
);

ALTER TABLE tasks ADD depends_on INT REFERENCES dependencies(id);