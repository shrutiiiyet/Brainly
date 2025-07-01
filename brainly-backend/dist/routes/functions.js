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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessBrain = exports.shareBrain = exports.searchContent = exports.deleteContent = exports.displayContent = exports.addContent = exports.signin = exports.signup = void 0;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const db_1 = require("../db");
//USER ROUTES
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        username: zod_1.z.string()
            .min(3, { message: "Username should range more than 3 letters" })
            .max(10, { message: "Username should not exceed 10 letters" }),
        password: zod_1.z.string()
            .min(8, { message: "Password must be atleast 8 characters" })
            .max(20, { message: "Password must not exceed more than 20 characters" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
    });
    const result = requiredBody.safeParse(req.body);
    if (!result.success) {
        res.status(411).json({
            message: result.error.message
        });
        return;
    }
    try {
        let username = req.body.username;
        let password = req.body.password;
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const user = yield db_1.UserModel.create({
            username: username,
            password: hashedPassword
        });
        res.json({
            message: "Sign up succesfull"
        });
    }
    catch (e) {
        res.status(403).json({
            message: "User already exists with this username"
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield db_1.UserModel.findOne({
        username
    });
    if (user) {
        let success = yield bcrypt_1.default.compare(password, user.password);
        if (success) {
            const token = jsonwebtoken_1.default.sign({
                id: user._id
            }, config_1.JWT_SECRET);
            res.json({
                token
            });
        }
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
});
exports.signin = signin;
//CONTENT ROUTES
const addContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link,
        title,
        userId,
        type,
        tags: []
    });
    res.json({
        message: "Content added"
    });
});
exports.addContent = addContent;
const displayContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
});
exports.displayContent = displayContent;
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    const success = yield db_1.ContentModel.deleteOne({
        _id: contentId,
        userId: req.userId,
    });
    if (success) {
        res.json({
            message: "Content deleted"
        });
    }
    else {
        res.json({
            message: "error deleting content"
        });
    }
});
exports.deleteContent = deleteContent;
const searchContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const searchValue = req.query.searchValue;
    const content = yield db_1.ContentModel.find({
        userId: userId,
        link: {
            $regex: searchValue
        }
    }).populate("userId", "username");
    res.json({
        content
    });
});
exports.searchContent = searchContent;
//HASHING LINKS
const hashFunction = (len) => {
    let options = "qwertyuiopasdfghjkzxcvbnm1234567890";
    let length = options.length;
    let res = "";
    for (let i = 0; i < len; i++) {
        res += options[Math.floor(Math.random() * length)];
    }
    return res;
};
//SHARING ROUTES
const shareBrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    const hash = hashFunction(10);
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        yield db_1.LinkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            message: hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "removed link"
        });
    }
});
exports.shareBrain = shareBrain;
const accessBrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Invalid input"
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    const user = yield db_1.UserModel.findOne({
        _id: req.userId
    });
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
});
exports.accessBrain = accessBrain;
