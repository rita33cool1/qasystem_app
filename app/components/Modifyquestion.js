const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/questions/?qid=" + this.$question_cur_link.val,
            EditapiUrl: "http://140.114.79.86:8000/api/question/edit/",
            new_title: "New title",
            new_content: "None",
            new_expertise: ["", "", ""],
        }
    },
    methods: {
        load: function() {

            httpModule.request({
                url: this.apiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result);

                this.new_title = result[0].title;
                this.new_content = result[0].content;

                for (var i = 0; i < result[0].expertises.length; i++) {
                    this.new_expertise[i] = result[0].expertises[i];
                }
                console.log(this.new_expertise);

            }, (e) => {
                console.log(e);
            });
        },
        SendQuestion: function() {
            httpModule.request({
                url: this.EditapiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val,
                    question_id: this.$question_cur_link.val,
                    title: this.new_title,
                    content: this.new_content
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
    },
    template: `
    <Page @loaded="load()">
        <ActionBar :title="$route.path">
            <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.go(-1);" />
        </ActionBar>
        <StackLayout>
            <Label text="Title" />
            <TextField v-model="new_title" />
            <Label text="Content" />
            <textField v-model="new_content" />
            <Label text="Expertise" />
            <textField v-model="new_expertise[0]" />
            <textField v-model="new_expertise[1]" />
            <textField v-model="new_expertise[2]" />

            <Button text="Send" @tap="SendQuestion()" />
        </StackLayout>
    </Page>
  `
};