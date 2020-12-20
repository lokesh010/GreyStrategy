'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Update extends Model {
    static boot() {
        super.boot()
        this.addTrait('@provider:Lucid/Slugify', {
            fields: { slug: 'title' },
            strategy: 'dbIncrement',
            disableUpdates: false
        })
    }
}

module.exports = Update
