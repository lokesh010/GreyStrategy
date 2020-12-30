'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const News = use('App/Models/News')
const Helpers = use('Helpers')
const fs = require('fs')

class NewsController {

  async index({ request, response, view }) {
    const news = await News.query()
      .select()
      .orderBy('created_at', 'desc')
      .fetch()
    return view.render('dashboard.news', { news: news.toJSON() })
  }

  async newspage({ request, response, view }) {
    const news = await News.query()
      .select()
      .orderBy('created_at', 'desc')
      .fetch()
    return view.render('newspage', { news: news.toJSON() })
  }

  async create({ request, response, view, session }) {

    const news = new News();
    news.title = request.input('title')
    news.desc = request.input('desc')
    news.category = request.input('category')

    // image upload process
    const image = request.file('image', {
      types: ['image'],
      size: '5mb'
    })

    news.image = new Date().getTime() + '.' + image.subtype

    await image.move(Helpers.publicPath('uploads/post'), {
      name: news.image
    })
    try {
      news.save()
      session.flash({ success: 'News Created' })
      response.redirect('/dashboard/news')
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        session.flash({ danger: 'Duplicate News Title' })
        return response.redirect('back')
      }
    }
  }

  async store({ request, response }) {
  }

  async show({ params, request, response, view }) {
    var news = await News.findBy('slug', params.slug)
    if (!news) return view.render('404')

    return view.render('singlepost', { post: news.toJSON() })
  }

  async edit({ params, request, response, view }) {
    const news = await News.find(params.id)
    return view.render('forms.editcontentform', {
      title: "Update News",
      content: news,
      action: '/dashboard/news/' + news.id + '?_method=PUT',
      onCancel: '/dashboard/news'
    })
  }

  async update({ params, request, response, view, session }) {
    const news = await News.find(params.id)
    const newUploadedImage = request.file('image', {
      types: ['image'],
      size: '5mb'
    })

    if (newUploadedImage) {
      // destroy old image
      const imagepath = news.image;
      fs.unlink('./public/uploads/post/' + imagepath, (err) => {
        if (err) {
          console.error(err)
        }
      });
      // create new image
      news.image = new Date().getTime() + '.' + newUploadedImage.subtype
      await newUploadedImage.move(Helpers.publicPath('uploads/post'), {
        name: news.image
      })
    }

    try {
      // update
      news.title = request.input('title')
      news.desc = request.input('desc')
      news.category = request.input('category')

      await news.save()
      session.flash({ success: 'News Updated!' })
      return response.redirect('/dashboard/news')
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        session.flash({ danger: 'Duplicate News Title' })
        return response.redirect('back')
      }
    }
  }

  async destroy({ params, request, response, session }) {
    const news = await News.find(params.id)
    await news.delete()
    // delete image 
    const imagepath = news.image;

    fs.unlink('./public/uploads/post/' + imagepath, (err) => {
      if (err) {
        console.error(err)
      }
    });
    session.flash({ success: 'News Deleted!' })
    response.redirect('back')
  }
}

module.exports = NewsController
