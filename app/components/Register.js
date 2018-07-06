const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/user/register/",
            EmailText: "",
            AccountText: "",
            PasswordText: "",
            item: {},
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
                    if(result.msg=="Success"){
                    console.log("Register Successfully!");
                    console.log(result);
                    alert('Regist Success!')
                    .then(() => {
                        console.log('regist success');
                        this.$router.push('/login');
                    });
                }
                    else alert(result.errorMsg);
                } else {
                    const result = response.content.toJSON();
                    console.log(result);
                }
            }, (e) => {
                console.log(e);
            });
        },
    },
    template: `
      <Page>
        <ActionBar :title="$route.path">
          <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
        </ActionBar>
        <StackLayout>
            <Label :text="Register" />
            <TextField v-model="AccountText" hint="Enter Account..." />
            <TextField v-model="PasswordText" hint="Enter Password..." secure=true />
            <TextField v-model="EmailText" hint="Enter Email..." />
            <Button text="Submit" @tap="register()" />
            <Button text="Back" @tap="$router.go(-1)" />
        </StackLayout>
      </Page>
    `
};