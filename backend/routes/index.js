import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {getCollections, NewCollection, getCollection, deleteCollection} from "../controllers/Collections.js";
import {deleteItem, getItem, getItems, lastItems, newItem} from "../controllers/Item.js";
import {getComments, newComments} from "../controllers/Comments.js";

const router = express.Router();

router.get('/api/users', verifyToken, getUsers);
router.post('/api/users', Register);
router.post('/api/login', Login);
router.get('/api/token', refreshToken);
router.delete('/api/logout', Logout);

router.get('/api/collections', verifyToken, getCollections)
router.get('/api/collections/:id', getCollection)
router.post('/api/collections', verifyToken, NewCollection);
router.delete('/api/collections/:id', verifyToken, deleteCollection);
router.delete('/api/collections/:collectionId/:id', deleteCollection);

router.get('/api/items', lastItems);
router.get('/api/collections/:collectionId/items', getItems);
router.get('/api/collections/:collectionId/items/:id', getItem);
router.post('/api/collections/:collectionId/items', verifyToken, newItem);
router.delete('/api/collections/:collectionId/items/:id', verifyToken, deleteItem);

router.get('/api/collections/:collectionId/items/:itemId/comments', getComments);
router.post('/api/collections/:collectionId/items/:itemId/comments', verifyToken, newComments);


export default router;
