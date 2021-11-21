import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', tbl => {
    tbl.string('id').unique().primary().notNullable();

    tbl.string('alias');

    tbl.string('enc_public_key').unique().notNullable();

    tbl.string('verify_key').unique().notNullable();

    tbl.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
