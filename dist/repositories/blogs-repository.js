"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const blogs = [];
exports.blogsRepository = {
    findBlogs() {
        return blogs;
    },
    findBlogById(id) {
        let blog = blogs.find(p => p.id === id);
        return blog;
    },
    createBlog(name, description, websiteUrl) {
        const newBlog = {
            id: (+(new Date())).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        };
        blogs.push(newBlog);
        return newBlog;
    },
    updateBlog(id, name, description, websiteUrl) {
        let blog = blogs.find(p => p.id === id);
        if (blog) {
            blog.name = name;
            blog.description = description;
            blog.websiteUrl = websiteUrl;
            return true;
        }
        else {
            return false;
        }
    },
    deleteBlog(id) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};
