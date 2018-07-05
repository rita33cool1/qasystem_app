const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/question/" + this.$question_cur_link.val + "/",
            title: "Tmp title",
            content: "None",
            askername: "None"
        }
    },
    methods: {
        load: function() {
            console.log("Show the question");
            console.log(this.$question_cur_link.val);
            httpModule.request({
                url: this.apiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result);

                this.title = result.title;
                this.content = result.content;
                this.askername = result.username;
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
                </FormattedString>
            </TextView>
        </StackLayout>
    </Page>
  `
};