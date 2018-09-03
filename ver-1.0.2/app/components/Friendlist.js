const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/user/profile/",
            friends: []
        }
    },
    methods: {
        load: function () {
            console.log("Load friendlist!!");
            Object.assign(this.$data, this.$options.data.call(this));
            httpModule.request({
                url: this.apiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val
                })
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result);
                for (var i = 0; i < result.friends.length; i++) {
                    this.friends.push(result.friends[i]);
                }
                
            }, (e) => {
                console.log(e);
            });
        },
        onItemTap: function(args) {
            console.log(args.item.uid);
            this.$watch_username.val = args.item.username;
            this.$router.push('/userprofile');
        }
    },
    template: `
      <Page @loaded="load()">
        <ActionBar :title="$route.path">
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.replace('/home');" />
        </ActionBar>
        <StackLayout>
            <ListView class="list-group" for="friend in friends" @itemTap="onItemTap" style="height:300px width:60px">
                <v-template>
                    <FlexboxLayout flexDirection="row" class="list-group-item">
                        <Label :text="friend" class="list-group-item-heading" />
                    </FlexboxLayout>
                </v-template>
            </ListView>
        </StackLayout>
      </Page>
    `
};