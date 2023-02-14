/**创建一个节点，参数1是ul，参数2是它的属性，参数3是它的子节点。子节点的参数也遵循这个规律。
 * 将代码层面的虚拟节点转化成能够看到的对象结构。
 * */
import { createElement, render, renderDOM } from './virtualDom'
import domDiff from './domDiff';
import doPatch from './doPatch'

const vDom1 = createElement('ul', {
      class: 'list',
      style: 'width: 300px; height: 300px; background-color: orange'
}, [
      createElement('li', {
            class: 'item',
            'data-index': 0
      }, [
            createElement('p', {
                  class: 'text'
            }, ['第1个列表项'])
      ]),
      createElement('li', {
            class: 'item',
            'data-index': 1
      }, [
            createElement('p', {
                  class: 'text'
            }, [
                  createElement('span', {
                        class: 'title'
                  }, [])
            ])
      ]),
      createElement('li', {
            class: 'item',
            'data-index': 2
      }, [
            '第3个列表项'
      ])
]);

/*将更改的补丁做出来。

*/ 
const vDom2 = createElement('ul', {
      class: 'list-wrap',
      style: 'width: 300px; height: 300px; background-color: orange'
}, [
      createElement('li', {
            class: 'item',
            'data-index': 0
      }, [
            createElement('p', {
                  class: 'title'
            }, ['特殊列表项'])
      ]),
      createElement('li', {
            class: 'item',
            'data-index': 1
      }, [
            createElement('p', {
                  class: 'text'
            },[] )
      ]),
      createElement('div', {
            class: 'item',
            'data-index': 2
      }, [
            '第3个列表项'
      ])
]);


console.log("vDom",vDom1)

// 将虚拟DOM节点转化成真实的DOM节点
const rDom = render(vDom1)
renderDOM (
      rDom,
      document.getElementById('app')
      )

console.log("rDom",rDom)

// domDiff对比两个虚拟节点，返回补丁包。然后通过补丁包再打到真实节点中。
const patches =  domDiff(vDom1, vDom2)

// 打补丁，把虚拟DOM转化成真实dom
doPatch(rDom, patches) 

console.log("patches",patches)
