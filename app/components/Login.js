module.exports = {
  methods: {
    data() {
      return {
        AccountText: "",
        PasswordText: "",
      }
    },
    signin: function () {
      console.log("Signin!");
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

          this.$router.push('/change');
          
        }
      }
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
            <TextField v-model="PasswordText" hint="Password..." />
            <Button text="Submit" @tap="signin()" />
            <Button text="Back" @tap="$router.go(-1)" />
        </StackLayout>
      </Page>
    `
};