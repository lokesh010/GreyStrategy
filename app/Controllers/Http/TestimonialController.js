'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Testimonials = use('App/Models/Testimonial')
const Helpers = use('Helpers')
const fs = require('fs');

/**
 * Resourceful controller for interacting with testimonials
 */
class TestimonialController {
  /**
   * Show a list of all testimonials.
   * GET testimonials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const testimonials = await Testimonials.query()
      .select()
      .orderBy('created_at', 'desc')
      .fetch()
    return view.render('dashboard.testimonials', { testimonials: testimonials.toJSON() })

  }

  /**
   * Render a form to be used for creating a new testimonial.
   * GET testimonials/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, session }) {
    const testimonials = new Testimonials();
    testimonials.name = request.input('name')
    testimonials.desc = request.input('desc')
    testimonials.type = request.input('type')
    testimonials.location = request.input('location')

    // image upload process
    const image = request.file('image', {
      types: ['image'],
      size: '5mb'
    })

    testimonials.image = new Date().getTime() + '.' + image.subtype

    await image.move(Helpers.publicPath('uploads/testimonials'), {
      name: testimonials.image
    })

    testimonials.save()
    session.flash({ success: 'Testimonials Created' })
    response.redirect('/dashboard/testimonials')
  }

  /**
   * Create/save a new testimonial.
   * POST testimonials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single testimonial.
   * GET testimonials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing testimonial.
   * GET testimonials/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const testimonials = await Testimonials.find(params.id)
    return view.render('forms.edittestimonialform', {
      title: "Update testimonials",
      content: testimonials,
      action: '/dashboard/testimonials/' + testimonials.id + '?_method=PUT',
      onCancel: '/dashboard/testimonials'
    })
  }

  /**
   * Update testimonial details.
   * PUT or PATCH testimonials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, session }) {
    const testimonials = await Testimonials.find(params.id)
    const newUploadedImage = request.file('image', {
      types: ['image'],
      size: '5mb'
    })

    if (newUploadedImage) {
      // destroy old image
      const imagepath = testimonials.image;
      fs.unlink('./public/uploads/testimonials/' + imagepath, (err) => {
        if (err) {
          console.error(err)
        }
      });
      // create new image
      testimonials.image = new Date().getTime() + '.' + newUploadedImage.subtype
      await newUploadedImage.move(Helpers.publicPath('uploads/testimonials'), {
        name: testimonials.image
      })
    }
    // update
    testimonials.name = request.input('name')
    testimonials.desc = request.input('desc')
    testimonials.type = request.input('type')
    testimonials.location = request.input('location')

    await testimonials.save()

    session.flash({ success: 'Testimonials Updated!' })
    return response.redirect('/dashboard/testimonials')
  }

  /**
   * Delete a testimonial with id.
   * DELETE testimonials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, session }) {
    const testimonials = await Testimonials.find(params.id)
    await testimonials.delete()
    // delete image 
    const imagepath = testimonials.image;

    fs.unlink('./public/uploads/testimonials/' + imagepath, (err) => {
      if (err) {
        console.error(err)
      }
    });
    session.flash({ success: 'Testimonials Deleted!' })
    response.redirect('back')
  }
}

module.exports = TestimonialController
