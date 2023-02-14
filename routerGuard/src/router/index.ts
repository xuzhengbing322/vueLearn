import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"

  },
  {
    path: '/home',
    name: 'home',
    component: () => import("../views/HomeView.vue"),
    meta: {
      title: "主页"
    },
    children: [
      {
        path: "/home/news",
        name: "news",
        component: () => import("@/views/NewView.vue"),
        meta: {
          title: "新闻"
        },
      },
      {
        path: "/home/message",
        name: "message",
        component: () => import("@/views/MessageView.vue"),
        meta: {
          title: "信息"
        },
        children: [{
          path: "/home/message/detail",
          name: "detail",
          component: () => import("@/views/DetailView.vue"),
          meta: {
            title: "详情"
          },
          /*beforeEnter会创建一个路由独享守卫。守卫只在进入路由时出发，不会在params、query或hash改变时触发。*/
          beforeEnter: (to, from) => {
            if (from.name === "message") {
              return true
              /*return {name:"detail"}就相当于是一次进入detail的路由跳转。因此会再次执行beforeEnter()。导致无限重定向*/
            } else {
              return false
            }
          }
        },
        ]
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫的使用场景一般是通过判断某个条件来确定是否进行路由跳转。这个条件一般为本地存储的token、meta路由元信息等等。

/*router.beforeEach()会注册一个全局前置守卫。
初始化的时候和每次导航触发（路由跳转或网页地址改变）之前，beforeEach()的参数函数都会执行一次。全局前置守卫按创建顺序调用。
参数to:当前导航正要去的路由
参数from：当前导航正要离开的路由
参数函数返回值：（1）false：取消当前的导航。如果浏览器的URL改变了，那么URL地址会重置到from路由对应的地址。
（2）路由地址: 通过路由地址跳转到不同的路由，类似于router.push()。例如：return {name: 'home'}
（3）undefined/返回true：导航生效，并调用下一个导航守卫
*/
router.beforeEach((to, from) => {
  // 去news和message组件需要由useName。
  if (to.path === "/home/news" || to.name === "message") {
    if (localStorage.getItem("useName") === "Squirtle") {
      return true
    } else {
      alert("没有权限")
      return false
    }
  } else {
    // 去home组件
    return true
  }

})


/*router.afterEach()会注册一个全局后置路由守卫。
全局后置守卫不会接受next函数，也不会改变导航本身。它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。

*/
router.afterEach((to, from) => {
  //点击每一个路由都切换document.title
  const { title } = to.meta;
  // document.title是string类型，title是unknow类型，需要将title类型断言为string
  document.title = title as string || 'vue-advance';
})


export default router
