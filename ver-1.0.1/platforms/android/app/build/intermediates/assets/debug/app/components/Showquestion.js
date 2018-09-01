const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/question/?qid=" + this.$cur_qid.val,
            deleteUrl: "http://140.114.79.86:8000/api/user/question/delete/",
            deleteAnswerUrl: "http://140.114.79.86:8000/api/question/answer/delete/",
            deleteCommentUrl: "http://140.114.79.86:8000/api/question/comment/delete/",
            voteUrl: "http://140.114.79.86:8000/api/question/vote/",
            title: "Tmp title",
            content: "None",
            askername: "None",
            expertises: [],
            answers: [],
            comments: [],
        }
    },
    methods: {
        load: function () {
            console.log("Show the question");
            Object.assign(this.$data, this.$options.data.call(this));
            httpModule.request({
                url: this.apiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                
                this.title = result.question[0].title;
                this.content = result.question[0].content;
                this.askername = result.question[0].user;
                console.log(result.question[0]);
                //expertises
                for (var i = 0; i < result.question[0].expertises.length; i++) {
                    this.expertises.push(result.question[0].expertises[i]);
                }

                //comments
                for (var i = 0; i < result.question[0].comments.length; i++) {
                    var own_user = false;
                    if (this.$user_name.val == result.question[0].comments[i].user && this.$user_id.val != '0') {
                        own_user = true;
                    }

                    var tmp = {
                        answer_id: result.question[0].comments[i].id,
                        content: result.question[0].comments[i].content,
                        user: result.question[0].comments[i].user,
                        own: own_user
                    };
                    this.comments.push(tmp);
                }
                
                //answers
                for (var i = 0; i < result.answers.length; i++) {
                    var own_user = false;
                    if (this.$user_name.val == result.answers[i].user &&　this.$user_id.val != '0') {
                        own_user = true;
                    }

                    var tmp = {
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
        deleteQuestion: function () {
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
        modifyQuestion: function () {
            console.log("modify the question");
            this.$router.push('/modifyquestion');
        },
        responseQuestion: function () {
            console.log("response the question");
            this.$router.push('/answer');
        },
        sendcomment: function (type,id) {
            this.$comment_type.val = type;
            this.$cur_answer_id.val = id;
            console.log("send the comment");
            this.$router.push('/sendcomment');
        },
        modifyAnswer: function () {
            console.log("modify the answer");
            //this.$router.push('/modifyquestion');
        },
        deleteAnswer: function (id) {
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
        Votequestion: function(id, vote_value){
            console.log("Vote question");
            httpModule.request({
                url: this.voteUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val,
                    QorA: 'question',
                    question_id: id,
                    vote: vote_value
                })
            }).then((response) => {
                const result = response.content.toJSON();
                if (result.msg == "Success") {
                    alert(result.msg);
                }
            }, (e) => {
                console.log(e);
            });
        },
        Starquestion: function(){
            console.log("Star question");
            
        },
        Voteanswer: function(id, vote_value){
            console.log("Vote answer");
            httpModule.request({
                url: this.voteUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val,
                    QorA: 'answer',
                    answer_id: id,
                    vote: vote_value
                })
            }).then((response) => {
                const result = response.content.toJSON();
                if (result.msg == "Success") {
                    alert(result.msg);
                }
            }, (e) => {
                console.log(e);
            });
        }
    },
    template: `
    <Page @loaded="load()" >
        <ActionBar :title="$route.path">
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.push('/home');" />
        </ActionBar>
        <StackLayout>
            <TextView editable="false">
                <FormattedString>
                    <Span fontWeight="Bold" >Asker : {{ askername }}\n</Span>
                    <Span fontWeight="Bold" >Title : {{ title }}\n</Span>
                    <Span fontWeight="Bold" >Content : {{ content }}\n</Span>
                    
                    <Span v-if="this.expertises[0]" fontWeight="Bold" >Expertises : {{ expertises[0] }}</Span>
                    <Span v-else fontWeight="Bold" >Empty</Span>
                    <Span v-if="this.expertises[1]" fontWeight="Bold" >, {{ expertises[1] }}</Span>
                    <Span v-if="this.expertises[2]" fontWeight="Bold" >, {{ expertises[2] }}</Span>
                </FormattedString>
            </TextView>
            
            <FlexboxLayout flexDirection="row" class="list-group-item">
                <Button text="Delete" v-if="this.$user_name.val == this.askername" @tap="deleteQuestion()" />
                <Button text="Modify" v-if="this.$user_name.val == this.askername" @tap="modifyQuestion()" />
                <Button text="Response" v-if="this.$user_name.val != this.askername && this.$user_id.val != '0' " @tap="responseQuestion()" />
                <Button text="Comment" v-if="this.$user_name.val != this.askername && this.$user_id.val != '0' " @tap="sendcomment('question' , 0)" />
                <Button text="Up" v-if="$user_name.val != this.askername && $user_id.val != '0' " @tap="Votequestion($cur_qid.val, 1)" />
                <Button text="Down" v-if="$user_name.val != this.askername && $user_id.val != '0' " @tap="Votequestion($cur_qid.val, -1)" />
                <Button text="Star" v-if="$user_name.val != this.askername && $user_id.val != '0' " @tap="Starquestion()" />
            </FlexboxLayout>

            <Label text="Comment:" fontWeight="Bold" />
            <ListView class="list-group" for="comment in comments" style="height:80px" >
                <v-template>
                     <FlexboxLayout flexDirection="column" class="list-group-item">
                        <TextView editable="false">
                            <FormattedString> 
                                <Span>{{ comment.user }} : \n {{ comment.content}}</Span>
                            </FormattedString>
                        </TextView>
                        <FlexboxLayout flexDirection="row" class="list-group-item">
                            <Button text="Edit" v-if="comment.own == true" @tap="" />
                            <Button text="Delete" v-if="comment.own == true" @tap="" />
                        </FlexboxLayout>
                    </FlexboxLayout>
                </v-template>
            </ListView>

            <Label text="Answer:" fontWeight="Bold" />
            <ListView class="list-group" for="answer in answers" style="height:80px" >
                <v-template>
                    <FlexboxLayout flexDirection="column" class="list-group-item">
                        <TextView editable="false">
                            <FormattedString> 
                                <Span>{{ answer.user }} : \n {{ answer.content}}</Span>
                            </FormattedString>
                        </TextView>
                        <FlexboxLayout flexDirection="row" class="list-group-item">
                            <Button text="Edit" v-if="answer.own == true" @tap="modifyAnswer()" />
                            <Button text="Delete" v-if="answer.own == true" @tap="deleteAnswer(answer.answer_id)" />
                            <Button text="Comment" v-if="answer.own == true" @tap="sendcomment('answer', answer.answer_id)" />
                            <Button text="Up" v-if="$user_name.val != answer.user && $user_id.val != '0' " @tap="Voteanswer(answer.answer_id, 1)" />
                            <Button text="Down" v-if="$user_name.val != answer.user && $user_id.val != '0' " @tap="Voteanswer(answer.answer_id, -1)" />
                        </FlexboxLayout>
                    </FlexboxLayout>
                </v-template>
            </ListView>

            
        </StackLayout>
    </Page>
  `
};