'use strict'

const Service = use('App/Models/Service')

class ServiceController {

  async index({ request, response, view }) {
    const service = await Service.find(1)
    return view.render('forms.editserviceform', { service: service.toJSON() })
  }

  async update({ params, request, response, session }) {
    const service = await Service.find(params.id)

    try {
      // update
      service.heading = request.input('heading')
      service.arbitration = request.input('arbitration')
      service.lobby = request.input('lobby')
      service.negotiations = request.input('negotiations')
      service.strategic = request.input('strategic')
      service.mediations = request.input('mediations')
      service.political = request.input('political')
      service.correspondence = request.input('correspondence')
      service.consultation = request.input('consultation')

      await service.save()
      session.flash({ success: 'Service Updated!' })
      return response.redirect('/dashboard/services')
    } catch (err) {
      session.flash({ danger: 'Some error occurred' })
      return response.redirect('back')
    }

  }

}

module.exports = ServiceController
