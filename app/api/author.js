
var objAuthor = {
    data:[{
        type:'',
        id:'',
        attributes:{
        firstname:'',
        lastname:''
        },
        relationships:{
            post:[{
                id:'',
                type:'',
               
            }]
        }
    }]

}
module.exports = (app, db) => {
    app.post('/author', async (req, res) => {
        let authors = new db.Author({
                data:[{
                    type:'authors',
                    id:req.body.id,
                    attributes:{
                    firstname:req.body.firstName,
                    lastname:req.body.lastName,
                    }
                }]
            
            })

        await authors.save()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(400).json(err))
    })

    app.get('/authors', async (req, res) => {
        await db.Author.find()
            .select('_id firstName lastName').exec()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(400).json(err))
        // res.status(200).json(authors)
    })
}


