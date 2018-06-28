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
        <Button text="Profile_false"  v-else @tap="$router.push('/profile')" />
        <Button text="Change"         v-if="this.$user_id.val != '0'" @tap="$router.push('/change')" />
        <Button text="Ask Question"   @tap="$router.push('/question')" />
      </StackLayout>
    </Page>
  `
};