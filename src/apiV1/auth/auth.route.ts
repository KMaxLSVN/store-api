import { Router } from 'express';
import Controller from './auth.controller';
import verifyToken from '../../helpers/verifyToken';

const user: Router = Router();
const controller = new Controller();

// Sign In
user.post('/authenticate' ,controller.authenticate);

// Register New User
user.post('/register', controller.register);

// Get session
user.get('/session', verifyToken, controller.getSession);

export default user;