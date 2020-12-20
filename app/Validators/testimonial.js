'use strict'

class testimonial {
  get rules() {
    return {
      name: 'required',
      location: 'required',
      desc: 'required',
      image: 'required',
    }
  }

  get messages() {
    return {
      'required': '{{ field }} is required',
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll()

    return this.ctx.response.redirect('back')
  }
}

module.exports = testimonial
