const Serialize = require('../../models/_serialize')
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
       
        let posts = await db.Post.find({}).sort({ '_id': 1 }).exec()
            .then(data => { return data })
            .catch(err => res.status(400).json(err))
        
     
        //format type
        const serialize = { ...Serialize.serialize }
        const objTemp = { ...Serialize.serialize.data[0] }
        const objTempRel = { ...Serialize.relationships.data }
        serialize.data = posts.map(el => {
            const obj = { ...objTemp }
            obj.type = "posts"
            obj._id = el._id.toString()
            obj.attributes = {
                title: el.title,
                content: el.content,
            }
            const objRel = { ...objTempRel }
            objRel._id = el.author
            objRel.type = "author"

            obj.relationships = {
                "author": {
                    data: objRel
                }
            }

            return obj
        })
        res.status(200).json(serialize)
    })
}
