module.exports = {
  methods: {
    signin: function(){
      console.log("Signin!");
    },
  },
  template: `
      <Page>
        <ActionBar :title="$route.path">
          <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
        </ActionBar>
        <StackLayout>
            <Label :text="Login" />

            <TextField v-model="Account" hint="Account..." />
            <TextField v-model="Password" hint="Password..." />
            <Button text="Submit" @tap="signin()" />
            <Button text="Back" @tap="$router.go(-1)" />
        </StackLayout>
      </Page>
    `
};