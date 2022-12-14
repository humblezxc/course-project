const routes = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    COLLECTION_CREATE: "/collections/create",
    COLLECTIONS: "/collections",
    COLLECTION_SHOW: "/collections/:id",
    ITEMS: "/collections/:collectionId/items",
    ITEM_CREATE: "/collections/:collectionId/items/create",
    ITEM_SHOW: "/collections/:collectionId/items/:itemId",
    ITEM_EDIT: "/collections/:collectionId/items/:itemId/edit",
    ITEM_DELETE: "/collections/:collectionId/items/:itemId/delete",
    DASHBOARD: "/dashboard",
    ALL_COLLECTIONS: "/collections/all"
};

export default routes;
