const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/question/?qid=" + this.$cur_qid.val,
            deleteUrl: "http://140.114.79.86:8000/api/user/question/delete/",
            deleteAnswerUrl:  "http://140.114.79.86:8000/api/question/answer/delete/",
            deleteCommentUrl:  "http://140.114.79.86:8000/api/question/comment/delete/",
            title: "Tmp title",
            content: "None",
            askername: "None",
            expertises: [],
            answers: [],
            comments: [],
        }
    },
    methods: {
        load: function() {
            console.log("Show the question");
            httpModule.request({
                url: this.apiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result.question[0]); 
                
                this.title = result.question[0].title;
                this.content = result.question[0].content;
                this.askername = result.question[0].user;

                //expertises
                for (var i = 0; i < result.question[0].expertises.length; i++) {
                    this.expertises.push(result.question[0].expertises[i]);
                }

                //comments
                /*
                for (var i = 0; i < result.question[0].comments.length; i++) {
                    this.expertises.push(result.question[0].expertises[i]);
                }
                */
                //answers
                for (var i = 0; i < result.answers.length; i++) {

                    var own_user = false;
                    if(this.$user_name.val == result.answers[i].user){
                        own_user = true;
                    }

                    var tmp={
                        answer_id: result.answers[i].id,
                        content: result.answers[i].content,
                        user: result.answers[i].user,
                        own: own_user
                    };
                    this.answers.push(tmp);
                }
            }, (e) => {
                console.log(e);
            });
        },
        deleteQuestion: function() {
            console.log("delete the question");
            httpModule.request({
                url: this.deleteUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val,
                    question_id: this.$cur_qid.val
                })
            }).then((response) => {
                const result = response.content.toJSON();
                if (result.msg == "Success") {
                    alert(result.msg);
                    this.$router.go(-1);
                }
            }, (e) => {
                console.log(e);
            });
        },
        modifyQuestion: function() {
            console.log("modify the question");
            this.$router.push('/modifyquestion');
        },
        responseQuestion: function() {
            console.log("response the question");
            this.$router.push('/answer');
        },
        modifyAnswer: function() {
            console.log("modify the answer");
            //this.$router.push('/modifyquestion');
        },
        deleteAnswer: function(id) {
            httpModule.request({
                url: this.deleteAnswerUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val,
                    answer_id: id
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
        },

    },
    template: `
    <Page @loaded="load()" >
        <ActionBar :title="$route.path">
            <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.go(-1);" />
        </ActionBar>
        <StackLayout>
            <TextView editable="false">
                <FormattedString>   
                    <Span text="Title : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ title }}</Span>
                    <Span text="\n" />
                    <Span text="Content : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ content }}</Span>
                    <Span text="\n" />
                    <Span text="Asker : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ askername }}</Span>
                    <Span text="\n" />
                    <Span text="Expertises : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ expertises }}</Span>
                    <Span text="\n" />
                </FormattedString>
            </TextView>

            <ListView class="list-group" for="answer in answers" style="height:300px width:60px">
                <v-template>
                    <FlexboxLayout flexDirection="column" class="list-group-item">
                        <TextView editable="false">
                            <FormattedString> 
                            <Span :text="answer.user" />
                            <Span text=":\n" />
                            <Span :text="answer.content" />
                            </FormattedString>
                        </TextView>
                        <FlexboxLayout flexDirection="row" class="list-group-item">
                            <Button text="Edit" v-if="answer.own == true" @tap="modifyAnswer()" />
                            <Button text="Delete" v-if="answer.own == true" @tap="deleteAnswer(answer.answer_id)" />
                        </FlexboxLayout>
                    </FlexboxLayout>
                </v-template>
            </ListView>

            <Button text="delete" v-if="this.$user_name.val == this.askername" @tap="deleteQuestion()" />
            <Button text="modify" v-if="this.$user_name.val == this.askername" @tap="modifyQuestion()" />
            <Button text="Response" v-if="this.$user_name.val != this.askername && this.$user_id.val != '0' " @tap="responseQuestion()" />
            <Button text="Comment" v-if="this.$user_name.val != this.askername && this.$user_id.val != '0' " @tap="" />
        </StackLayout>
    </Page>
  `
};