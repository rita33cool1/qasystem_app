const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/user/profile/",
            username: "",
            expertises: [],
            email: ""
        }
    },
    methods: {
        load: function () {
            console.log("Load profile!!");
            httpModule.request({
                url: this.apiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val
                })
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result);

                this.username = result.username;
                this.expertises = result.expertises;
                this.email = result.email;
            }, (e) => {
                console.log(e);
            });
        },
        go_per_qlist: function () {
            //this.$cur_uid.val = args.item.uid;
            this.$router.push('./per_qlist');
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
                    <Span fontWeight="Bold" >{{ username }}</Span>
                    <Span text="\n" />
                    <Span text="Expertise : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ cur_expertises }}</Span>
                    <Span text="\n" />
                    <Span text="Email : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ email }}</Span>
                    <Span text="\n" />
                </FormattedString>
            </TextView>
            <Button text="Change" @tap="$router.push('/change')" />
            <Button text="Personal Question" @tap="go_per_qlist()" />
            <Button text="Friend list" @tap="$router.push('/friendlist')" />
            <Button text="Follow list" @tap="$router.push('/followlist')" />
            <Button text="Friend confirm" @tap="$router.push('/friendconfirm')" />
        </StackLayout>
      </Page>
    `
};