module.exports = {
    data() {
        return {
            cur_user: this.$cur_user_data,
            new_account: cur_user.account.value,
            new_password: cur_user.password.value,
            new_dsp: cur_user.dsp.value,
        }
    },
    methods: {

        submit: function () {
            console.log("Change profile");
            //console.log(cur_user);
            this.$cur_user_data.account.value = new_account;
            this.$cur_user_data.password.value = new_password;
            this.$cur_user_data.dsp.value = new_dsp;
        }
    },
    template: `
      <Page>
        <ActionBar :title="$route.path">
          <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
        </ActionBar>
        <StackLayout>
            <Label :text="Profile" />
            <Label text="Account :" class="h2" />
            <TextField v-model="new_account" />
            <Label text="Password :" class="h2" />
            <TextField v-model="new_password" />
            <Label text="Description :" class="h2" />
            <TextField v-model="new_dsp" />
            <Button text="Submit" @tap="submit()" />
        </StackLayout>
      </Page>
    `
};

/*
var new_data = {
    account: this.new_account,
    password: this.new_password,
    dsp: this.new_dsp,
    online: cur_user.online,
    id: cur_user.id,
};

return {
    set $cur_user_data(data) {
        this.$cur_user_data = data;
    },
    set $userdata(id, data) {
        $userdata[id] = data;
    }
}
this.$cur_user_data(new_data)
this.$router.push('./profile');
*/