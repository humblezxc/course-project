import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../app/auth/Login";
import Home from "../../app/home/Home";
import Register from "../../app/auth/Register";
import CreateCollection from "../../app/collections/CreateCollection"
import CreateItem from "../../app/collections/items/CreateItem"
import routes from "../../shared/constants/routes";

export default function AppRoutes() {
    return (
        <Routes>
            <Route exact path={routes.HOME} element={<Home />} />
            <Route path={routes.LOGIN} element={<Login />} />
            <Route path={routes.REGISTER} element={<Register />} />
            <Route path={routes.COLLECTION_CREATE} element={<CreateCollection />} />
            <Route path={routes.ITEM_CREATE} element={<CreateItem/>} />
        </Routes>
    );
}
