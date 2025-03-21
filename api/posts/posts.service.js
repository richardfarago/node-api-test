const posts = require("../data/posts.json");
const comments = require("../data/comments.json");

class PostsService {
    getAll(){
       return posts
    }

    getById(postId){
        const post = posts.find((post) => post.id === postId);
        
        if(!post){
            throw new Error("Post not found");
        }

        return post;
    }

    getCommentsById(postId){
        return comments.filter((comment) => comment.postId === postId);
    }
    
    findByTag(tagName){
        return posts.filter((post) => post.tags.includes(tagName));
    }
}

module.exports = PostsService;
