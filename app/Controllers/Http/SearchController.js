'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const News = use('App/Models/News')
const Update = use('App/Models/Update')


class SearchController {

  async index({ request, response }) {
    const { value } = request.body
    
    const news = await News.query()
      .select('slug', 'title')
      .where('title', 'LIKE', '%' + value + '%')
      .fetch()
    const update = await Update.query()
      .select('slug', 'title')
      .where('title', 'LIKE', '%' + value + '%')
      .fetch()
    return response.json({ news: news.toJSON(), update: update.toJSON() })
  }

}

module.exports = SearchController
