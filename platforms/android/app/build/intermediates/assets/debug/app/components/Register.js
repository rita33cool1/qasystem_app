module.exports = {
    data() {
        return {
            AccountText: "Username",
            PasswordText: "Userpwd",
        }
    },
    methods: {
        register: function () {
            console.log("Register Successfully!");
            //vm.user_account[this.user_account.length] = this.AccountText;
            //console.log(this.user_account[this.user_account.length]);
            
            var tmp_data = {
                account : this.AccountText,
                password : this.PasswordText,
                dsp : "hello! " + this.AccountText,
                online : false,
                id : -1,
            }
            this.$userdata.push(tmp_data);
            this.$router.go(-1);
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
            <TextField v-model="PasswordText" hint="Enter Password..." />
            <Button text="Submit" @tap="register()" />
            <Button text="Back" @tap="$router.go(-1)" />
        </StackLayout>
      </Page>
    `
};