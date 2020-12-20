'use strict'

class Login {

  get rules() {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'You must provide an email address.',
      'email.email': 'Email format must be < _@domain.com >',
      'password.required': 'You must provide a password'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll()

    return this.ctx.response.redirect('back')
  }
}

module.exports = Login
