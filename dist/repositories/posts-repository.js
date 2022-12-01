"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const blogs_repository_1 = require("./blogs-repository");
const posts = [];
exports.postsRepository = {
    findPosts() {
        return posts;
    },
    findPostById(id) {
        let post = posts.find(p => p.id === id);
        return post;
    },
    createPost(title, shortDescription, content, blogId) {
        const blog = blogs_repository_1.blogsRepository.findBlogById(blogId);
        if (!blog) {
            return false;
        }
        const newPost = {
            id: (+(new Date())).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name
        };
        posts.push(newPost);
        return newPost;
    },
    updatePost(id, title, shortDescription, content, blogId) {
        const blog = blogs_repository_1.blogsRepository.findBlogById(blogId);
        if (!blog) {
            return false;
        }
        let post = posts.find(p => p.id === id);
        if (post) {
            post.title = title;
            post.shortDescription = shortDescription;
            post.content = content;
            post.blogId = blogId;
            post.blogName = blog.name;
            return true;
        }
        else {
            return false;
        }
    },
    deletePost(id) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};
