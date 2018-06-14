const Vue = require('nativescript-vue');
const VueRouter = require('vue-router');
const VueResource = require('./node_modules/vue-resource');
const Home = require('./components/Home');
const Login = require('./components/Login');
const Register = require('./components/Register');
const Profile = require('./components/Profile');
const ChangeProfile = require('./components/Changeprofile');
const Question = require('./components/Question');
require("nativescript-vue").registerElement("RadDataForm", () => require("nativescript-ui-dataform").RadDataForm);

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.version = '__VERSION__';
Vue.http.options.emulateJSON = true;
Vue.config.silent = false;
/*global var*/
Vue.prototype.$userdata = [];
Vue.prototype.$cur_user_data = {
    account: {
        value: "None",
        set: function (data) {
            console.log("set data: " + data);
            this.value = data;
        }
    },
    password: {
        value: "None",
        set: function (data) {
            console.log("set data: " + data);
            this.value = data;
        }
    },
    dsp: {
        value: "None",
        set: function (data) {
            console.log("set data: " + data);
            this.value = data;
        }
    },
    online: {
        value: false,
        set: function (data) {
            console.log("set data: " + data);
            this.value = data;
        }
    },
    id: {
        value: -1,
        set: function (data) {
            console.log("set data: " + data);
            this.value = data;
        }
    },
    image: {
        src: "",
        set: function (data) {
            this.src = data;
        }
    }
};

const router = new VueRouter({
    pageRouting: true,
    routes: [
        { path: '/home', component: Home },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/profile', component: Profile },
        { path: '/change', component: ChangeProfile },
        { path: '/question', component: Question },
        { path: '*', redirect: '/home' }
    ]
});


/*
Vue.http.post('http://140.114.79.86:8000/accounts/api/users/register', tmp_data).then(function (successCallback) {
    console.log("success!!");
    console.log(successCallback);
}, function (errorCallback) {
    console.log("error!!");
    console.log(errorCallback);
});
*/
router.replace('/home');

var vm = new Vue({
    router
}).$start();



