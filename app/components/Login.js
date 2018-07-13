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
<<<<<<< HEAD
                const result = response.content.toJSON();
                if (response.statusCode == 200 || response.statusCode == 202) {
                    console.log("Login Success!!");
                    console.log(result);
                    this.$user_id.val = result.key.toString();
                    this.$router.go(-1);
                } else {
                    alert(result.errorMsg);
                    console.log(result);
=======

                if (response.statusCode == 200) {

                    const result = response.content.toJSON();
                    //console.log(result);
                    if (result.msg == "Success") {
                        this.$user_id.val = result.key;
                        this.$user_name.val = this.AccountText;
                        this.$router.go(-1);
                    } else {
                        alert(result.errorMsg);
                    }
                } else {
                    alert('Connect Fail!');
>>>>>>> 030d5f9c4d386be2a337a9b69390d96b8e567dd5
                }


            }, (e) => {
                alert(result.errorMsg);
                console.log(e);
            });
            /*
            var i = 0;
            for (i = 0; i < this.$userdata.length; i++) {
                if (this.$userdata[i].account == this.AccountText && this.$userdata[i].password == this.PasswordText) {
                    console.log("Login Successfully!");

                    this.$userdata[i].online = true;
                    this.$userdata[i].id = i;

                    this.$cur_user_data.account.value = this.$userdata[i].account;
                    this.$cur_user_data.password.value = this.$userdata[i].password;
                    this.$cur_user_data.dsp.value = this.$userdata[i].dsp;
                    this.$cur_user_data.online.value = true;
                    this.$cur_user_data.id.value = i;

                    
                }
            }
            */
        },
    },
    template: `
      <Page>
        <ActionBar :title="$route.path">
          <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
        </ActionBar>
        <StackLayout>
            <Label :text="Login" />
            <TextField v-model="AccountText" hint="Account..." />
<<<<<<< HEAD
            <TextField v-model="PasswordText" hint="Password..." secure=true />
=======
            <TextField v-model="PasswordText" hint="Password..." secure=true/>
>>>>>>> 030d5f9c4d386be2a337a9b69390d96b8e567dd5
            <Button text="Submit" @tap="signin()" />
            <Button text="Back" @tap="$router.go(-1)" />
        </StackLayout>
      </Page>
    `
};