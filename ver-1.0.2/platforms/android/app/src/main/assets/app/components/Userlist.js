const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/users/list/",
            userlist: []
            //{name: xxx}
        }
    },
    methods: {
        load: function() {
            console.log("Load userlist");
            Object.assign(this.$data, this.$options.data.call(this));
            httpModule.request({
                url: this.apiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                for (var i = this.userlist.length; i < result.length; i++) {

                    var tmp_data = {
                        username: result[i].username,
                        uid: result[i].user_id,
                        expertises: result[i].expertises,
                        email: result[i].email,
                        index: i
                    };
                    this.userlist.push(tmp_data);
                }
            }, (e) => {
                console.log(e);
            });
        },
        onItemTap: function(args) {
            console.log(args.item.uid);
            this.$cur_uid.val = args.item.uid;
            this.$watch_username.val = args.item.username;
            this.$router.push('/userprofile');
        }
    },
    template: `
    <Page @loaded="load()">
        <ActionBar :title="$route.path">
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.push('/home');" />
        </ActionBar>
        <StackLayout>
            <Span text="User : " fontWeight="Bold" />
            <ListView class="list-group" for="user in userlist" @itemTap="onItemTap" style="height:1250px">
                <v-template>
                    <FlexboxLayout flexDirection="row" class="list-group-item">
                        <Label :text="user.username" class="list-group-item-heading" style="width: 60%" />
                    </FlexboxLayout>
                </v-template>
            </ListView>    
        </StackLayout>
    </Page>
  `
};