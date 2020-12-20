'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectsSchema extends Schema {
  up() {
    this.create('projects', (table) => {
      table.increments()
      table.string('title').notNullable().unique()
      table.string('slug').notNullable()
      table.text('desc').notNullable()
      table.string('type').notNullable()
      table.string('image').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('projects')
  }
}

module.exports = ProjectsSchema
