module.exports = {
    data() {
        return {
            cur_user: this.$cur_user_data,
            cur_account: this.$cur_user_data.account.value,
            cur_password: this.$cur_user_data.password.value,
            cur_dsp: this.$cur_user_data.dsp.value
        }
    },
    methods: {
        change: function() {
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
            <Span text="User Profile" fontWeight="Bold" />       
            <TextView editable="false">
                <FormattedString>   
                    
                    <Span text="UserAccount : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ cur_account }}</Span>
                    <Span text="\n" />
                    <Span text="UserPassword : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ cur_password }}</Span>
                    <Span text="\n" />
                    <Span text="Majority : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ cur_dsp }}</Span>
                    <Span text="\n" />
                </FormattedString>
            </TextView>
            <Button text="Change" @tap="change()" />
            <Button text="Home" @tap="$router.push('./home')" />
        </StackLayout>
      </Page>
    `
};