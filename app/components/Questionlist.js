const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/accounts/api/get_question/",
        }
    },
    methods: {
        load: function() {
            console.log("Load question");
            httpModule.request({
                url: this.apiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val
                })
            }).then((response) => {

            }, (e) => {

            });
        }
    },
    template: `
    <Page>
        <ActionBar :title="$route.path">
            <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.go(-1);" />
        </ActionBar>
        <StackLayout>
            <Span text="Question id : " fontWeight="Bold" />
            
            <Span text="\n" />    
        </StackLayout>
    </Page>
  `
};