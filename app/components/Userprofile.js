const httpModule = require("http");
module.exports = {
    data() {
        return {
            cur_username: "",
            cur_expertises: [],
            cur_email: ""
        }
    },
    methods: {
        load: function() {
            console.log("Load " + this.$cur_ulist_index.val + " profile");
            this.cur_username = this.$user_list[this.$cur_ulist_index.val].username;
            this.cur_expertises = this.$user_list[this.$cur_ulist_index.val].expertises;
            this.cur_email = this.$user_list[this.$cur_ulist_index.val].email;
        },
        go_per_qlist: function(){
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
                    <Span fontWeight="Bold" >{{ cur_username }}</Span>
                    <Span text="\n" />
                    <Span text="Expertise : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ cur_expertises }}</Span>
                    <Span text="\n" />
                    <Span text="Email : " fontWeight="Bold" />
                    <Span fontWeight="Bold" >{{ cur_email }}</Span>
                    <Span text="\n" />
                </FormattedString>
            </TextView>
            <Button text="Personal Question" @tap="go_per_qlist()" />
        </StackLayout>
      </Page>
    `
};