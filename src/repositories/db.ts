import {MongoClient, ObjectId} from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config()

export type BlogDBType = {
    _id: ObjectId,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string
}
export type BlogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string
}
export type PostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}
export type PostDBType = {
    _id: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

const url = process.env.MONGO_URL;
console.log("url: ", url);
if (!url) {
    throw new Error("Can't found url")
}
const client = new MongoClient(url);
const db = client.db("bloggers");
export const blogsCollection = db.collection<BlogDBType>("blogs");
export const postsCollection = db.collection<PostDBType>("posts");
export async function runDb() {
    try {
        await client.connect();
        await client.db("bloggers").command({ping: 1});
        console.log("Connected successfully to server");
    } catch {
        console.log("Can't connect to db");
        await client.close();
    }
}