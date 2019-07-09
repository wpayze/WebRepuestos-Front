import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/About.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () =>
                import ("./views/Register.vue")
        },
        {
            path: "/login",
            name: "login",
            component: () =>
                import ("./views/Login.vue")
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: () =>
                import ("./views/Dashboard.vue")
        },
        {
            path: "/profile/:id",
            name: "profile",
            component: () =>
                import ("./views/Profile.vue")
        },
        {
            path: "/products",
            name: "products",
            component: () =>
                import ("./views/Products.vue")
        },
        {
            path: "/product/:id",
            name: "product",
            component: () =>
                import ("./views/Product.vue")
        },
        {
            path: "/search/:name/:category_id",
            name: "search",
            component: () =>
                import ("./views/Search.vue")
        },
        {
            path: "/category_products/:category_id",
            name: "category_products",
            component: () =>
                import ("./views/CategoryProducts.vue")
        },
        {
            path: "/itemList",
            name: "itemList",
            component: () =>
                import ("./views/ItemList.vue")
        },
        {
            path: "/success",
            name: "success",
            component: () =>
                import ("./views/Success.vue")
        },
        {
            path: "/terminos",
            name: "terminos",
            component: () =>
                import ("./views/Terms.vue")
        },
        {
            path: "/orders",
            name: "orders",
            component: () =>
                import ("./views/Orders.vue")
        },
        {
            path: "/invoice/:id",
            name: "invoice",
            component: () =>
                import ("./views/Invoice.vue")
        }
    ]
});