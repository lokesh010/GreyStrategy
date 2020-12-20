'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// @desc    auth routes
Route.get('/admin', 'UserController.redirectIfAuth')
Route.post('/login', 'UserController.login').validator('Login')
Route.get('/logout', async ({ response, auth }) => {
    await auth.logout();
    return response.redirect('/admin')
})
// @desc    public VIEWS
Route.get('/', 'ViewController.welcome')
Route.get('/about', 'ViewController.about')
Route.get('/service', 'ViewController.service')
Route.get('/latest-news', 'ViewController.newspage')
Route.get('/latest-updates', 'ViewController.updatepage')
Route.get('/blogs', 'ViewController.blog')
Route.get('/project', 'ViewController.project')
Route.post('/contact', 'ContactController.store')
Route.get('/works', 'ViewController.work')
Route.on('/news').render('news')
Route.on('/contact').render('contact')
// @desc    SINGLE Article
Route.get('/news/:slug', 'NewsController.show')
Route.get('/update/:slug', 'UpdateController.show')
Route.get('/project/:slug', 'ProjectController.show')
// @desc    VIEWS dashboard
Route.get('/dashboard', 'ViewController.dashboard').middleware(['auth'])
// @desc    CRUD
// news
Route.group(() => {
    Route.get('/create', ({ view }) => view.render('forms.createblogform', {
        title: 'Create News',
        route: '/dashboard/news',
    }))
    Route.post('/', 'NewsController.create').validator('content')
    Route.get('/', 'NewsController.index')
    Route.get('/edit/:id', 'NewsController.edit')
    Route.put('/:id', 'NewsController.update')
    Route.delete(':id', 'NewsController.destroy')

}).prefix('/dashboard/news').middleware(['auth:session'])
// updates
Route.group(() => {
    Route.get('/create', ({ view }) => view.render('forms.createblogform', {
        title: 'Create Updates',
        route: '/dashboard/updates',
    }))
    Route.post('/', 'UpdateController.create').validator('content')
    Route.get('/', 'UpdateController.index')
    Route.get('/edit/:id', 'UpdateController.edit')
    Route.put('/:id', 'UpdateController.update')
    Route.delete(':id', 'UpdateController.destroy')

}).prefix('/dashboard/updates').middleware(['auth:session'])
// social posts
Route.group(() => {
    Route.post('/', 'SocialPostController.create').validator('socialPost')
    Route.get('/', 'SocialPostController.index')
    Route.delete(':id', 'SocialPostController.destroy')
}).prefix('/dashboard/social-posts').middleware(['auth:session'])
// projects
Route.group(() => {
    Route.get('/create', ({ view }) => view.render('forms.createprojectform', {
        title: 'Create Projects',
        route: '/dashboard/projects',
    }))
    Route.post('/', 'ProjectController.create').validator('content')
    Route.get('/', 'ProjectController.index')
    Route.get('/edit/:id', 'ProjectController.edit')
    Route.put('/:id', 'ProjectController.update')
    Route.delete(':id', 'ProjectController.destroy')
}).prefix('/dashboard/projects').middleware(['auth:session'])
// testimonials
Route.group(() => {
    Route.get('/create', ({ view }) => view.render('forms.createtestimonialform', {
        title: 'Create Testimonials',
        route: '/dashboard/testimonials',
    }))
    Route.post('/', 'TestimonialController.create').validator('testimonial')
    Route.get('/', 'TestimonialController.index')
    Route.get('/edit/:id', 'TestimonialController.edit')
    Route.put('/:id', 'TestimonialController.update')
    Route.delete(':id', 'TestimonialController.destroy')
}).prefix('/dashboard/testimonials').middleware(['auth:session'])
// contact us
Route.group(() => {
    Route.get('/', 'ContactController.index')
    Route.delete(':id', 'ContactController.destroy')
}).prefix('/dashboard/contact').middleware(['auth:session'])
// credentials
Route.group(() => {
    Route.get('/', 'UserController.credentials')
    Route.put('/', 'UserController.update')
}).prefix('/dashboard/credentials').middleware(['auth:session'])
// newsletter
Route.group(() => {
    Route.post('/', 'NewsletterController.create')
    Route.delete(':id', 'NewsletterController.destroy').middleware(['auth:session'])
}).prefix('/newsletter')
// search
Route.post('/search/title', 'SearchController.index')
// 404
Route.get('*', ({ view }) => view.render('404'))
Route.get('/dashboard/*', ({ view }) => view.render('404'))