import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "../../app/auth/Login";
import Home from "../../app/home/Home";
import Register from "../../app/auth/Register";
import CreateCollection from "../../app/collections/CreateCollection"
import Collections from "../../app/collections/CollectionsIndex"
import CollectionShow from "../../app/collections/CollectionShow"
import CreateItem from "../../app/collections/items/CreateItem"
import ItemShow from "../../app/collections/items/ItemShow";
import routes from "../../shared/constants/routes";
import Dashboard from "../dashboard/Dashboard";
import CollectionsAll from "../../app/collections/CollectionsAll";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path={routes.COLLECTION_SHOW} element={<CollectionShow />} />
            <Route exact path={routes.HOME} element={<Home />} />
            <Route path={routes.LOGIN} element={<Login />} />
            <Route path={routes.REGISTER} element={<Register />} />
            <Route path={routes.COLLECTIONS} element={<Collections />} />
            <Route path={routes.COLLECTION_CREATE} element={<CreateCollection />} />
            <Route path={routes.ITEM_CREATE} element={<CreateItem/>} />
            <Route path={routes.ITEM_SHOW} element={<ItemShow/>} />
            <Route path={routes.DASHBOARD} element={<Dashboard/>} />
            <Route path={routes.ALL_COLLECTIONS} element={<CollectionsAll/>} />
        </Routes>
    );
}
