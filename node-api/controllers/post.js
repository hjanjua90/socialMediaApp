const Post = require('../models/post');
//let uuidv1 = require('uuidv1')

exports.getPosts = (req, res)=>{
    const posts = Post.find().select("_id title body")
    .then((posts)=>{
        res.json({posts})

    })
    .catch(err => console.log(err))
};
exports.createPost = (req,res)=>{
    const post = new Post(req.body) 
    post.save().then(result =>{
        res.json({
            post: result
        });

    });


};