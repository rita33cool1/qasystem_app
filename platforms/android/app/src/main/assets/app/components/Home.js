module.exports = {
    methods: {
        check: function() {
            console.log("Check for data");
            console.log(this.$user_id.val);
        },
    },
    data() {
        return {

        };
    },
    template: `
    <Page>
      <ActionBar :title="$route.path" />
      <StackLayout>
        <Button text="Register" @tap="$router.push('/register')" />
        <Button text="Login" @tap="$router.push('/login')" />
        <Button text="Check" @tap="check()" />
        <Button text="Profile"        v-if="this.$user_id.val != '0'" @tap="$router.push('/profile')" />
        <Button text="Change"         v-if="this.$user_id.val != '0'" @tap="$router.push('/change')" />
        <Button text="Ask Question"   v-if="this.$user_id.val != '0'" @tap="$router.push('/question')" />
        <Button text="Question List"   @tap="$router.push('/questionlist')" />
      </StackLayout>
    </Page>
  `
};