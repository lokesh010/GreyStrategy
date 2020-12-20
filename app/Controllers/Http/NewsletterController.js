'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Newsletter = use('App/Models/Newsletter')

class NewsletterController {

  async index({ request, response, view }) {
  }

  async create({ request, response, session }) {
    const newsletter = new Newsletter()
    newsletter.email = request.input('email')

    await newsletter.save()
    session.flash({ success: 'Thank you for the subscription!' })
    return response.redirect('back')
  }

  async destroy({ params, request, response }) {
    const newsletter = new Newsletter.find(params.id)
    await newsletter.delete()
    session.flash({ success: 'Email delete successful!' })
    return response.redirect('back')
  }
}

module.exports = NewsletterController
