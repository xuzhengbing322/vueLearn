import Vue from '../vue'


/*首先，创建一个Vue构造函数，传入options，即对象。然后在options中声明data函数。

*/ 
let vm = new Vue({
      el: '#app',
      data() {
            return {
                  title: '学生列表',
                  className: 1,
                  total: 2,
                  teacher: ['张三', '李四'],
                  info: {
                        a: {
                              b: 1
                        }
                  },
                  students: [{
                              id: 1,
                              name: '小红'
                        },
                        {
                              id: 2,
                              name: '小明'
                        }
                  ]
            }
      }
});

// 原始值没有设置响应式。
console.log(vm.teacher[0])
console.log(vm.info.a.b)
console.log(vm.students[0].id)
console.log(vm.students.push({
      id: 3,
      name: '小白'
}))