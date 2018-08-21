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