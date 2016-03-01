var drinks = [  
      {'type' : 'Tea' , 
       'name' : '茶' ,
       'items' : [ {'name' : 'Ti Kuan Yin Tea', 'name_zh' : '铁观音', 'amount' : '0'},
                   {'name' : 'Longjing Green Tea', 'name_zh' : '龙井', 'amount' : '0'},
                   {'name' : 'Pu-erh Tea', 'name_zh' : '普洱', 'amount' : '0'},
                   {'name' : 'Lapsang Souchong Black Tea', 'name_zh' : '正山小种', 'amount' : '0'},
                   {'name' : 'Clovershrub Tea', 'name_zh' : '大红袍', 'amount' : '0'}
                ]},
      {'type' : 'Coffee' , 
       'name' : '咖啡' ,
       'note' : '(需等待25分钟 25-minute wait)',
       'items' : [ {'name' : 'Americano', 'name_zh' : '美式咖啡', 'amount' : '0'},
                   {'name' : 'Latte', 'name_zh' : '拿铁', 'amount' : '0'},
                   {'name' : 'Mocha', 'name_zh' : '摩卡', 'amount' : '0'},
                   {'name' : 'Cappuccino', 'name_zh' : '卡布奇诺', 'amount' : '0'}
                ]},
      {'type' : 'Juice' , 
       'name' : '果汁' ,
       'note' : '(需等待25分钟 25-minute wait)',
       'items' : [ {'name' : 'Orange juice', 'name_zh' : '鲜榨橙汁', 'amount' : '0'}
                ]},
      {'type' : 'Other' , 
       'name' : '其它' ,
       'items' : [ {'name' : 'Mineral water', 'name_zh' : '矿泉水', 'amount' : '0'},
                   {'name' : 'Coca-Cola', 'name_zh' : '可口可乐', 'amount' : '0'},
                   {'name' : 'Ice Tea', 'name_zh' : '冰红茶', 'amount' : '0'}
                ]}

    ];


var vm = new Vue({
  el: '#main',
  data: {
    drinks : drinks ,
    order : []
  },
  methods: {
    plus: function (item, event) {
      item.amount -= 0;
      item.amount += 01;
    },
    less : function (item, event) {
      item.amount -= 1;
      if(item.amount < 0 ) {item.amount = 0}
    },
    amountCount : function() {
      return 0;
    }
  },
  filters: {
    // marked: marked
  }
})

















