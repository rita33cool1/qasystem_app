const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/user/login/",
            AccountText: "",
            PasswordText: "",
        }
    },
    methods: {

        signin: function() {

            httpModule.request({
                url: this.apiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    username: this.AccountText,
                    password: this.PasswordText
                })
            }).then((response) => {

                if (response.statusCode == 200) {
                    const result = response.content.toJSON();
                    if (result.msg == "Success") {
                        this.$user_id.val = result.key;
                        this.$user_name.val = this.AccountText;
                        this.$router.push('/home');
                    } else {
                        alert(result.errorMsg);
                    }
                } else {
                    alert('Connect Fail!');
                }


            }, (e) => {
                alert(result.errorMsg);
                console.log(e);
            });
        },
    },
    template: `
      <Page>
        <ActionBar :title="$route.path">
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.push('/home');" />
        </ActionBar>
        <StackLayout>
            <Label text="Login" />
            <TextField v-model="AccountText" hint="Account..." />
            <TextField v-model="PasswordText" hint="Password..." secure="true" />
            <Button text="Submit" @tap="signin()" />
        </StackLayout>
      </Page>
    `
};