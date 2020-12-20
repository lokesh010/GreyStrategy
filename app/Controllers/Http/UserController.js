'use strict'

const User = use('App/Models/User')
const Help = use('App/Common')

class UserController {

    async login({ request, auth, view, session, response }) {

        const { email, password } = request.all()
        try {
            await auth.attempt(email, password)
            var help = new Help();
            const news = await help.fetch_news()
            const update = await help.fetch_update()
            const project = await help.fetch_project()
            return view.render('dashboard.home', { news, update, project })
        } catch (err) {
            if (err.code === 'E_CANNOT_LOGIN') {
                session.flash({ danger: 'You are already logged in' })
                var help = new Help();
                const news = await help.fetch_news()
                const update = await help.fetch_update()
                const project = await help.fetch_project()
                return view.render('dashboard.home', { news, update, project })
            }
        }
    }

    async credentials({ request, auth, view }) {
        const user = auth.current.user
        return view.render('dashboard.credentials', { user })
    }

    async update({ auth, response, request, session }) {
        const findUser = await User.find(auth.user.id)

        findUser.email = request.input('email')
        if (request.input('password')) {
            await findUser.delete()
            const newUser = await User.create(request.only(['email', 'password']))
            await newUser.save()
            session.flash({ success: 'Credentials Updated!, Please login with new credentials' })
            return response.redirect('/admin')
        }
        await findUser.save()
        session.flash({ success: 'Credentials Updated!' })
        return response.redirect('back')
    }

    async redirectIfAuth({ auth, view, response }) {
        var help = new Help();
        const news = await help.fetch_news()
        const update = await help.fetch_update()
        const project = await help.fetch_project()
        if (auth.user) {
            return view.render('dashboard.home', { news, update, project })
        } else {
            return view.render('login')
        }
    }
}

module.exports = UserController
