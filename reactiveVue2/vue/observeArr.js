import observe  from "./observe"

// 观察数组新增元素项，将它变成响应式数据
function observeArr (arr) {
      for (var i = 0; i < arr.length; i++) {
            observe(arr[i])
      }
}

export default observeArr