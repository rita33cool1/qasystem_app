module.exports = {
  methods: {
    onItemTap: function (args) {
      console.log('Item with index: ' + args.index + ' tapped');
      if(args.index == 1){
          $router.push('/login');
      }
    },
  },
  data() {
    return {
      surprise: false,
      lists: [
        { name: "Register", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png" },
        { name: "Login", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png" },
        { name: "Contact", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png" },
      ],
    };
  },
  template: `
    <Page>
      <ActionBar :title="$route.path" />
      <StackLayout>
        <Button text="Register" @tap="$router.push('/register')" />
        <Button text="Login" @tap="$router.push('/login')" />
        <!--Button text="To Details (with query param)" @tap="$router.push('/detail?user=John+Appleseed')"></Button>
      </StackLayout>
    </Page>
  `
};