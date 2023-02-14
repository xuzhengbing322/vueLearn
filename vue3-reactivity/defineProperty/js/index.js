class Compute {
      plus(a, b) {
            return a + b;
      };

      minus(a, b) {
            return a - b;
      };

      mul(a, b) {
            return a * b;
      };

      div(a, b) {
            return a / b;
      }
}

// 继承Compute，好使用它的方法
class Calculator extends Compute {
      constructor(doc) {
            super();
            // 获取最外层的盒子
            const oCal = doc.getElementsByClassName('J_calculator')[0];
            // 获取input节点
            this.fInput = oCal.getElementsByTagName('input')[0];
            this.sInput = oCal.getElementsByTagName('input')[1];
            // 获取btn节点，用作事件代理
            this.oBtnGroup = oCal.getElementsByClassName('btn-group')[0];
            // 所有的btn集合，
            this.oBtnItems = this.oBtnGroup.getElementsByTagName('button');
            // 获取结果节点
            this.oResult = oCal.getElementsByClassName('result')[0]

            // 期待的数据
            this.data = this.defineData()
            // 点击btn的时候要切换
            this.btnIdx = 0;

      }

      init() {
            // 初始化事件处理函数
            this.bindEvent();
      }
      // 事件处理函数的绑定
      bindEvent() {
            this.oBtnGroup.addEventListener('click', this.onfieldBtnCllick.bind(this), false)
            this.fInput.addEventListener('input', this.onNumberInput.bind(this), false)
            this.sInput.addEventListener('input', this.onNumberInput.bind(this), false)
      }

      // 定义数据
      defineData() {
            let _obj = {},
                  fNumber = 0,
                  sNumber = 0,
                  field = 'plus';
            // this指向函数的引用，即类。因此将类的作用域赋给_self
            let _self = this;
            /*给_obj添加fNumber、sNumber、field属性，并通过get/set实现数据劫持。
            
            */  
            Object.defineProperties(_obj, {
                  fNumber: {
                        // get就返回上面的数据即可
                        get() {
                              console.log("got")
                              return fNumber;
                        },
                        set(newVal) {
                              fNumber = newVal;
                              console.log("fNumber changed", fNumber);
                              // console.log("this", this) //_obj
                              // 每次设置值的时候，都要重新计算数据结果。使用dafineData作用域中的computedResult
                              _self.computeResult(fNumber, sNumber, field)
                        },
                  },
                  sNumber: {
                        get() {
                              console.log("got")
                              return sNumber;
                        },
                        set(newVal) {
                              sNumber = newVal;
                              console.log("sNumber changed", sNumber);
                              _self.computeResult(fNumber, sNumber, field)
                              
                        },
                  },
                  field: {
                        get() {
                              console.log("got")
                              return field;
                        },
                        set(newVal) {
                              field = newVal;
                              console.log("field changed", field);
                              _self.computeResult(fNumber, sNumber, field)
                              
                        },
                  }
            })
            return _obj
      };

      onfieldBtnCllick(ev) {
            let e = ev || window.event,
                  tar = e.target || e.srcElement,
                  //获取点击的标签名
                  tagName = tar.tagName.toLowerCase();

            // 点击到button标签，则执行fieldUpdate进行数据更新。
            tagName === 'button' && this.fieldUpdate(tar)
      }

      // 实现点击切换btn样式
      fieldUpdate(target) {
            // 将上一次的按钮样式清空
            this.oBtnItems[this.btnIdx].className = '';
            // 将当前点击的标签target做为indexOf()的参数，查看它在oBtnItems的位置，并将位置做为btnIdx的值，以便下次清除样式
            this.btnIdx = [].indexOf.call(this.oBtnItems, target);
            // 给点击的标签添加样式。
            target.className += ' current';
            /*将data.field改为当前点击标签的data-field属性值。获取最新值的同时就会执行
            defineProperties()中的field.set()。从而实现data.field的响应式，即视图和数据源的双向绑定
            
            */
            this.data.field = target.getAttribute('data-field');
      }

      onNumberInput(ev) {
            const e = ev || window.event,
                  tar = e.target || e.srcElement,
                  className = tar.className,
                  // 获取标签的值，将字符串转位数字，并去掉空格。如果tar.value是Na，则val为0。
                  val = Number(tar.value.replace(/s+/g, '')) || 0

            // 根据不同的className执行事件处理函数的不同部分。
            switch (className) {
                  case 'f-input':
                        this.data.fNumber = val
                        break;
                  case 's-input':
                        this.data.sNumber = val
                        break;
                  default:
                        break;
            }
      };


      computeResult(fNumber, sNumber, field) {
            // 使用Compute中的计算方法。
            console.log(fNumber, sNumber, field)
            this.oResult.innerText = this[field](fNumber, sNumber)
      };


}

new Calculator(document).init()