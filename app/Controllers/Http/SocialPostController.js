'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const SocialPost = use('App/Models/SocialPost')

/**
 * Resourceful controller for interacting with socialposts
 */
class SocialPostController {
  
  async index({ request, response, view }) {
    const socialPost = await SocialPost.query()
      .select()
      .orderBy('created_at', 'desc')
      .fetch()
    return view.render('dashboard.socialposts', { socialPost: socialPost.toJSON() })
  }

  
  async create({ request, response, session, view }) {
    const socialPost = new SocialPost();
    socialPost.link = request.input('link')
    socialPost.type = request.input('type')
    await socialPost.save();
    session.flash({ success: 'Post Created!' })
    return response.redirect('back')
  }

  
  async destroy({ params, session, response }) {
    const socialPost = await SocialPost.find(params.id)
    await socialPost.delete()
    session.flash({ success: 'Post Deleted' })
    return response.redirect('back')
  }
}

module.exports = SocialPostController
