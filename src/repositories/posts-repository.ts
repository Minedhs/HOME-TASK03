import {PostDBType, postsCollection, PostType} from "./db";
import {blogsRepository} from "./blogs-repository";
import {ObjectId} from "mongodb";

export const postsRepository = {
    async findPosts () {
        let posts = await postsCollection.find().toArray();
        return posts.map((c) => {return {id: c._id, title: c.title, shortDescription: c.shortDescription, content: c.content, blogId: c.blogId, blogName: c.blogName, createdAt: c.createdAt}})
    },
    async findPostById(id: string): Promise<PostType | null> {
        let post: PostDBType | null = await postsCollection.findOne({_id: new ObjectId(id)})
        if (post) {
            return {
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            }
        } else {
            return null
        }
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: string) {
        const getBlog = await blogsRepository.findBlogById(blogId)
        if (getBlog) {
        const newPost: PostDBType = {
            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: getBlog.name,
            createdAt: new Date().toISOString()
        }
        await postsCollection.insertOne(newPost)
        return {
            id: newPost._id.toString(),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: newPost.blogName,
            createdAt: newPost.createdAt
            }
            }
        },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const getBlog = await blogsRepository.findBlogById(blogId)
        if (getBlog) {
        const result = await postsCollection.updateOne({_id: new ObjectId(id)}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId, blogName: getBlog.name}})
            return result.matchedCount === 1;
        }},
    async deletePost(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    }
    }