'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Updates = use('App/Models/Update')
const Helpers = use('Helpers')
const fs = require('fs');

class UpdateController {

  async index({ request, response, view }) {
    const updates = await Updates.query()
      .select()
      .orderBy('created_at', 'desc')
      .fetch()
    return view.render('dashboard.updates', { updates: updates.toJSON() })
  }

  async updatepage({ request, response, view }) {
    const updates = await Updates.query()
      .select()
      .orderBy('created_at', 'desc')
      .fetch()
    return view.render('updatepage', { updates: updates.toJSON() })
  }

  async create({ request, response, view, session }) {

    const updates = new Updates();
    updates.title = request.input('title')
    updates.desc = request.input('desc')
    updates.category = request.input('category')

    // image upload process
    const image = request.file('image', {
      types: ['image'],
      size: '5mb'
    })

    updates.image = new Date().getTime() + '.' + image.subtype

    await image.move(Helpers.publicPath('uploads/post'), {
      name: updates.image
    })

    try {
      await updates.save()
      session.flash({ success: 'Updates Created' })
      response.redirect('/dashboard/updates')
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        session.flash({ danger: 'Duplicate Updates Title' })
        return response.redirect('back')
      }
    }
  }

  async store({ request, response }) {
  }

  async show({ params, view }) {
    const update = await Updates.findBy('slug', params.slug)
    if (!update) return view.render('404')
    return view.render('singlepost', { post: update.toJSON() })

  }

  async edit({ params, request, response, view }) {
    const updates = await Updates.find(params.id)
    return view.render('forms.editcontentform', {
      title: "Update updates",
      content: updates,
      action: '/dashboard/updates/' + updates.id + '?_method=PUT',
      onCancel: '/dashboard/updates'
    })
  }

  async update({ params, request, response, view, session }) {
    const updates = await Updates.find(params.id)
    const newUploadedImage = request.file('image', {
      types: ['image'],
      size: '5mb'
    })

    if (newUploadedImage) {
      // destroy old image
      const imagepath = updates.image;
      fs.unlink('./public/uploads/post/' + imagepath, (err) => {
        if (err) {
          console.error(err)
        }
      });
      // create new image
      updates.image = new Date().getTime() + '.' + newUploadedImage.subtype
      await newUploadedImage.move(Helpers.publicPath('uploads/post'), {
        name: updates.image
      })

    }
    try {
      // update
      updates.title = request.input('title')
      updates.desc = request.input('desc')
      updates.category = request.input('category')

      await updates.save()
      session.flash({ success: 'Updates Updated!' })
      return response.redirect('/dashboard/updates')
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        session.flash({ danger: 'Duplicate Updates Title' })
        return response.redirect('back')
      }
    }
  }

  async destroy({ params, request, response, session }) {
    const updates = await Updates.find(params.id)
    await updates.delete()
    // delete image 
    const imagepath = updates.image;

    fs.unlink('./public/uploads/post/' + imagepath, (err) => {
      if (err) {
        console.error(err)
      }
    });
    session.flash({ success: 'Updates Deleted!' })
    response.redirect('back')
  }
}

module.exports = UpdateController
