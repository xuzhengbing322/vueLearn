import {
      ATTR,
      TEXT,
      REPLACE,
      REMOVE
} from './patchTypes'
import { setAttrs, render } from './virtualDom';
import Element from './Element'

let finalPatches = {},
      // 真实节点的索引
      rnIndex = 0;

function doPatch(rDom, patches) {
      finalPatches = patches;
      rNodeWalk(rDom);
}

function rNodeWalk(rNode) {
      // 把对应节点的补丁拿过去
      const rnPatch = finalPatches[rnIndex++],
            //  把真实节点的子节点取出来
            childNodes = rNode.childNodes;
      // childNodes是类数组，因此通过...转换成真正的数组。每次循环都会取出一个子节点。
      [...childNodes].map((c) => {
            // 每遍历一次都会把一个子节点放进去。vNodeWalk原理相同
            rNodeWalk(c);
      });

      // 判断rnPatch是否存在，如果存在就要打补丁。
      if (rnPatch) {
            // 将当前的补丁打到当前节点中。
            patchAction(rNode, rnPatch);
      }
}

function patchAction(rNode, rnPatch) {
      // p => patch
      rnPatch.map((p) => {
            switch (p.type) {
                  case ATTR:
                        for (let key in p.attrs) {
                              const value = p.attrs[key];

                              // 判断这个属性是否存在，如果不存在就删除。
                              if (value) {
                                    setAttrs(rNode, key, value)
                              } else {
                                    rNode.removeAttribute(key);
                              }
                        }
                        break;
                  case TEXT:
                        rNode.textContent = p.text;
                        break;
                  case REPLACE:
                        // 判断newNode是否为Element构造出来的，如果是则为虚拟节点，用render将虚拟节点变为真实节点，如果不是则就是文本，添加即可
                        const newNode = (p.newNode instanceof Element) 
                                          ? render(p.newNode)
                                          : document.createTextNode(p.newNode);
                        rNode.parentNode.replaceChild(newNode, rNode);
                        break;
                  case REMOVE:
                        // rNode走到父亲那里去，然后删除自己
                        rNode.parentNode.removeChild(rNode)
                        break;
                  default:
                        break;
            }
      })
}

export default doPatch