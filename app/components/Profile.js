const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/users/list/",
            cur_username: "",
            cur_expertises: [],
            cur_email: ""
        }
    },
    methods: {
        load: function() {
            console.log("Load profile!!");
            httpModule.request({
                url: this.apiUrl,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                const result = response.content.toJSON();
                this.$user_num = result.length;

                for (var i = 0; i < this.$user_num; i++) {
                    if(result[i].username == this.$user_name.val){
                        this.cur_username = result[i].username;
                        this.cur_expertises = result[i].expertises;
                        this.cur_email = result[i].email;
                    }
                }

                //console.log(response.content.toJson.prototype);
            }, (e) => {
                console.log(e);
            });
        },
        go_per_qlist: function(){
            this.$router.push('./per_qlist');
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
            <Button text="Change" @tap="$router.push('/change')" />
            <Button text="Personal Question" @tap="go_per_qlist()" />
        </StackLayout>
      </Page>
    `
};