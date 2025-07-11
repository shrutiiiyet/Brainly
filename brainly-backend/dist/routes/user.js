"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const functions_1 = require("./functions");
const UserRouter = (0, express_1.Router)();
//USERROUTES
UserRouter.post('/signup', functions_1.signup);
UserRouter.post('/signin', functions_1.signin);
//CONTENT ROUTES
UserRouter.post('/content', middleware_1.UserMiddleWare, functions_1.addContent);
UserRouter.get('/content', middleware_1.UserMiddleWare, functions_1.displayContent);
UserRouter.get('/content/filter', middleware_1.UserMiddleWare, functions_1.displayContentWithFilter);
UserRouter.delete('/content', middleware_1.UserMiddleWare, functions_1.deleteContent);
UserRouter.get('/content/title', middleware_1.UserMiddleWare, functions_1.searchContent);
//SHARING BRAIN
UserRouter.post('/brain/share', middleware_1.UserMiddleWare, functions_1.shareBrain);
UserRouter.get('/brain/:shareLink', functions_1.accessBrain);
exports.default = UserRouter;
