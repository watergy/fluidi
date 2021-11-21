import dotenv from 'dotenv';
dotenv.config();

import knex from 'knex';
//@ts-ignore
import config from '../../knexfile';

const dbEnvironment = process.env.DB_ENV || 'development';

// @ts-ignore
export default knex(config[dbEnvironment]);
