const httpModule = require("http");
module.exports = {
    data() {
        return {
            
        }
    },
    methods: {
        load: function () {
            
        },
        check: function () {
            console.log("Check for data");
            console.log(this.$user_id.val);
        },
    },
    template: `
    <Page @loaded="load()">
      <ActionBar :title="$route.path" />
      <StackLayout>
        <TextView editable="false">
            <FormattedString>
                <Span v-if="this.$user_id.val != '0'" fontWeight="Bold" >User : {{ $user_name.val }}</Span>
                <Span v-else fontWeight="Bold"text="Please login" /> 
            </FormattedString>
        </TextView>
        <Button text="Register"         v-if="this.$user_id.val == '0'" @tap="$router.push('/register')" />
        <Button text="Profile"          v-else @tap="$router.push('/profile')" />
        <Button text="Login"            v-if="this.$user_id.val == '0'" @tap="$router.push('/login')" />
        <Button text="Ask Question"     v-else @tap="$router.push('/sendquestion')" />
        <Button text="Check"            @tap="check()" />
        <Button text="Question List"    @tap="$router.push('/questionlist')" />
        <Button text="User List"        @tap="$router.push('/userlist')" />
        
      </StackLayout>
    </Page>
  `
};