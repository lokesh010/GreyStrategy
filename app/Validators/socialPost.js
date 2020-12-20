'use strict'

class socialPost {

  get rules() {
    return {
      link: 'required|unique:social_posts',
    }
  }

  get messages() {
    return {
      'required': '{{ field }} is required.',
      'unique': '{{ field }} already exists',
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll()

    return this.ctx.response.redirect('back')
  }
}

module.exports = socialPost
