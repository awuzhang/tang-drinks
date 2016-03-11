
// 本项目使用 vue.js 
// 参考API http://cn.vuejs.org/


Vue.component('message', {
  template: '#message-template',
  data: function(){
    return {
      text : "",
      isShowPage : false,
      postOk : false,
      postErr : false
    }
  },
  events: {
    'message-init': function (message) {
      this.text = message;
      this.show();
    },
    'post-ok': function (message) {
      this.postOk = true;
      setTimeout(function(){
        location.href='http://www.tangux.com';
      }, 4000);
    },
    'post-err': function (message) {
      this.postErr = true;
    }
  },
  methods : {
    show : function(){
      this.isShowPage = true;
    }
  }
});

Vue.component('choose-color', {
  template: '#choose-color-template',
  data: function(){
    return {
      colors : colors,
      canSubmit : false,
      currColor : null,
      isShowPage : false
    }
  },
  props: [
    'selectedColor'
  ],
  events: {
    'color-init' : function() {
      this.show();
    },
    'color-selected': function () {
      this.hide();
    }
  },
  methods : {
    chooseColor : function(e) {
      this.canSubmit = true;
    },
    submit : function(event){
      selectedColor = this.currColor;
      event.target.text = "submited !";
      event.target.classList.add('submited');
      this.$dispatch('colorSubmited');
    },
    show : function(){
      this.isShowPage = true;
    },
    hide : function(){
      this.isShowPage = false;
    }
  },
  computed: {
    isCanSubmit : function() {
      return  {  'canSubmit' : this.canSubmit }
    }
  }
});

Vue.component('drinks-side', {
  template: '#drinks-side-template',
  props: { drinks : drinks },
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
  }
});

Vue.component('drinks-items', {
  template: '#drinks-items-template',
  props: ['drinks', 'orders'],
  computed: {
  },
  events: {
    'post-ok': function (message) {
      
    }
  },
  methods : {
    plus: function (item, event) {
      this.$dispatch('plus', item.name);
    },
    less : function (item, event) {
      this.$dispatch('less', item.name);
    }
  }
});

Vue.component('shiping-car', {
  template: '#shipingcar-template',
  data : function() {
    return {
      isShowOrderList : false
    }
  },
  props: ['orders'],
  computed: {
    total : function() {
      var total = 0;
      for(var orderIndex in this.orders){
        total += (orders[orderIndex].amount - 0);
      }
      return total;
    },
    canSubmit : function() {
      return  {  'canSubmit' : this.total > 0 }
    }
  },
  methods: {
    plus: function (order, event) {
      this.$dispatch('plus', order.name);
    },
    less : function (order, event) {
      this.$dispatch('less', order.name);
    },
    clear: function() {
      this.$dispatch('clear');
    },
    toggleOrderList : function() {
      this.isShowOrderList = !this.isShowOrderList ;
    },
    submit : function() {
      this.$parent.submitOrder();
    }
  }
});


//菜单
var drinks = [  
  {'type' : 'Tea' , 
   'name' : '茶' ,
   'items' : [ {'name' : 'Ti Kuan Yin Tea', 'name_zh' : '铁观音', 'amount' : '0'},
               {'name' : 'Pu-erh Tea', 'name_zh' : '普洱', 'amount' : '0'}
            ]},
  {'type' : 'Coffee' , 
   'name' : '咖啡' ,
   'items' : [ {'name' : 'Americano', 'name_zh' : '美式咖啡', 'amount' : '0'}
            ]},
  {'type' : 'Other' , 
   'name' : '其它' ,
   'items' : [ {'name' : 'Mineral water', 'name_zh' : '矿泉水', 'amount' : '0'},
               {'name' : 'Coca-Cola', 'name_zh' : '可口可乐', 'amount' : '0'},
               {'name' : 'Ice Tea', 'name_zh' : '冰红茶', 'amount' : '0'}
            ]}
];
var orders = [{'name' : 'Ti Kuan Yin Tea', 'name_zh' : '铁观音', 'amount' : '0'},
              {'name' : 'Pu-erh Tea', 'name_zh' : '普洱', 'amount' : '0'},
              {'name' : 'Americano', 'name_zh' : '美式咖啡', 'amount' : '0'},
              {'name' : 'Mineral water', 'name_zh' : '矿泉水', 'amount' : '0'},
              {'name' : 'Coca-Cola', 'name_zh' : '可口可乐', 'amount' : '0'},
              {'name' : 'Ice Tea', 'name_zh' : '冰红茶', 'amount' : '0'}];

var colors = [ '#d8261b' ,'#f8921f' ,'#fff100' ,'#8fc31f' ,'#13b5b1' ,
               '#00a0e9' ,'#5f52a0' ,'#e51983' ,'#935615' ,'#7a7979']
var selectedColor = "";

Vue.component('drinks-main', {
  data: function() {
     return {
       drinks : drinks,
       orders : orders,
       selectedColor : selectedColor
     }
  },
  events: {
    'plus' : function(name){
      this.plus(name);
    },
    'less': function(name){
      this.less(name);
    },
    'clear': function() {
      this.clear();
    },
    'orderSubmited': function(){
      this.submitOrder();
    },
    'colorSubmited': function(){
      this.submitColor();
    }
  },
  computed: {
    lastOrders : function(){
      var arr = this.orders.filter(function(order){
        return order.amount > 0;
      })
      var returnStr = '';
      for(var orderIndex in arr) {
        returnStr += arr[orderIndex].name_zh + ":" + arr[orderIndex].amount  + ";"
      }
      return returnStr;
    }
  },
  methods: {
    submitOrder : function(){
      this.$broadcast('color-init');
    },
    submitColor : function(){
      var responseText = '', _this = this, lastOrders = this.lastOrders;
      var data = {
        selectedColor: selectedColor,
        orders : lastOrders
      };
      ajax().post('contact.php', data).then(function(response) {
        if(response.err.length > 0){
          responseText = response.err;
          _this.$broadcast('post-err');
        }else{
          responseText = response.message;
          _this.$broadcast('post-ok');
        }
        _this.$broadcast('color-selected');
        _this.$broadcast('message-init', responseText);
      });
    },
    getDrinkItemByName : function(name){
      for(var drinkTypeIndex in drinks) {
        for(var drinkIndex in drinks[drinkTypeIndex].items){
          var item = drinks[drinkTypeIndex].items[drinkIndex];
          if(item.name == name){
            return item;
          }
        }
      }
    },
    getOrderItemByName : function(name){
      for(var i in orders) {
        if ( orders[i].name == name ) {
          return orders[i];
        }
      }
    },
    clear : function(){
      for(var i in orders) {
        orders[i].amount = 0;
      };
      for(var drinkTypeIndex in drinks) {
        for(var drinkIndex in drinks[drinkTypeIndex].items){
          var item = drinks[drinkTypeIndex].items[drinkIndex];
          item.amount = 0;
        }
      };
    },
    plus: function (name) {
      var orderItem = this.getOrderItemByName(name),
      drinkItem = this.getDrinkItemByName(name);
      orderItem.amount = parseInt(orderItem.amount),
      drinkItem.amount = parseInt(drinkItem.amount);
      orderItem.amount += 1;
      drinkItem.amount += 1;
    },
    less: function (name) {
      var orderItem = this.getOrderItemByName(name),
      drinkItem = this.getDrinkItemByName(name);

      orderItem.amount -= 1;
      if(orderItem.amount < 0 ) {orderItem.amount = 0}
      drinkItem.amount -= 1;
      if(drinkItem.amount < 0 ) {drinkItem.amount = 0}
    }
  }
});

var $app = new Vue({
  el: '#app'
})

