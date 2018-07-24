const Vue = require('nativescript-vue');
const VueRouter = require('vue-router');
const Home = require('./components/Home');
const Login = require('./components/Login');
const Register = require('./components/Register');
const Profile = require('./components/Profile');
const ChangeProfile = require('./components/Changeprofile');
const SendQuestion = require('./components/Sendquestion');
const Questionlist = require('./components/Questionlist');
const ShowQuestion = require('./components/Showquestion');
const ModifyQuestion = require('./components/Modifyquestion');
const Userlist = require('./components/Userlist');
const Personalquestionlist = require('./components/Per_qlist');
const Answerquestion = require('./components/Answerquestion');
const FriendList = require('./components/Friendlist');
const UserProfile = require('./components/Userprofile');
require("nativescript-vue").registerElement("RadDataForm", () => require("nativescript-ui-dataform").RadDataForm);
const VueResource = require('vue-resource');
//import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.version = '__VERSION__';
Vue.http.options.emulateJSON = true;
Vue.config.silent = false;
/*global var*/
Vue.prototype.$question_list = [];
Vue.prototype.$user_list = [];

Vue.prototype.$user_id = {
    val: "0",
    set: function(data) {
        this.val = data;
    }
};
Vue.prototype.$user_name = {
    val: "0",
    set: function(data) {
        this.val = data;
    }
};
Vue.prototype.$question_num = {
    val: 0,
    set: function(data) {
        this.val = data;
    }
};
Vue.prototype.$user_num = {
    val: 0,
    set: function(data) {
        this.val = data;
    }
};
Vue.prototype.$cur_qid = {
    val: "",
    set: function(data) {
        this.val = data;
    }
};
Vue.prototype.$cur_uid = {
    val: "",
    set: function(data) {
        this.val = data;
    }
};
Vue.prototype.$cur_ulist_index = {
    val: "",
    set: function(data) {
        this.val = data;
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
        { path: '/sendquestion', component: SendQuestion },
        { path: '/questionlist', component: Questionlist },
        { path: '/showquestion', component: ShowQuestion },
        { path: '/modifyquestion', component: ModifyQuestion },
        { path: '/userlist', component: Userlist },
        { path: '/userprofile', component: UserProfile },
        { path: '/per_qlist', component: Personalquestionlist },
        { path: '/answer', component: Answerquestion },
        { path: '*', redirect: '/home' }
    ]
});

router.replace('/home');

var vm = new Vue({
    router
}).$start();