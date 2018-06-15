module.exports = {
    data() {
        return {
            cur_user: this.$cur_user_data,
            userprofile: {
                new_account: this.$cur_user_data.account.value,
                new_password: this.$cur_user_data.password.value,
                new_dsp: this.$cur_user_data.dsp.value,
            },
            majority: ["Health", "Art", "Science", "Tech", "Business"],
            selectMajority: number = 0,
        }
    },
    methods: {

        submit: function () {
            console.log("Change profile");
            /*
            this.$cur_user_data.account.value = this.new_account;
            this.$cur_user_data.password.value = this.new_password;
            this.$cur_user_data.dsp.value = this.new_dsp;

            var id = this.$cur_user_data.id.value;
            this.$userdata[id].account = this.new_account;
            this.$userdata[id].password = this.new_password;
            this.$userdata[id].dsp = this.majority[this.selectMajority];
            */
        }
    },
    template: `
      <Page>
        <ActionBar :title="$route.path">
          <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
        </ActionBar>
        <StackLayout>
            <RadDataForm :source="userprofile" />
            <Button text="Submit" @tap="submit()" />
        </StackLayout>
      </Page>
    `
};