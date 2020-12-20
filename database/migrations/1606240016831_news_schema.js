'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NewsSchema extends Schema {
  up() {
    this.create('news', (table) => {
      table.increments()
      table.string('title').notNullable().unique()
      table.string('slug').notNullable()
      table.text('desc').notNullable()
      table.string('category').notNullable()
      table.string('image').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('news')
  }
}

module.exports = NewsSchema
