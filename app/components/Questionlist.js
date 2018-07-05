const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/question/0/",
        }
    },
    methods: {
        load: function() {
            console.log("Load question");
            httpModule.request({
                url: this.apiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result);
                this.$question_num = result.questions.length;
                console.log(this.$question_num);
                for (var i = 0; i < this.$question_num; i++) {
                    console.log(result.questions[i]);
                }
            }, (e) => {
                console.log(e);
            });
        },
        redirect: function() {

        }
    },
    template: `
    <Page @loaded="load()">
        <ActionBar :title="$route.path">
            <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.go(-1);" />
        </ActionBar>
        <StackLayout>
            <Span text="Question id : " fontWeight="Bold" />
            <Button text="Question 1"  v-if="this.$question_num > '0'" @tap="redirect()" />
            <Button text="Question 2"  v-if="this.$question_num > '1'" @tap="redirect()" />
            <Button text="Question 3"  v-if="this.$question_num > '2'" @tap="redirect()" />
            <Button text="Question 4"  v-if="this.$question_num > '3'" @tap="redirect()" />
            <Span text="\n" />    
        </StackLayout>
    </Page>
  `
};