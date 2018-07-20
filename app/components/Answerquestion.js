const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "",
            content: "",

        }
    },
    methods: {
        load: function() {

        },
        SendAnswer: function() {
            httpModule.request({
                url: this.EditapiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({

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
            <Label text="Content" />
            <TextField v-model="content" />
            <Button text="Send" @tap="SendAnswer()" />
        </StackLayout>
    </Page>
  `
};