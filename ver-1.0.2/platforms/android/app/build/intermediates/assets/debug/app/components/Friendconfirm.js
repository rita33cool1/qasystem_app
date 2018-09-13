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

                this.friend_requests = result.friend_requests;
            }, (e) => {
                console.log(e);
            });
        },
        Response:function(name, answer){
            httpModule.request({
                url: this.confirmapiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    requester: name, 
                    replyer: this.$user_name.val, 
                    key: this.$user_id.val,
                    action: answer
                })
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result);
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
            <ListView class="list-group" for="friend in friend_requests" style="height:1250px width:60px">
                <v-template>
                    <FlexboxLayout flexDirection="row" class="list-group-item">
                        <Label :text="friend\n" class="list-group-item-heading" style="width: 60" />
                        <Button text="Accept" @tap="Response(friend,'accept')" />
                        <Button text="Reject" @tap="Response(friend,'reject')" />
                    </FlexboxLayout>
                </v-template>
            </ListView>
        </StackLayout>
      </Page>
    `
};