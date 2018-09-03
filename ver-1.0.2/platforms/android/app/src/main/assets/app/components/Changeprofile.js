const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/user/expertise/update/",
            Expertise1: "",
            Expertise2: "",
            Expertise3: "",
        }
    },
    methods: {
        submit: function() {
            console.log("Change profile");
            TmpExpertise = [];

            if(this.Expertise1 != ""){
                TmpExpertise.push(this.Expertise1);
            }
            if(this.Expertise2 != ""){
                TmpExpertise.push(this.Expertise2);
            }
            if(this.Expertise3 != ""){
                TmpExpertise.push(this.Expertise3);
            }
            console.log(TmpExpertise);
            httpModule.request({
                url: this.apiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val,
                    expertises: TmpExpertise
                })
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result);
                
                if (result.msg == "Success") {
                    console.log(result);
                    this.$router.replace('profile');
                } else {
                    console.log(result);
                }
            }, (e) => {
                console.log("response: " + e);
            });
        }
    },
    template: `
      <Page>
        <ActionBar :title="$route.path">
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.replace('/home');" />
        </ActionBar>
        <StackLayout>
            <Label>
                <Span text="New Expertise : " fontWeight="Bold" />
            </Label>
            <TextField v-model="Expertise1" hint="Enter Expertise1..." />
            <TextField v-model="Expertise2" hint="Enter Expertise2..." />
            <TextField v-model="Expertise3" hint="Enter Expertise3..." />
            <Button text="Submit" @tap="submit()" />
        </StackLayout>
      </Page>
    `
};