import {blogsRepository} from "./blogs-repository";

type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

const posts: postType[] = []

export const postsRepository = {
    findPosts () {
        return posts
    },
    findPostById(id: string) {
        let post = posts.find(p => p.id === id)
        return post
    },
    createPost(title: string, shortDescription: string, content: string, blogId: string) {
        const blog = blogsRepository.findBlogById(blogId)
        if (!blog) {
            return false
        } else {
        const newPost = {
            id: (+(new Date())).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name
        }
        posts.push(newPost)
        return newPost
        }
    },
    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const blog = blogsRepository.findBlogById(blogId)
        if (!blog) {
            return false
        }
        let post = posts.find(p => p.id === id)
        if (post) {
            post.title = title;
            post.shortDescription = shortDescription;
            post.content = content;
            post.blogId = blogId;
            post.blogName = blog.name;
            return true;
        } else {
            return false;
        }
    },
    deletePost(id: string) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
