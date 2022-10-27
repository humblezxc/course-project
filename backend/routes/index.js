import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {getCollections, NewCollection, getCollection} from "../controllers/Collections.js";
import {deleteItem, getItem, getItems, newItem} from "../controllers/Item.js";
import {getComments, newComments} from "../controllers/Comments.js";

const router = express.Router();

router.get('/api/users', verifyToken, getUsers);
router.post('/api/users', Register);
router.post('/api/login', Login);
router.get('/api/token', refreshToken);
router.delete('/api/logout', Logout);

router.get('/api/collections', getCollections)
router.get('/api/collections/:id', getCollection)
router.post('/api/collections', NewCollection);

router.get('/api/collections/:collectionId/items', getItems);
router.get('/api/collections/:collectionId/items/:id', getItem);
router.post('/api/collections/:collectionId/items', newItem);
router.delete('/api/collections/:collectionId/items/:id', deleteItem);

router.get('/api/collections/:collectionId/items/:itemId/comments', getComments);
router.post('/api/collections/:collectionId/items/:itemId/comments', newComments);


export default router;
