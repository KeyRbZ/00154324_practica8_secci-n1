import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/users.js';

const router = express.Router();

// Todas las rutas protegidas con JWT
router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUserById);
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;