import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tags', tbl => {
    tbl.string('id').unique().primary().notNullable();

    tbl.string('name').unique().notNullable();

    tbl.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('tags');
}
