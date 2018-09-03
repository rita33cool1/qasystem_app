const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/users/list/",
            UserapiUrl: "http://140.114.79.86:8000/api/user/profile/",
            addapiUrl: "http://140.114.79.86:8000/api/social/friend/send/",
            followapiUrl: "http://140.114.79.86:8000/api/social/following/add/",
            cur_username: "",
            cur_expertises: [],
            cur_email: "",
            cur_uid: "",
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
                var user_num = result.length;

                for (var i = 0; i < user_num; i++) {
                    if (result[i].username == this.$watch_username.val) {
                        console.log(result[i]);
                        this.cur_username = result[i].username;
                        this.cur_expertises = result[i].expertises;
                        this.cur_email = result[i].email;
                        this.cur_uid = result[i].user_id;
                    }
                }

                httpModule.request({
                    url: this.UserapiUrl,
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    content: JSON.stringify({
                        key: this.$user_id.val
                    })
                }).then((response) => {
                    const result = response.content.toJSON();
                    
                    for (var j = 0; j < result.friends.length; j++) {
                        if (result.friends[j] == this.cur_username) {
                            console.log("isfriend");
                            this.isfriend = true;
                        }
                    }
                    for (var j = 0; j < result.followings.length; j++) {
                        if (result.followings[j] == this.cur_username) {
                            console.log("isfollowing");
                            this.isfollowing = true;
                        }
                    }
                }, (e) => {
                    console.log(e);
                });
            }, (e) => {
                console.log(e);
            });
        },
        go_per_qlist: function () {
            this.$cur_uid.val = this.cur_uid;
            this.$router.push('/per_qlist');
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
                if (result.msg != "Success") {
                    alert(result.errorMsg);
                } else {
                    alert(result.msg);
                }
            }, (e) => {
                console.log(e);
            });
        },
        follow: function () {
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
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.replace('/home');" />
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
                <Span v-if="this.cur_expertises[2]" fontWeight="Bold" >, {{ cur_expertises[2] }}\n</Span>
                </FormattedString>
            </TextView>
            <Button text="Personal Question" @tap="go_per_qlist()" />
            <Button text="Add Friend" v-show="this.isfriend == false && this.$user_id.val != '0' " @tap="add_friend()" />
            <Button text="Follow" v-show="this.isfollowing == false && this.$user_id.val != '0' " @tap="follow()" />
        </StackLayout>
      </Page>
    `
};