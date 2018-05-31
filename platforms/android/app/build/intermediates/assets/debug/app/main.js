const Vue = require('nativescript-vue');
const VueRouter = require('vue-router');
const Home = require('./components/Home');
const Login = require('./components/Login');
const Register = require('./components/Register');

Vue.use(VueRouter);

const router = new VueRouter({
  pageRouting: true,
  routes: [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '*', redirect: '/home' }
  ]
});

router.replace('/home');

new Vue({
  router
}).$start();
