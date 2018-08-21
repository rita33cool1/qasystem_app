const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/user/register/",
            EmailText: "",
            AccountText: "",
            PasswordText: ""
        }
    },
    methods: {
        register: function() {
            console.log(this.EmailText)
            httpModule.request({
                url: this.apiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    email: this.EmailText,
                    username: this.AccountText,
                    password: this.PasswordText
                })
            }).then((response) => {

                if (response.statusCode == 200) {
                    const result = response.content.toJSON();
                    if (result.msg == "Success") {
                        alert('Regist Success!').then(() => {
                            console.log('Regist Success!');
                            this.$router.go('/login');
                        });
                    } else {
                        alert(result.errorMsg);
                    }
                } else {
                    alert('Connect Fail!');
                }
            }, (e) => {
                alert(e);
            });
        },
    },
    template: `
      <Page>
        <ActionBar :title="$route.path">
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.push('/home');" />
        </ActionBar>
        <StackLayout>
            <Label text="Register" />
            <TextField v-model="AccountText" hint="Enter Account..." />
            <TextField v-model="PasswordText" hint="Enter Password..." secure="true" />
            <TextField v-model="EmailText" hint="Enter Email..." />
            <Button text="Submit" @tap="register()" />
        </StackLayout>
      </Page>
    `
};