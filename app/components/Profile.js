const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/user/profile/",
            cur_username: "",
            cur_expertise: "",
            cur_email: ""
        }
    },
    methods: {
        load: function() {
            console.log("Load profile!!");
            httpModule.request({
                url: this.apiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val
                })
            }).then((response) => {
                if (response.statusCode == 200 || response.statusCode == 202) {
                    console.log("Get profile Success!!");
                    const result = response.content.toJSON();
                    this.cur_username = result.username;
                    this.cur_expertise = result.expertise;
                    this.cur_email = result.email;
                } else {
                    const result = response.content.toJSON();
                    console.log(result);
                }

                //console.log(response.content.toJson.prototype);
            }, (e) => {
                console.log(e);
            });
        }
    },
    template: `
      <Page @loaded="load()">
        <ActionBar :title="$route.path">
          <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
        </ActionBar>
        <StackLayout>
            <Label :text="Profile">
                <Span text="User Profile" fontWeight="Bold" />
            </Label>       
            <TextView editable="false">
                <FormattedString>   
                    
                    <Span text="UserName : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ cur_username }}</Span>
                    <Span text="\n" />
                    <Span text="Expertise : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ cur_expertise }}</Span>
                    <Span text="\n" />
                    <Span text="Email : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ cur_email }}</Span>
                    <Span text="\n" />
                </FormattedString>
            </TextView>
            <Button text="Change" @tap="$router.push('/change')" />
            <Button text="Personal Question" @tap="$router.push('./per_qlist')" />
        </StackLayout>
      </Page>
    `
};