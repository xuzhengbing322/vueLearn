##### 1、路由跳转	
​   1、路由路径是树形结构，主页面的路由地址是根路由地址/，其余页面的路由地址根据页面的树形关系来确定。当项目初始运行时，网页地址默认是xx/，将网络地址中的路由地址和routes中的path属性的值进行匹配。匹配成功后就将对应的component属性指向的vue组件渲染到<router-view/>标签所在的位置。当页面路径中的路由地址发生变化后，就会重写匹配和渲染。路由也有子路由，子路由的路由配置写在父路由的路由配置中的children数组属性。
​   2、component值的导入方式：（1）静态导入：通过import导入vue组件后，component属性的值就是导入的文件名。（2）动态导入：component: () => import('../views/Month.vue')。
   3、路由跳转方式：（1.1）声明式路由跳转：<router-link to="pathValue">点击跳转</router-link>。
点击router-link标签，就会将to属性的值和routes配置中的path属性的值进行匹配。匹配成功就会将相应的component属性指向的vue组件渲染到之前路由组件渲染的位置<router-view/>。最后再根据to属性的值修改网页地址。（1.2）声明式路由跳转还可以：<router-link :to="{name:"nameValue"， query:{}, params:{}}">点击跳转</router-link>。点击router-link标签，就会将nameValue和routes配置中的name属性的值进行匹配，匹配成功就将相应的component属性指向的vue组件渲染到之前路由组件渲染的位置<router-view/>。然后将query参数和params参数传递给跳转的目标组件。最后再根据to属性的值修改网页地址。通过query参数和params参数可以实现数据的传递。（2.1）编程式路由跳转：router.push|replace({name: "", query: {}, params: {}})。
编程式路由跳转必须使用name属性来执行跳转的目标路由组件。router.push()执行时，根据name属性的值和routes中的name属性的值进行匹配。匹配成功就将相应的component属性指向的vue组件渲染到之前路由组件渲染的位置<router-view/>。然后将query参数和params参数传递给跳转的目标组件。最后根据routes中相应的path属性的值修改网页地址。编程式路由跳转处理参数更方便。
​   4、query参数和params参数的区别：params参数属于路径中的一部分。如果路由跳转时有params参数，那么目标组件的path属性的值必须有占位符(/:paramsName?)。?表示占位符可以取消，即也匹配没有params参数的情况。query参数不属于路径的一部分，因此不需要占位。query参数的值会在页面地址的?后面显示。
​   5、router和route的区别：route对象包含当前组件的路由信息，例如query、params、name、path、meta、hash等属性。router对象包含push()和replace()方法，可以进行路由跳转。


### 2、路由守卫