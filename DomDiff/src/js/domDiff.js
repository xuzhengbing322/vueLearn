import {
      ATTR,
      TEXT,
      REPLACE,
      REMOVE
} from './patchTypes'

// 很多地方都要用，所以单独声明一个变量来存储它。整个虚拟节点的补丁包
let patches = {};
// 深度的遍历所用的index
let vnIndex = 0;

function domDiff(oldVDom, newVDom) {
      // 初始的，vnodeWalk所使用的index
      let index = 0;
      // vNodeWalk比较虚拟dom的方法。walk在底层代码的意思是遍历递归的意思。
      vNodeWalk(oldVDom, newVDom, index)
      return patches
}

/*参数不应该是oldVDom，因为递归的时候还得执行vNodeWalk，所以其实它走的是节点。
每执行一次vNodeWalk，实际上都应该有自己的补丁。
index是横向遍历的序号，必须是私有变量。这样才能保证每次vNodeWalk是一致的
*/
function vNodeWalk(oldNode, newNode, index) {
      let vnPatch = [];

      // 判断新的节点是否存在，不存在就证明被删除了。
      if (!newNode) {
            vnPatch.push({
                  type: REMOVE,
                  index
            })
            // 如果新旧节点都是文本节点，它就只是text的变更。
      } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
            // 如果两个节点的内容不同, 节点的内容就是newNode。也就是新内容覆盖就内容
            if (oldNode !== newNode) {
                  vnPatch.push({
                        type: TEXT,
                        text: newNode
                  })
            }
            /*如果两个都不是字符串，那他们就是元素节点。oldNode.type就是标签名，ul\li。
            标签名相等就要对比属性。节点可能还有子节点，子节点可能有变化，所以要继续走下去。 
            
            */
      } else if (oldNode.type === newNode.type) {
            // 先把属性的补丁拿出来。这一项标签上面的属性的补丁。attrsWalk：专门遍历属性的方法，参数为新旧节点的属性
            const attrPatch = attrsWalk(oldNode.props, newNode.props)
            // console.log("attrPatch",attrPatch)

            // 将attrPatch放入到vnPatch中。先判断attrPatch是否为空对象
            if (Object.keys(attrPatch).length > 0) {
                  // 将attrPatch放入到vnPatch中。
                  vnPatch.push({
                        type: ATTR,
                        attrs: attrPatch
                  });
            }
            // 遍历递归子节点们
            childrenWalk(oldNode.children, newNode.children)
      // 其他情况，替换
      } else {
            vnPatch.push({
                  type: REPLACE,
                  newNode: newNode
            })
      }

      // 判断vnPatch中是否有补丁。  ========
      if (vnPatch.length > 0) {
            // 将vnPatch中的补丁放入patches对象中，属性就是index序号。这就是变成了test.js中的
            patches[index] = vnPatch;
      }

}

// 拿到两个节点的新旧属性
function attrsWalk(oldAttrs, newAttrs) {
      // 拿到它的补丁。 
      let attrPatch = {};

      // 遍历老的属性，
      for (let key in oldAttrs) {
            // 如果老的属性不等于新的属性。修改属性
            if (oldAttrs[key] !== newAttrs[key]) {
                  /*把补丁打进去。newAttrs[key]和oldAttrs[key]有相同的属性，但是属性值不同。
                  那就要将新的属性值赋值到老的属性值中去。不能够直接修改oldAttrs，所以只能把补丁打进去。
                  
                  */
                  attrPatch[key] = newAttrs[key]
            }
      }

      // 新增属性
      for (let key in newAttrs) {
            // 判断newAttrs中的键名在oldAttrs中有没有。如果没有就要打补丁。
            if (!oldAttrs.hasOwnProperty(key)) {
                  // 打补丁
                  attrPatch[key] = newAttrs[key];
            }
      }

      // 属性补丁就完成了
      return attrPatch
}

function childrenWalk(oldChildren, newChildren) {
      oldChildren.map((oldNode, idx) => {
            /*遍历下面子节点的同时，要走walk  。因为它就是个递归的过程，它每一层都是通过createElement出来
            的，它的结构是一样的。因此我们直接复用递归vNodeWalk。它就一层一层的把事情做了。
            */
            //      oldNode就是c，newNode就是newChildren中的某一项。oldChildren是往下遍历的，每循环一次vnIndex都要自增
            console.log("oldNode", oldNode, "idx",idx, "vnIndex", vnIndex, "newChildren",newChildren)
            vNodeWalk(oldNode, newChildren[idx], ++vnIndex)
      });
}

export default domDiff;