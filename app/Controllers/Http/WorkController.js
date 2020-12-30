'use strict'

const Work = use('App/Models/Work')
const Helpers = use('Helpers')
const fs = require('fs')

class WorkController {
  
  async index ({ request, response, view }) {
    const work = await Work.find(1)
    return view.render('forms.editworkform', { work: work.toJSON()})
  }

  async update({ params, request, response, view, session }) {
    const work = await Work.find(params.id)
    const newUploadedImage = request.file('image', {
      types: ['image'],
      size: '5mb'
    })

    if (newUploadedImage) {
      // destroy old image
      const imagepath = work.image;
      fs.unlink('./public/uploads/page/' + imagepath, (err) => {
        if (err) {
          console.error(err)
        }
      });
      // create new image
      work.image = new Date().getTime() + '.' + newUploadedImage.subtype
      await newUploadedImage.move(Helpers.publicPath('uploads/page'), {
        name: work.image
      })
    }

    try {
      // update
      work.heading = request.input('heading')
      work.desc = request.input('desc')
      await work.save()
      session.flash({ success: 'Work Philosophy Updated!' })
      return response.redirect('/dashboard/work-philosophy')
    } catch (err) {
        session.flash({ danger: 'Some error occurred' })
        return response.redirect('back')
      }
    
  }
  
}

module.exports = WorkController
