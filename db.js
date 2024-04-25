const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // ganti dengan username PostgreSQL Anda
  host: 'localhost', // ganti dengan host PostgreSQL Anda
  database: 'argyabuku', // ganti dengan nama database Anda
  password: 'Argyadwi123_', // ganti dengan password PostgreSQL Anda
  port: 5432, // ganti dengan port PostgreSQL Anda
});

module.exports = pool;
