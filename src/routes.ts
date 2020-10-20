import { Router } from 'express'
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import SessionsController from './controllers/SessionsController';
import UsersController from './controllers/UsersController';
import verifyJWT from './middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);


routes.get('/orphanages', verifyJWT, OrphanagesController.index)

routes.get('/orphanages/:id', verifyJWT, OrphanagesController.show)

routes.post('/orphanages', verifyJWT, upload.array('images'), OrphanagesController.create);
routes.post('/users/sign_up', UsersController.create)
routes.post('/users/login', SessionsController.create)

export default routes;
