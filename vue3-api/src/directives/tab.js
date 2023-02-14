export default {
      /**自定义指令挂载到HTML页面后，就会执行mounted()生命周期函数。当数据更新时就会执行updated()
       生命周期函数。
       * mounted()和updated()具有相同的参数：el、binding、vnode。el是指自定义指令的父级DOM元素。
       因此，可以通过el找到父级元素的所有子元素。binding.value对象是自定义指令传递过来的数据。每次
       点击新的选项，指令都会再次传递数据。bind.oldValue可以获取上一次指令传递过来的数据。      
       */ 
      mounted(el, binding) {
            /*解构出自定义指令传递过来的数据。
            className是静态类，activeClass是动态类，curIndx是当前聚焦元素的序号*/ 
            const {className, activeClass, curIdx} = binding.value;
            // 找到el中所有类为className的所有子元素。oItemBtns是数组。
            const oItemBtns = el.getElementsByClassName(className);
            // oItemBtns[curIdx]找到当前的聚焦子元素，给子元素添加动态类。
            oItemBtns[curIdx].className += ` ${activeClass}`
            
      },

      updated(el, binding) {
            // 获取上一次指令传递过来的数据中的curIdx，即上一次聚焦的选项。
            const oldCurIdx = binding.oldValue.curIdx;
            const {className, activeClass, curIdx} = binding.value;
            const oItemBtns = el.getElementsByClassName(className);

            // 将上一次聚焦的选项的类改为静态类
            oItemBtns[oldCurIdx].className = className;
            // 改变当前聚焦的类
            oItemBtns[curIdx].className += ` ${activeClass}`
      },
}