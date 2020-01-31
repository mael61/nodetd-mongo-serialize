module.exports = (app, db) => {
    app.post('/post', async (req, res) => {
        let post = new db.Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
        })
        await post.save()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(400).json(err))
    })

    app.get('/posts', async (req, res) => {
        const posts = await db.Post.find()
        res.json(posts)
            // .then(data => res.status(200).json(data))
            // .catch(err => res.status(400).json(err))
        // res.status(200).json(authors)
    })
}
