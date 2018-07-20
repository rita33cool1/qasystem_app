const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/users/list/",
            userlist: [],
            //{name: xxx}
        }
    },
    methods: {
        load: function() {
            console.log("Load userlist");
            httpModule.request({
                url: this.apiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result[0]);
                //this.$question_list = [];
                this.$user_num = result.length;

                for (var i = this.$user_list.length; i < this.$user_num; i++) {
                    var tmp_data = {
                        username: result[i].username,
                        uid: result[i].id,
                    };
                    this.$user_list.push(tmp_data);
                }
                console.log(this.$user_list);
            }, (e) => {
                console.log(e);
            });
        },
        onItemTap: function(args) {
            console.log(args.item.uid);
            this.$cur_uid.val = args.item.uid;
        }
    },
    template: `
    <Page @loaded="load()">
        <ActionBar :title="$route.path">
            <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.go(-1);" />
        </ActionBar>
        <StackLayout>
            <Span text="User : " fontWeight="Bold" />
            <ListView class="list-group" for="user in $user_list" @itemTap="onItemTap" style="height:1250px">
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