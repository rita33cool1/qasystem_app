module.exports = {
    data() {
        return {
            cur_user: this.$cur_user_data,
            /*
            cur_account: this.$cur_user_data_account,
            cur_password: this.$cur_user_data_password,
            new_dsp: this.$cur_user_data_dsp,
            */
        }
    },
    methods: {
        change: function () {
            console.log("Go to change profile page");
            this.$router.push('./change');
        }
    },
    template: `
      <Page>
        <ActionBar :title="$route.path">
          <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
        </ActionBar>
        <StackLayout>
            <Label :text="Profile" />
            <TextView editable="true">
                <FormattedString>
                    <Span text="User Profile : \n\n" />
                    <Span text="UserAccount : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ cur_user.account.value }}</Span>
                    <Span text="\n" />
                    <Span text="UserPassword : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ cur_user.password.value }}</Span>
                    <Span text="\n" />
                    <Span text="Description : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ cur_user.dsp.value }}</Span>
                    <Span text="\n" />
                </FormattedString>
            </TextView>
            <Button text="Change" @tap="change()" />
            <Button text="Home" @tap="$router.push('./home')" />
        </StackLayout>
      </Page>
    `
};