function DataArr () {
      let _val = null;
          _arr = [];
      
      Object.defineProperty(this, 'val', {
            get: function () {
                  return _val;
            },
            set: function (newVal) {
                  _val = newVal;
                  _arr.push({val: _val});
                  console.log(`新值${_val}放入了数组`);
            }
      });

      this.getArr = function () {
            return _arr;
      }
}

let dataArr = new DataArr();

dataArr.val = 123;
dataArr.val = 234;
console.log(dataArr.getArr())