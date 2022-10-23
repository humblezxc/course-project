import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {getCollections, NewCollection, getCollection} from "../controllers/Collections.js";
import {deleteItem, getItems, newItem} from "../controllers/Item.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/collections', getCollections)
router.get('/collections/:id', getCollection)
router.post('/collections', NewCollection);

router.get('/collections/:id/items', getItems);
router.post('/collections/:id/items', newItem);
router.delete('/collections/:collectionId/items/:id', deleteItem);


export default router;
