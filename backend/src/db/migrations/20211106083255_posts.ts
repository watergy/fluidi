import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts', tbl => {
    tbl.string('id').unique().primary().notNullable();

    tbl
      .string('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('cascade')
      .onDelete('cascade')
      .notNullable();

    tbl.string('title').notNullable();

    tbl.text('body').notNullable();

    tbl.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('posts');
}
