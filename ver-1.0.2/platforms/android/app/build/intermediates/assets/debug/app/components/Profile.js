const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/user/profile/",
            username: "",
            expertises: [],
            email: "",
            uid: ""
        }
    },
    methods: {
        load: function () {
            console.log("Load profile!!");

            Object.assign(this.$data, this.$options.data.call(this));
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
                this.email = result.email;
                this.uid = result.uid.toString();
                for (var i = 0; i < result.expertise.length; i++) {
                    this.expertises.push(result.expertise[i]);
                }
                //this.expertises = result.expertises;
                
            }, (e) => {
                console.log(e);
            });
        },
        go_per_qlist: function () {
            console.log(this.uid);
            this.$cur_uid.val = this.uid;
            this.$router.push('/per_qlist');
        }
    },
    template: `
      <Page @loaded="load()">
        <ActionBar :title="$route.path">
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.replace('/home');" />
        </ActionBar>
        <StackLayout>
            <Label text="User Profile" fontWeight="Bold" />      
            <TextView editable="false">
                <FormattedString>   
                    <Span fontWeight="Bold" >Name : {{ this.username }}\n</Span>
                    <Span fontWeight="Bold" >Email : {{ this.email }}\n</Span>
                    <Span fontWeight="Bold" >Expertises : </Span>
                    <Span v-if="this.expertises[0]" fontWeight="Bold" >{{ expertises[0] }}</Span>
                    <Span v-else fontWeight="Bold" >Empty</Span>
                    <Span v-if="this.expertises[1]" fontWeight="Bold" >, {{ expertises[1] }}</Span>
                    <Span v-if="this.expertises[2]" fontWeight="Bold" >, {{ expertises[2] }}</Span>
                </FormattedString>
            </TextView>
            <Button text="Change profile" @tap="$router.push('/change')" />
            <Button text="Friend list" @tap="$router.push('/friendlist')" />
            <Button text="Follow list" @tap="$router.push('/followlist')" />
            <Button text="Friend confirm" @tap="$router.push('/friendconfirm')" />
            <Button text="Personal question" @tap="go_per_qlist()" />
        </StackLayout>
      </Page>
    `
};