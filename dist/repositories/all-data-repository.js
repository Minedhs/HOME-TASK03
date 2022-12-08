"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
deleteAll();
{
    db_1.postsCollection.deleteMany({});
}
