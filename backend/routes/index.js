import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {getCollections, NewCollection, getCollection} from "../controllers/Collections.js";
import {deleteItem, getItem, getItems, newItem} from "../controllers/Item.js";
import {getComments, newComments} from "../controllers/Comments.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/collections', getCollections)
router.get('/collections/:id', getCollection)
router.post('/collections', NewCollection);

router.get('/collections/:collectionId/items', getItems);
router.get('/collections/:collectionId/items/:id', getItem);
router.post('/collections/:collectionId/items', newItem);
router.delete('/collections/:collectionId/items/:id', deleteItem);

router.get('/collections/:collectionId/items/:itemId/comments', getComments);
router.post('/collections/:collectionId/items/:itemId/comments', newComments);


export default router;
