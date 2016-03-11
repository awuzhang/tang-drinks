
// 本项目使用 vue.js 
// 参考API http://cn.vuejs.org/

//菜单
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
    ]

var drinksVm = new Vue({
  el: '#main',
  data: {
    drinks : drinks
  },
  computed: {
    amountByType: function () {
      var amounts = [];
      for(var type in this.drinks){
        var sun = 0;
        for(var items in this.drinks[type].items){
          var amount = this.drinks[type].items[items].amount -0;
          sun += amount;
        }
        amounts.push(sun);
      }
      return amounts;
    }
  },
  methods: {
    plus: function (item, event) {
      item.amount = parseInt(item.amount);
      item.amount += 1;
    },
    less : function (item, event) {
      item.amount -= 1;
      if(item.amount < 0 ) {item.amount = 0}
    }
  }
});

// 购物车
var orders = [];
var shoppingCarVm = new Vue({
  el : '#order', 
  data : {
    orders : orders
  },
  methods: {
    plus: function (order, event) {
      var index = orderhas(item.name);
      if(index > 0) {
        item.amount = parseInt(item.amount);
        item.amount += 1;
      }
      drinkItem.amount = 1
      orders.push(drinkItem)
    },
    less : function (order, event) {
      item.amount -= 1;
      if(item.amount < 0 ) {item.amount = 0}
    },
    plusDrink : function(drinkItem, event) {
      var item = drinkItem; item.amount = 1;
    },
    lessDrink: function(drinkItem, event) {

    },
    amountCount : function() {
      return 0;
    }
  }
})







new Vue({
  el: '#app'
})







