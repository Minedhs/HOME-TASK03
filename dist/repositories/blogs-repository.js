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
exports.blogsRepository = void 0;
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
exports.blogsRepository = {
    findBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            let blogs = yield db_1.blogsCollection.find().toArray();
            return blogs.map((c) => { return { id: c._id, name: c.name, description: c.description, websiteUrl: c.websiteUrl, createdAt: c.createdAt }; });
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let blog = yield db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!blog) {
                return null;
            }
            else {
                return {
                    id: blog._id.toString(),
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl,
                    createdAt: blog.createdAt
                };
            }
        });
    },
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                _id: new mongodb_1.ObjectId(),
                name: name,
                description: description,
                websiteUrl: websiteUrl,
                createdAt: new Date().toISOString()
            };
            yield db_1.blogsCollection.insertOne(newBlog);
            return {
                id: newBlog._id.toString(),
                name: newBlog.name,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                createdAt: newBlog.createdAt
            };
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { name: name, description: description, websiteUrl: websiteUrl } });
            return result.matchedCount === 1;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return result.deletedCount === 1;
        });
    }
};
