import {BlogDBType, blogsCollection, BlogType} from "./db";
import {ObjectId} from "mongodb";

export const blogsRepository = {
    async findBlogs () {
        let blogs: BlogDBType[] = await blogsCollection.find().toArray();
        return blogs.map((c) => {return {id: c._id, name: c.name, description: c.description, websiteUrl: c.websiteUrl, createdAt: c.createdAt};});
    },
    async findBlogById(id: string) {
        let blog = await blogsCollection.findOne({_id: new ObjectId(id)});
        if (blog) {
            return {
                id: blog._id.toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt
            }
        } else {
            return null
        }
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogType> {
        const newBlog: BlogDBType = {
            _id: new ObjectId(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString()
        };
        await blogsCollection.insertOne(newBlog);
        return {
            id: newBlog._id.toString(),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: newBlog.createdAt
        }
    },
    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogsCollection.updateOne({_id: new ObjectId(id)}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})
        return result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    }
}
