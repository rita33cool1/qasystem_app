const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/question/answer/post/",
            content: "",
        }
    },
    methods: {
        load: function() {

        },
        SendAnswer: function() {
            httpModule.request({
                url: this.apiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val, 
                    question_id: this.$cur_qid.val, 
                    content: this.content 
                })
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result);
                if (result.msg == "Success") {
                    alert(result.msg);
                    this.$router.replace('/showquestion');
                }
            }, (e) => {
                console.log(e);
            });
        }
    },
    template: `
    <Page @loaded="load()">
        <ActionBar :title="$route.path">
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.replace('/home');" />
        </ActionBar>
        <StackLayout>
            <Label text="Content" />
            <TextField v-model="content" />
            <Button text="Send" @tap="SendAnswer()" />
        </StackLayout>
    </Page>
  `
};