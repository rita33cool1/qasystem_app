const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: 'http://211.149.193.19:8080/api/customers',
            Email: "123@example.com",
            AccountText: "Name",
            PasswordText: "Pwd",
            item: {},
        }
    },
    methods: {
        register: function () {
            /*httpModule.request({
                url: "https://httpbin.org/get",
                method: "GET"
            }).then((response) => {
                console.log(response)
            }, (e) => {
                console.log(e);
            });*/
            console.log("Register Successfully!");
            //vm.user_account[this.user_account.length] = this.AccountText;
            //console.log(this.user_account[this.user_account.length]);

            var tmp_data = JSON.stringify({
                "email": this.Email,
                "username": this.AccountText,
                "password": this.PasswordText,
            });
            this.$userdata.push(tmp_data);
            //http
            var vm = this;
            vm.$http.post(vm.apiUrl, vm.item)
                .then((response) => {
                    vm.$set('item', {})
                    //vm.getCustomers()
                })
            /*
            this.$http.post(this.apiUrl).then(function (successCallback) {
                console.log("success!!");
                console.log(successCallback);
            }, function (errorCallback) {
                console.log("error!!");
                console.log(errorCallback);
            });
            */
            //this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);

            this.$router.go(-1);
        },
    },
    template: `
      <Page>
        <ActionBar :title="$route.path">
          <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
        </ActionBar>
        <StackLayout>
            <Label :text="Register" />
            <TextField v-model="AccountText" hint="Enter Account..." />
            <TextField v-model="PasswordText" hint="Enter Password..." />
            <Button text="Submit" @tap="register()" />
            <Button text="Back" @tap="$router.go(-1)" />
        </StackLayout>
      </Page>
    `
};