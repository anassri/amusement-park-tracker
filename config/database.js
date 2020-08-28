const index = require('./index');
const { username, password, database, host } = index.db;

module.exports = {
  "development": {
    username,
    password,
    database,
    host,
    "dialect": "postgres",
  },
  "test": {
    username,
      password,
      database,
      host,
      "dialect": "postgres",
  },
  "production": {
    username,
    password,
    database,
    host,
    "dialect": "postgres",
  }
}
