关键点
    1、选中高亮实现：（1）创建一个current变量，用于接收被选中的容器id。（2）给for循环的<li>设置点击函数，并获取包含id的参数。
（3）点击函数实现将获取到的id值赋给current变量。（4）创建动态样式，样式生效的条件是容器id和current值相同。
    2、有些组建件的结构和样式相同，只是数据有些不同。此时可以创建公用组件，然后通过组建件的传递数据，将数据传到对应的组件中。
实现代码的复用。
    3、在数据对象中创建回调函数。callback:(params)=>menuMethod(params)：使用menuMethod()方法充当函数callback的函数体，
有利于维护和美观。执行callback函数就是执行menuMethod()方法。
    4、ts中的任何数据都应该提前声明数据类型。(element as any).active = false。如果对象属性报错，可以将它重申明为any。


