const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/accounts/api/users/set_profile/",
            new_expertise: [],
            Experise1: "",
            Experise2: "",
            Experise3: "",
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
                    expertises: [this.Experise1, this.Experise2, this.Experise3]
                })
            }).then((response) => {
                const result = response.content.toJSON();
                if (response.statusCode == 200 || response.statusCode == 202) {
                    console.log("Set profile Success!!");
                    console.log(result);
                    this.$router.go(-1);
                } else {
                    console.log(result);
                }

                //console.log(response.content.toJson.prototype);
            }, (e) => {
                console.log("response: " + e);
            });
        }
    },
    template: `
      <Page>
        <ActionBar :title="$route.path">
          <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
        </ActionBar>
        <StackLayout>
            <Label>
                <Span text="New Expertise : " fontWeight="Bold" />
            </Label>
            <TextField v-model="Experise1" hint="Enter Expertise1..." />
            <TextField v-model="Experise2" hint="Enter Expertise2..." />
            <TextField v-model="Experise3" hint="Enter Expertise3..." />
            <Button text="Submit" @tap="submit()" />
        </StackLayout>
      </Page>
    `
};