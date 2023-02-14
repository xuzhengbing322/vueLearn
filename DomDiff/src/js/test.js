const patches = {
      // 第0项有一个补丁，补丁的类型是属性类型，属性类型的值变更为list-wrap。0是dom diff给节点的标号
      0: [{
            type: 'ATTR',
            attrs: {
                  class: 'list-wrap'
            }
      }],
      2: [{
            type: 'ATTR',
            attrs: {
                  class: 'title'
            }
      }],
      3: [{
            type: 'TEXT',
            text: '特殊列表项'
      }],
      // 删除第六项
      6: [{
            type: 'REMOVE',
            index: 6
      }],
      // 新的节点
      7: [{
            type: 'REPLACE',
            newNode: newNode
      }]
}