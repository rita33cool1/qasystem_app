const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/users/list/",
            addapiUrl: "",
            cur_username: "",
            cur_expertises: [],
            cur_email: ""
        }
    },
    methods: {
        load: function() {
            console.log("Load " + this.$cur_ulist_index.val + " profile");

            httpModule.request({
                url: this.apiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                this.$user_num = result.length;

                for (var i = 0; i < this.$user_num; i++) {
                    if(i == this.$cur_ulist_index.val){
                        this.cur_username = result[i].username;
                        this.cur_expertises = result[i].expertises;
                        this.cur_email = result[i].email;
                    }
                }
            }, (e) => {
                console.log(e);
            });
            /*
            this.cur_username = this.$user_list[this.$cur_ulist_index.val].username;
            this.cur_expertises = this.$user_list[this.$cur_ulist_index.val].expertises;
            this.cur_email = this.$user_list[this.$cur_ulist_index.val].email;
            */
        },
        go_per_qlist: function(){
            this.$router.push('./per_qlist');
        },
        add_friend: function() {
            
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
            <Button text="Add Friend" v-show="this.$user_name.val != this.cur_username" @tap="add_friend()" />
        </StackLayout>
      </Page>
    `
};