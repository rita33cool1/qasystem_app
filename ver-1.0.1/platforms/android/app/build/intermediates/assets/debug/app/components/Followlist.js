const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/user/profile/",
            follows: []
        }
    },
    methods: {
        load: function () {
            console.log("Load followlist!!");
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

                this.follows = result.followings;
            }, (e) => {
                console.log(e);
            });
        },
        onItemTap: function(args) {
            console.log(args.item);
            this.$watch_username.val = args.item;
            this.$router.push('./userprofile');
        }
    },
    template: `
      <Page @loaded="load()">
        <ActionBar :title="$route.path">
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.push('/home');" />
        </ActionBar>
        <StackLayout>

            <Label>
                <Span v-if="follows.length == 0" text="Empty" />
            </Label>

            <ListView class="list-group" for="follow in follows" @itemTap="onItemTap" style="height:1250px width:60px">
                <v-template>
                    <FlexboxLayout flexDirection="row" class="list-group-item">
                        <Label :text="follow" class="list-group-item-heading" style="width: 60%" />
                    </FlexboxLayout>
                </v-template>
            </ListView>
        </StackLayout>
      </Page>
    `
};