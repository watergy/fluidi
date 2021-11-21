import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post_tags', tbl => {
    tbl.string('id').unique().primary().notNullable();

    tbl
      .string('post_id')
      .references('id')
      .inTable('posts')
      .onUpdate('cascade')
      .onDelete('cascade')
      .notNullable();

    tbl
      .string('tag_id')
      .references('id')
      .inTable('tags')
      .onUpdate('cascade')
      .onDelete('cascade')
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('post_tags');
}
