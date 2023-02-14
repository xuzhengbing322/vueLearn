// 通过实例化类Element，就可将参数转化为对象。
class Element {
      constructor (type, props,children) {
            this.type = type;
            this.props = props;
            this.children = children
      }
}

export default Element;