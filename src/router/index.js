import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "home",
    path: "/",
    meta: {
      title: "首页",
    },
    redirect: "/welcome",
    component: ()=>import("./../components/Home.vue"),
    children: [
      {
        name: "welcome",
        path: "/welcome",
        meta: {
          title: "欢迎页",
        },
        component: ()=>import("./../views/Welcome.vue"),
      }
    ],
  },
  {
    name: "login",
    path: "/login",
    meta: {
      title: "登录",
    },
    component: ()=>import("./../views/Login.vue"),
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;