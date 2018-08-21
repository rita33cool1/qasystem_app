const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/question/comment/post/",
            content: "",
        }
    },
    methods: {
        load: function() {

        },
        SendComment: function() {
            if(this.$comment_type.val == 'answer'){
                httpModule.request({
                    url: this.apiUrl,
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    content: JSON.stringify({
                        key: this.$user_id.val, 
                        question_id: this.$cur_qid.val,
                        answer_id: this.$cur_answer_id.val,
                        content: this.content,
                        QorA:　this.$comment_type.val
                    })
                }).then((response) => {
                    const result = response.content.toJSON();
                    console.log(result);
                    if (result.msg == "Success") {
                        alert(result.msg);
                        this.$router.go(-1);
                    }
                }, (e) => {
                    console.log(e);
                });
            }else{
                httpModule.request({
                    url: this.apiUrl,
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    content: JSON.stringify({
                        key: this.$user_id.val, 
                        question_id: this.$cur_qid.val, 
                        content: this.content,
                        QorA:　'question'
                    })
                }).then((response) => {
                    const result = response.content.toJSON();
                    console.log(result);
                    if (result.msg == "Success") {
                        alert(result.msg);
                        this.$router.go(-1);
                    }
                }, (e) => {
                    console.log(e);
                });
            }
        }
    },
    template: `
    <Page @loaded="load()">
        <ActionBar :title="$route.path">
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.push('/home');" />
        </ActionBar>
        <StackLayout>
            <Label text="Comment Vote" />
        </StackLayout>
    </Page>
  `
};