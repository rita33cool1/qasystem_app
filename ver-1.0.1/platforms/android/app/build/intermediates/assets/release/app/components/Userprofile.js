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
            Object.assign(this.$data, this.$options.data.call(this));
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
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.push('/home');" />
        </ActionBar>
        <StackLayout>
            <Label :text="Profile">
                <Span text="User Profile" fontWeight="Bold" />
            </Label>       
            <TextView editable="false">
                <FormattedString>   
                <Span fontWeight="Bold" >UserName : {{ cur_username }}\n</Span>
                <Span fontWeight="Bold" >Email : {{ cur_email }}\n</Span>
                <Span v-if="this.cur_expertises[0]" fontWeight="Bold" >Expertises : {{ cur_expertises[0] }}</Span>
                <Span v-else fontWeight="Bold" >Empty</Span>
                <Span v-if="this.cur_expertises[1]" fontWeight="Bold" >, {{ cur_expertises[1] }}</Span>
                <Span v-if="this.cur_expertises[2]" fontWeight="Bold" >, {{ cur_expertises[2] }}</Span>
                    <Span text="\n" />
                </FormattedString>
            </TextView>
            <Button text="Personal Question" @tap="go_per_qlist()" />
            <Button text="Add Friend" v-show="this.isfriend == false && this.$user_id.val != '0' " @tap="add_friend()" />
            <Button text="Follow" v-show="this.isfollowing == false && this.$user_id.val != '0' " @tap="follow()" />
        </StackLayout>
      </Page>
    `
};