'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServicesSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.text('heading').notNullable()
      table.text('arbitration').notNullable()
      table.text('lobby').notNullable()
      table.text('negotiations').notNullable()
      table.text('strategic').notNullable()
      table.text('mediations').notNullable()
      table.text('political').notNullable()
      table.text('correspondence').notNullable()
      table.text('consultation').notNullable()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServicesSchema
