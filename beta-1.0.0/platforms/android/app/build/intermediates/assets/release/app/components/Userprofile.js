const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/users/list/",
            addapiUrl: "http://140.114.79.86:8000/api/social/friend/send/",
            followapiUrl: "http://140.114.79.86:8000/api/social/following/add/",
            cur_username: "",
            cur_expertises: [],
            cur_email: "",
            isfriend: false,
            isfollowing: false
        }
    },
    methods: {
        load: function () {
            console.log("Load " + this.$watch_username.val + " profile");

            httpModule.request({
                url: this.apiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                this.$user_num = result.length;

                for (var i = 0; i < this.$user_num; i++) {
                    if (result[i].username == this.$watch_username.val) {
                        console.log(result[i]);
                        this.cur_username = result[i].username;
                        this.cur_expertises = result[i].expertises;
                        this.cur_email = result[i].email;
                        for (var j = 0; j < result[i].friends.length; j++) {
                            if(result[i].friends[j] == this.$user_name.val){
                                this.isfriend = true;
                            }
                        }
                        for (var j = 0; j < result[i].followings.length; j++) {
                            if(result[i].followings[j] == this.$user_name.val){
                                this.isfollowing = true;
                            }
                        }
                    }
                }
            }, (e) => {
                console.log(e);
            });
        },
        go_per_qlist: function () {
            this.$router.push('./per_qlist');
        },
        add_friend: function () {
            httpModule.request({
                url: this.addapiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val,
                    requester: this.$user_name.val,
                    replyer: this.cur_username
                })
            }).then((response) => {
                const result = response.content.toJSON();
                if(result.msg != "Success"){
                    alert(result.errorMsg);
                }else{
                    alert(result.msg);
                }
            }, (e) => {
                console.log(e);
            });
        },
        follow: function(){
            httpModule.request({
                url: this.followapiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val,
                    following: this.cur_username
                })
            }).then((response) => {
                const result = response.content.toJSON();
                alert(result.msg);
            }, (e) => {
                console.log(e);
            });
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
            <Button text="Add Friend" v-show="this.isfriend == false" @tap="add_friend()" />
            <Button text="Follow" v-show="this.isfollowing == false" @tap="follow()" />
        </StackLayout>
      </Page>
    `
};