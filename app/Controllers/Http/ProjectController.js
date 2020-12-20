'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Project = use('App/Models/Project')
const Helpers = use('Helpers')
const fs = require('fs');

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const projects = await Project.query()
      .select()
      .orderBy('created_at', 'desc')
      .fetch()
    return view.render('dashboard.projects', { projects: projects.toJSON() })
  }

  /**
   * Render a form to be used for creating a new project.
   * GET projects/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, session }) {
    const projects = new Project();
    projects.title = request.input('title')
    projects.desc = request.input('desc')
    projects.type = request.input('type')

    // image upload process
    const image = request.file('image', {
      types: ['image'],
      size: '5mb'
    })

    projects.image = new Date().getTime() + '.' + image.subtype

    await image.move(Helpers.publicPath('uploads/project'), {
      name: projects.image
    })

    try {
      await projects.save()
      session.flash({ success: 'Projects Created' })
      response.redirect('/dashboard/projects')
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        session.flash({ danger: 'Duplicate Project Title' })
        return response.redirect('back')
      }
    }
  }

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const project = await Project.findBy('slug', params.slug)
    if (!project) return view.render('404')
    return view.render('singlepost', { post: project.toJSON() })

  }

  /**
   * Render a form to update an existing project.
   * GET projects/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const projects = await Project.find(params.id)
    return view.render('forms.editprojectform', {
      title: "Update Project",
      content: projects,
      action: '/dashboard/projects/' + projects.id + '?_method=PUT',
      onCancel: '/dashboard/projects'
    })
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, session }) {
    const projects = await Project.find(params.id)
    const newUploadedImage = request.file('image', {
      types: ['image'],
      size: '5mb'
    })

    if (newUploadedImage) {
      // destroy old image
      const imagepath = projects.image;
      fs.unlink('./public/uploads/project/' + imagepath, (err) => {
        if (err) {
          console.error(err)
        }
      });
      // create new image
      projects.image = new Date().getTime() + '.' + newUploadedImage.subtype
      await newUploadedImage.move(Helpers.publicPath('uploads/project'), {
        name: projects.image
      })
    }

    try {
      // update
      projects.title = request.input('title')
      projects.desc = request.input('desc')
      projects.type = request.input('type')

      await projects.save()
      session.flash({ success: 'Project Updated!' })
      return response.redirect('/dashboard/projects')
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        session.flash({ danger: 'Duplicate Project Title' })
        return response.redirect('back')
      }
    }

  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, session, response }) {
    const projects = await Project.find(params.id)
    await projects.delete()
    // delete image 
    const imagepath = projects.image;

    fs.unlink('./public/uploads/project/' + imagepath, (err) => {
      if (err) {
        console.error(err)
      }
    });
    session.flash({ success: 'Project Deleted!' })
    response.redirect('back')
  }
}

module.exports = ProjectController
