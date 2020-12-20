'use strict'

class content {
  get rules() {
    return {
      title: 'required',
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

module.exports = content
