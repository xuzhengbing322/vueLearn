import Element from "./Element";

// createElement，将参数转换为对象。
function createElement(type, props, children) {
      return new Element(type, props, children)
}

// node是添加属性的节点，prop是属性，value是属性的值
function setAttrs(node, prop, value) {
      // 判断node的标签名是否为input或textarea。如果是则给节点添加value属性，值为也是value
      switch (prop) {
            case 'value':
                  if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
                        node.value = value;
                  } else {
                        //   给节点添加prop属性，属性的值为value。
                        node.setAttribute(prop, value)
                  }
                  break;
                  //   设置样式style
            case 'style':
                  node.style.cssText = value;
                  break;
                  // 其他情况
            default:
                  node.setAttribute(prop, value);
                  break;
      }
}

// 将虚拟节点对象转化成真实的dom节点。
function render(vDom) {
      // 用同名属性名解析vDom对象中的属性。
      const {
            type,
            props,
            children
      } = vDom,
      // 创建一个真实的DOM节点，vDom.type就是标签名
      el = document.createElement(vDom.type);
      // props对象的属性和属性值都要放入节点当中
      for (let key in props) {
            setAttrs(el, key, props[key])
      }

      // 子节点
      children.map((c) => {
            // children是数组，它的元素可能是Element()构造出来的对象，也有可能只是文本
            // if (c instanceof Element) {
            //       // 如果是Element()构造出来的对象，则再次执行render
            //       c = render(c);
            // } else {
            //       // 给节点添加文本内容。
            //       c = document.createTextNode(c)
            // }

            c = c instanceof Element ? render(c) : document.createTextNode(c)
            // 把所有的子节点c放入node中
            el.appendChild(c);
      })
      return el;
}

// 将rDom渲染到HTML页面上。rootEl就是HTML中的appDOM
function renderDOM (rDom, rootEl) {
      rootEl.appendChild(rDom);
}

export {
      createElement,
      render,
      setAttrs,
      renderDOM
}