import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 100,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 3000,
      idleTimeoutMillis: 3000,
      reapIntervalMillis: 3000,
      createRetryIntervalMillis: 3000,
    },
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    ssl: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
  },
};

export default config;
