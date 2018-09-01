const httpModule = require("http");
module.exports = {
    data() {
        return {
            logoutUrl: "http://140.114.79.86:8000/api/user/logout/",
            key: "0",
            name: "0",
        }
    },
    methods: {
        load: function () {
            //Object.assign(this.$data, this.$options.data.call(this));
            this.key = this.$user_id.val;
            this.name = this.$user_name.val;
        },
        check: function () {
            console.log("Check for data");
            console.log(this.key);

            //Object.assign(this.$data, this.$options.data.call(this));
        },
        logout: function () {

            httpModule.request({
                url: this.logoutUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val
                })
            }).then((response) => {
                const result = response.content.toJSON();
                if (result.msg == "Success") {
                    
                    alert(result.msg).then((response) => {
                        this.$user_id.val = "0";
                        this.$user_name.val = "0";
                        Object.assign(this.$data, this.$options.data.call(this));
                    });
                } else {
                    alert('Connect Fail!');
                }
            }, (e) => {
                alert(result.errorMsg);
                console.log(e);
            });
        }
    },
    template: `
    <Page @loaded="load()">
      <ActionBar :title="$route.path" />
      <StackLayout>
        <TextView editable="false">
            <FormattedString>
                <Span v-if="this.key == '0'" fontWeight="Bold" >Please login</Span>
                <Span v-else fontWeight="Bold" >User : {{ name }}</Span>
            </FormattedString>
        </TextView>
        <Button text="Register"         v-if="this.key == '0'" @tap="$router.push('/register')" />
        <Button text="Profile"          v-else @tap="$router.push('/profile')" />
        <Button text="Login"            v-if="this.key == '0'" @tap="$router.push('/login')" />
        <Button text="Ask Question"     v-else @tap="$router.push('/sendquestion')" />
        <Button text="Check"            @tap="check()" />
        <Button text="Question List"    @tap="$router.push('/questionlist')" />
        <Button text="User List"        @tap="$router.push('/userlist')" />
        
        <Button text="Logout"           v-if="this.key != '0'" @tap="logout()" />

      </StackLayout>
    </Page>
  `
};