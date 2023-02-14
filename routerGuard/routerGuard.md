 ### 路由守卫
    路由守卫分为导航守卫和组件内的守卫。导航守卫包括：全局前置路由守卫router.beforeEach((to,from) 
=> {})、全局后置路由守卫router.afterEach((to,from) => {})、路由独享守卫beforeEnte: (to,from) => {}。参数to是当前导航正要去的路由。参数from：当前导航正要离开的路由。 参数函数返回值：（1）false：取消当前的路由跳转，并将网页地址重置到跳转之前。（2）路由地址：跳转到路由地址所对应的vue组件。类似于router.push()。例如：return {name: 'home'}（3）undefined/返回true：允许本次路由跳转，并调用下一个路由守卫。
  组件内的守卫包括：onBeforeRouteUpdate(to, from) {}和onBeforeRouteLeave(to, from) {}

  全局前置路由守卫和全局后置路由守卫在routes以外配置，适用于全局。路由独享守卫在路由配置对象中定义。组件
内的守卫在组件内定义。

  全局前置路由守卫在组件初始化时和路由跳转之前，router.beforeEach((to,from) => {})的参数函数都会执
行一次。常用于判断用户是否登陆。

  全局后置路由守卫在组件初始化时和路由跳转之前，router.afterEach((to,from) => {})的参数回调函数都会
执行一次。全局后置路由守卫不会影响路由的跳转，而是用于更改页面标题等事情。

  路由独享守卫只在进入路由时触发，不会在params、query或hash改变时触发。例如，从/users/2进入到/users/
3就不会触发路由独享守卫。 路由地址发生变化才会触发。路由独享守卫常用于判断跳转到该路由的之前的路由。

  onbeforeRouteUpdate(to, from) {}：在当前路由改变，但是该组件被复用时调用。举例来说，对于一个带有动
态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。

  onBeforeRouteLeave(to, from) {}：在导航离开渲染该组件的对应路由时调用。一般用于离开组建的提示操作
这。
