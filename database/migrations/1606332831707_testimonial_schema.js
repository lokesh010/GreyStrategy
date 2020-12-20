'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TestimonialsSchema extends Schema {
  up() {
    this.create('testimonials', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.text('desc').notNullable()
      table.string('type').notNullable()
      table.text('location').notNullable()
      table.string('image').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('testimonials')
  }
}

module.exports = TestimonialsSchema
