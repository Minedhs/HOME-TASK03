type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName?: string
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
    createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        const newPost = {
            id: (+(new Date())).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName
        }
        posts.push(newPost)
        return newPost
    },
    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        let post = posts.find(p => p.id === id)
        if (post) {
            post.title = title;
            post.shortDescription = shortDescription;
            post.content = content;
            post.blogId = blogId;
            post.blogName = blogName;
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
