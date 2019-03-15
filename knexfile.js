module.exports = {
  development: { 
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'password',
      database: 'hangman_db',
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};