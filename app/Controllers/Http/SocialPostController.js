'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const SocialPost = use('App/Models/SocialPost')

/**
 * Resourceful controller for interacting with socialposts
 */
class SocialPostController {
  /**
   * Show a list of all socialposts.
   * GET socialposts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const socialPost = await SocialPost.query()
      .select()
      .orderBy('created_at', 'desc')
      .fetch()
    return view.render('dashboard.socialposts', { socialPost: socialPost.toJSON() })
  }

  /**
   * Render a form to be used for creating a new socialpost.
   * GET socialposts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, session, view }) {
    const socialPost = new SocialPost();
    socialPost.link = request.input('link')
    await socialPost.save();
    session.flash({ success: 'Post Created!' })
    return response.redirect('back')
  }

  /**
   * Create/save a new socialpost.
   * POST socialposts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single socialpost.
   * GET socialposts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing socialpost.
   * GET socialposts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update socialpost details.
   * PUT or PATCH socialposts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a socialpost with id.
   * DELETE socialposts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, session, response }) {
    const socialPost = await SocialPost.find(params.id)
    await socialPost.delete()
    session.flash({ success: 'Post Deleted' })
    return response.redirect('back')
  }
}

module.exports = SocialPostController
