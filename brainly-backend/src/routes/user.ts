import { Router } from 'express';
import { UserMiddleWare } from '../middleware';
import { signup, signin, addContent, displayContent, deleteContent, searchContent, shareBrain, accessBrain } from './functions';

const UserRouter = Router();

//USERROUTES
UserRouter.post('/signup', signup);
UserRouter.post('/signin', signin)

//CONTENT ROUTES

UserRouter.post('/content', UserMiddleWare, addContent)
UserRouter.get('/content', UserMiddleWare, displayContent)
UserRouter.delete('/content', UserMiddleWare, deleteContent)
UserRouter.get('/content/title', UserMiddleWare, searchContent)

//SHARING BRAIN
UserRouter.post('/brain/share', UserMiddleWare, shareBrain)
UserRouter.get('/brain/:shareLink', accessBrain)

export default UserRouter;