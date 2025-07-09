import { z, string } from 'zod';
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserMiddleWare } from '../middleware';
import { JWT_SECRET } from '../config';
import { ContentModel, UserModel, LinkModel, TagModel } from '../db';

//USER ROUTES

export const signup = async (req: Request, res: Response) => {
    
    const requiredBody = z.object ({
        username: z.string()
        .min(3, {message: "Username should range more than 3 letters"})
        .max(10, {message: "Username should not exceed 10 letters"}),

        password: z.string()
        .min(8,{message: "Password must be atleast 8 characters"})
        .max(20, {message: "Password must not exceed more than 20 characters"})
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })

    })

    const result = requiredBody.safeParse(req.body);

    if(!result.success) {
        res.status(411).json ({
            message: result.error.message
        });
        return;
    }

    try {

        let username = req.body.username;
        let password = req.body.password;

        const hashedPassword = await bcrypt.hash(password, 5);

        const user = await UserModel.create ({
            username: username,
            password: hashedPassword
        })

        res.json ({
            message: "Sign up succesfull"
        })
    }   
    catch(e) {
        res.status(403).json ({
            message: "User already exists with this username"
        })
    }     
}

export const signin = async(req: Request, res: Response) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne ({
        username
    })

    if(user) {
        let success = await bcrypt.compare(password, user.password as string);

        if(success) {
            const token = jwt.sign({
                id: user._id
            }, JWT_SECRET as string);

            res.json ({
                token
            })
        }
    }
    else {
        res.status(403).json ({
            message : "Incorrect credentials"
        })
    }
}

//CONTENT ROUTES

export const addContent = async(req: Request, res: Response) => {

    const userId = req.userId;
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    console.log(JWT_SECRET);

    await ContentModel.create ({
        link,
        title,
        userId,
        type,
        tags: []
    })

    res.json ({
        message: "Content added"
    })
}

export const displayContent = async(req: Request, res: Response) => {

    const userId = req.userId;
    const content = await ContentModel.find ({
        userId: userId
    }).populate("userId", "username")

    res.json ({
        content  
    })
}

export const deleteContent = async(req: Request, res: Response) => {

    const contentId = req.body.contentId;
    const success = await ContentModel.deleteOne ({
        _id: contentId,
        userId: req.userId,
    })

    if(success) {
    res.json ({
        message: "Content deleted"
    })
    }
    else {
        res.json ({
            message: "error deleting content"
        })
    }
}

export const searchContent = async(req: Request, res:Response) => {

    const userId = req.userId;
    const searchValue = req.query.searchValue;

    const content = await ContentModel.find ({
        userId: userId,
        link: {
            $regex: searchValue
        }
    }).populate("userId", "username")

    res.json ({
        content
    })
}

//HASHING LINKS
const hashFunction = (len: number) => {

    let options = "qwertyuiopasdfghjkzxcvbnm1234567890";
    let length = options.length;

    let res="";

    for(let i=0; i<len; i++) {
        res += options[Math.floor(Math.random() * length)]
    }

    return res;
}

//SHARING ROUTES

export const shareBrain = async(req: Request, res: Response) => {
    const share = req.body.share;
    const hash = hashFunction(10);

    if(share) {

        const existingLink = await LinkModel.findOne ({
            userId: req.userId
        });

        if(existingLink) {

            res.json ({
                hash: existingLink.hash
            })
            return;
        }


        await LinkModel.create ({
            userId: req.userId,
            hash: hash
        })

        res.json ({
            message: hash
        })
    }
    else {
        await LinkModel.deleteOne ({
            userId: req.userId
        })

        res.json ({
            message: "removed link"
        })
    }
}

export const accessBrain = async(req: Request, res: Response) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne ({
        hash
    })

    if(!link) {
        res.status(411).json ({
            message: "Invalid input"
        })

        return;
    }

    const content = await ContentModel.find ({
        userId: link.userId
    })

    const user = await UserModel.findOne ({
        _id: req.userId
    })

    res.json ({
        username: user?.username,
        content: content
    })
}