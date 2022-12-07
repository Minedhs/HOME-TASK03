"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const db_1 = require("./db");
const blogs_repository_1 = require("./blogs-repository");
const mongodb_1 = require("mongodb");
exports.postsRepository = {
    findPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            let posts = yield db_1.postsCollection.find().toArray();
            return posts.map((c) => { return { id: c._id, title: c.title, shortDescription: c.shortDescription, content: c.content, blogId: c.blogId, blogName: c.blogName, createdAt: c.createdAt }; });
        });
    },
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield db_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (post) {
                return {
                    id: post._id.toString(),
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId,
                    blogName: post.blogName,
                    createdAt: post.createdAt
                };
            }
            else {
                return null;
            }
        });
    },
    createPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getBlog = yield blogs_repository_1.blogsRepository.findBlogById(blogId);
            if (getBlog) {
                const newPost = {
                    _id: new mongodb_1.ObjectId(),
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId,
                    blogName: getBlog.name,
                    createdAt: new Date().toString()
                };
                yield db_1.postsCollection.insertOne(newPost);
                return {
                    id: newPost._id.toString(),
                    title: newPost.title,
                    shortDescription: newPost.shortDescription,
                    content: newPost.content,
                    blogId: newPost.blogId,
                    blogName: newPost.blogName,
                    createdAt: newPost.createdAt
                };
            }
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getBlog = yield blogs_repository_1.blogsRepository.findBlogById(blogId);
            if (getBlog) {
                const result = yield db_1.postsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { title: title, shortDescription: shortDescription, content: content, blogId: blogId, blogName: getBlog.name } });
                return result.matchedCount === 1;
            }
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return result.deletedCount === 1;
        });
    }
};
