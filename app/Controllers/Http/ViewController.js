'use strict'

const Work = use('App/Models/Work')
const Service = use('App/Models/Service')
const News = use('App/Models/News')
const Update = use('App/Models/Update')
const SocialPost = use('App/Models/SocialPost')
const Project = use('App/Models/Project')
const Testimonials = use('App/Models/Testimonial')

const bottomArticle = async () => {
    const news = await News.query()
        .select()
        .where('category', 'resources')
        .orderBy('created_at', 'desc')
        .limit(1)
        .fetch()

    const update = await Update.query()
        .select()
        .orderBy('created_at', 'desc')
        .limit(1)
        .fetch()

    const socialPost = await SocialPost.query()
        .select()
        .orderBy('created_at', 'desc')
        .fetch()

    return { news: news.toJSON(), update: update.toJSON(), socialPost: socialPost.toJSON(), }
}

class ViewController {

    async dashboard({ view }) {
        const news = await News.query()
            .select()
            .orderBy('created_at', 'desc')
            .fetch()

        const update = await Update.query()
            .select()
            .orderBy('created_at', 'desc')
            .fetch()

        const project = await Project.query()
            .select()
            .orderBy('created_at', 'desc')
            .fetch()

        return view.render('dashboard.home', { news: news.toJSON(), update: update.toJSON(), project: project.toJSON() })

    }

    async welcome({ view }) {
        // News Type
        const resources = await News.query()
            .select()
            .where('category', 'resources')
            .orderBy('created_at', 'desc')
            .limit(1)
            .fetch()

        const interview = await News.query()
            .select()
            .where('category', 'interview')
            .orderBy('created_at', 'desc')
            .limit(1)
            .fetch()

        const reportcast = await News.query()
            .select()
            .where('category', 'reportcast')
            .orderBy('created_at', 'desc')
            .limit(1)
            .fetch()

        // Update type
        const latestupdate = await Update.query()
            .select()
            .where('category', 'latestupdate')
            .orderBy('created_at', 'desc')
            .limit(1)
            .fetch()

        const article = await Update.query()
            .select()
            .where('category', 'article')
            .orderBy('created_at', 'desc')
            .limit(2)
            .fetch()

        const socialpost = await SocialPost.query()
            .select()
            .orderBy('created_at', 'desc')
            .fetch()

        return view.render('welcome', {
            resources: resources.toJSON(),
            interview: interview.toJSON(),
            reportcast: reportcast.toJSON(),
            latestupdate: latestupdate.toJSON(),
            article: article.toJSON(),
            socialpost: socialpost.toJSON()
        })

        return view.render('welcome')
    }

    about = async ({ view }) => view.render('about', await bottomArticle())

    async work({ view }) {
        const content = await bottomArticle()
        content.work = await Work.find(1)
        return view.render('work', content)
    }

    async service({ view }) {
        const service = await Service.find(1)

        const impactstory = await Testimonials.query()
            .select()
            .where('type', 'impactstory')
            .orderBy('created_at', 'desc')
            .fetch()

        const ourclients = await Testimonials.query()
            .select()
            .where('type', 'ourclients')
            .orderBy('created_at', 'desc')
            .fetch()

        const articles = await bottomArticle()
        return view.render('service', {
            impactstory: impactstory ? impactstory.toJSON() : [],
            ourclients: ourclients ? ourclients.toJSON() : [],
            service: service ? service.toJSON() : [],
            news: articles.news,
            update: articles.update,
            socialPost: articles.socialPost,
        })
    }

    async newspage({ view }) {
        const resources = await News.query()
            .select()
            .where('category', 'resources')
            .orderBy('created_at', 'desc')
            .fetch()

        const interview = await News.query()
            .select()
            .where('category', 'interview')
            .orderBy('created_at', 'desc')
            .fetch()

        const reportcast = await News.query()
            .select()
            .where('category', 'reportcast')
            .orderBy('created_at', 'desc')
            .fetch()

        return view.render('newspage', {
            resources: resources.toJSON(),
            interview: interview.toJSON(),
            reportcast: reportcast.toJSON()
        })
    }

    async updatepage({ view }) {
        const latestupdate = await Update.query()
            .select()
            .where('category', 'latestupdate')
            .orderBy('created_at', 'desc')
            .fetch()

        const article = await Update.query()
            .select()
            .where('category', 'article')
            .orderBy('created_at', 'desc')
            .fetch()

        return view.render('updatepage', {
            latestupdate: latestupdate.toJSON(),
            article: article.toJSON()
        })
    }

    async blog({ view }) {
        const news = await News.query()
            .select()
            .orderBy('created_at', 'desc')
            .fetch()

        const update = await Update.query()
            .select()
            .orderBy('created_at', 'desc')
            .fetch()

        return view.render('blog', { news: news.toJSON(), update: update.toJSON() })
    }

    async project({ view }) {
        const ongoing = await Project.query()
            .select()
            .where('type', 'ongoing')
            .orderBy('created_at', 'desc')
            .fetch()

        const completed = await Project.query()
            .select()
            .where('type', 'completed')
            .orderBy('created_at', 'desc')
            .fetch()

        const concept = await Project.query()
            .select()
            .where('type', 'concept')
            .orderBy('created_at', 'desc')
            .fetch()

        const research = await Project.query()
            .select()
            .where('type', 'research')
            .orderBy('created_at', 'desc')
            .fetch()

        return view.render('project', {
            ongoing: ongoing.toJSON(),
            completed: completed.toJSON(),
            concept: concept.toJSON(),
            research: research.toJSON()
        })
    }
}


module.exports = ViewController
