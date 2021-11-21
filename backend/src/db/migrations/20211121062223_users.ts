import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', tbl => {
    tbl.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    tbl.string('username').unique().notNullable();

    tbl.string('password').notNullable();

    tbl.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
