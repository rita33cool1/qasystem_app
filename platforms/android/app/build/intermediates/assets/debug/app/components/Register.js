module.exports = {
    methods: {
        register: function () {
            console.log("Register!");
            var account = $("TextField[v-model=Account]").val();
            var pwd = $("TextField[v-model=Password]").val();
            firebase.auth().createUserWithEmailAndPassword(account.value, pwd.value)
                .then(function (result) {
                    
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMsg = error.message;
                    console.log(errorMsg);
                });


        },
    },
    template: `
      <Page>
        <ActionBar :title="$route.path">
          <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
        </ActionBar>
        <StackLayout>
            <Label :text="Register" />
            <TextField v-model="Account" hint="Account..." />
            <TextField v-model="Password" hint="Password..." />
            <Button text="Submit" @tap="register()" />
            <Button text="Back" @tap="$router.go(-1)" />
        </StackLayout>
      </Page>
    `
};