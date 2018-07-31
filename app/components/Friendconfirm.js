const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/user/profile/",
            confirmapiUrl: "http://140.114.79.86:8000/api/social/friend/confirm/",
            friend_requests: []
        }
    },
    methods: {
        load: function () {
            console.log("Load profile!!");
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

                this.friend_requests = result.friend_requests;
            }, (e) => {
                console.log(e);
            });
        },
        Confirm: function () {
            console.log("confirm");
        },
        Rejuct: function(){
            console.log("rejuct");
        }
    },
    template: `
      <Page @loaded="load()">
        <ActionBar :title="$route.path">
          <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
        </ActionBar>
        <StackLayout>
            <ListView class="list-group" for="friend in friend_requests" style="height:1250px width:60px">
                <v-template>
                    <FlexboxLayout flexDirection="row" class="list-group-item">
                    <Label :text="friend" class="list-group-item-heading" style="width: 60" />
                    <Button text="Confirm" @tap="Confirm()" />
                    <Button text="Rejuct" @tap="Rejuct()" />
                    </FlexboxLayout>
                </v-template>
            </ListView>
        </StackLayout>
      </Page>
    `
};