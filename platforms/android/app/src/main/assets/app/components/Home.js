const httpModule = require("http");
module.exports = {
    data() {
        return {
            qlistapiUrl: "http://140.114.79.86:8000/api/questions/",
            ulistapiUrl: "http://140.114.79.86:8000/api/users/list/"
        };
    },
    methods: {
        check: function() {
            console.log("Check for data");
            console.log(this.$user_id.val);
            console.log(this.$question_list);
            console.log(this.$user_list);
        },
        load: function() {
            console.log("Load question");
            httpModule.request({
                url: this.qlistapiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                this.$question_list = [];
                this.$question_num = result.length;

                for (var i = this.$question_list.length; i < this.$question_num; i++) {

                    var tmp_data = {
                        title: result[i].title,
                        qid: result[i].question_id,
                        uid: result[i].user_id
                    };
                    this.$question_list.push(tmp_data);
                }

            }, (e) => {
                console.log(e);
            });

            httpModule.request({
                url: this.ulistapiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                this.$user_list = [];
                this.$user_num = result.length;

                for (var i = this.$question_list.length; i < this.$question_num; i++) {

                    var tmp_data = {
                        username: result[i].username,
                        uid: result[i].id,
                    };
                    this.$user_list.push(tmp_data);
                }

            }, (e) => {
                console.log(e);
            });
        },
    },
    template: `
    <Page @loaded="load()">
      <ActionBar :title="$route.path" />
      <StackLayout>
        <Button text="Register" @tap="$router.push('/register')" />
        <Button text="Login" @tap="$router.push('/login')" />
        <Button text="Check" @tap="check()" />
        <Button text="Profile"        v-if="this.$user_id.val != '0'" @tap="$router.push('/profile')" />
        <Button text="Ask Question"   v-if="this.$user_id.val != '0'" @tap="$router.push('/question')" />
        <Button text="Question List"   @tap="$router.push('/questionlist')" />
        <Button text="User List"   @tap="$router.push('/userlist')" />
      </StackLayout>
    </Page>
  `
};