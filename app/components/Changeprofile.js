module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/accounts/api/users/set_profile/",
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

        submit: function() {
            console.log("Change profile");
            httpModule.request({
                url: this.apiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val,
                    expertise: this.majority[this.selectMajority]
                })
            }).then((response) => {
                if (response.statusCode == 200 || response.statusCode == 202) {
                    console.log("Set profile Success!!");
                    const result = response.content.toJSON();
                    console.log(result);
                } else {
                    const result = response.content.toJSON();
                    console.log(result);
                }

                //console.log(response.content.toJson.prototype);
            }, (e) => {
                console.log("response: " + e);
            });
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