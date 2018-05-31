const Vue = require('nativescript-vue');
const VueRouter = require('vue-router');
const Home = require('./components/Home');
const Login = require('./components/Login');
const Register = require('./components/Register');
const Profile = require('./components/Profile');
const ChangeProfile = require('./components/Changeprofile');


Vue.use(VueRouter);
Vue.version = '__VERSION__';

/*global var*/
Vue.prototype.$userdata = [];
Vue.prototype.$cur_user_data = {
  account :{
    value : "None",
    set: function (data) {
      console.log("set data: " + data);
      this.value = data;
    }
  },
  password:{
    value : "None",
    set: function (data) {
      console.log("set data: " + data);
      this.value = data;
    }
  },
  dsp:{
    value : "None",
    set: function (data) {
      console.log("set data: " + data);
      this.value = data;
    }
  },
  online:{
    value : false,
    set: function (data) {
      console.log("set data: " + data);
      this.value = data;
    }
  },
  id:{
    value : -1,
    set: function (data) {
      console.log("set data: " + data);
      this.value = data;
    }
  }
};
Vue.prototype.$cur_user_data_account = {
  value: "None",
  set: function (data) {
    this.value = data;
  },
};
Vue.prototype.$cur_user_data_password = {
  value: "None",
  set: function (data) {
    this.value = data;
  },
};
Vue.prototype.$cur_user_data_dsp = {
  value: "None",
  set: function (data) {
    this.value = data;
  },
};
Vue.prototype.$cur_user_data_online = {
  value: false,
  set: function (data) {
    this.value = data;
  },
};
Vue.prototype.$cur_user_data_id = {
  value: -1,
  set: function (data) {
    this.value = data;
  },
};
Vue.prototype.$test = {
  value: false,
  set: function (prop) {
    this.value = prop;
  },
  get: function () {
    return this.value;
  }
};
/*
Object.defineProperty($cur_user_data, account, {
  __proto__: null,
  value: ""
});

console.log($cur_user_data.account);
*/
/*
Vue.mixin({
  created: function () {
    this.UserId = -1;
  }
});
*/

const router = new VueRouter({
  pageRouting: true,
  routes: [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: Profile },
    { path: '/change', component: ChangeProfile },
    { path: '*', redirect: '/home' }
  ]
});

router.replace('/home');

var vm = new Vue({
  router
}).$start();
