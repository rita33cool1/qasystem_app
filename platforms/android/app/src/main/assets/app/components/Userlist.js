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
            console.log("Load question");
            httpModule.request({
                url: this.apiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result[0]);
                //this.$question_list = [];
                this.$question_num = result.length;

                for (var i = this.$question_list.length; i < this.$question_num; i++) {
                    console.log(result[i]);
                    var tmp_data = {
                        username: result[i].username,
                        uid: result[i].id,
                    };
                    this.$user_list.push(tmp_data);
                }

            }, (e) => {
                console.log(e);
            });
        },
        onItemTap: function(args) {
            console.log("Success");
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