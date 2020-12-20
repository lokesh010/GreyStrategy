'use strict';

const News = use('App/Models/News')
const Update = use('App/Models/Update')
const SocialPost = use('App/Models/SocialPost')
const Project = use('App/Models/Project')
const Testimonial = use('App/Models/Testimonial')


module.exports = class Help {

    async fetch_news() {
        const news = await News.query()
            .select()
            .orderBy('created_at', 'desc')
            .fetch()


        return news.toJSON()
    }

    async fetch_update() {
        const update = await Update.query()
            .select()
            .orderBy('created_at', 'desc')
            .fetch()


        return update.toJSON()
    }

    async fetch_project() {

        const project = await Project.query()
            .select()
            .orderBy('created_at', 'desc')
            .fetch()

        return project.toJSON()
    }
}
