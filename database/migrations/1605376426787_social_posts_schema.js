'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialPostsSchema extends Schema {
  up() {
    this.create('social_posts', (table) => {
      table.increments()
      table.string('link').notNullable().unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('social_posts')
  }
}

module.exports = SocialPostsSchema
