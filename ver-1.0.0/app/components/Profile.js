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
                console.log(result.username);

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
            <Label text="User Profile" fontWeight="Bold" />      
            <TextView editable="false">
                <FormattedString>   
                    <Span fontWeight="Bold" >Name : {{ username }}\n</Span>
                    <Span fontWeight="Bold" >Email : {{ email }}\n</Span>
                    <Span>Expertises :</Span>
                    <Span v-if="this.expertises[0]" fontWeight="Bold" >{{ expertises[0] }}</Span>
                    <Span v-else fontWeight="Bold" >Empty</Span>
                    <Span v-if="this.expertises[1]" fontWeight="Bold" >, {{ expertises[1] }}</Span>
                    <Span v-if="this.expertises[2]" fontWeight="Bold" >, {{ expertises[2] }}</Span>
                </FormattedString>
            </TextView>
            <Button text="Change profile" @tap="$router.push('/change')" />
            <Button text="Personal question" @tap="go_per_qlist()" />
            <Button text="Friend list" @tap="$router.push('/friendlist')" />
            <Button text="Follow list" @tap="$router.push('/followlist')" />
            <Button text="Friend confirm" @tap="$router.push('/friendconfirm')" />
        </StackLayout>
      </Page>
    `
};