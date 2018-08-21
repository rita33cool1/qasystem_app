const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/questions/",
            questionlist: [],
            searchPhrase: "",
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
                //console.log(result);
                for (var i = 0; i < result.length; i++) {
                    var tmp_data = {
                        title: result[i].title,
                        qid: result[i].question_id,
                        uid: result[i].user_id
                    };
                    this.questionlist.push(tmp_data);
                }    
            }, (e) => {
                console.log(e);
            });
        },
        onItemTap: function(args) {
            console.log(args.item.qid);
            this.$cur_qid.val = args.item.qid;
            this.$router.push('/showquestion');
        },
        onSearchSubmit(args) {
            let searchBar = args.object;
            console.log("You are searching for " + searchBar.text);
        },
    },
    template: `
    <Page @loaded="load()">
        <ActionBar :title="$route.path">
            <NavigationButton android.systemIcon="ic_menu_home" @tap="$router.push('/home');" />
        </ActionBar>
        <StackLayout>
            <SearchBar hint="Search" :text="searchPhrase" @submit="onSearchSubmit" />
            <ListView class="list-group" for="question in questionlist" @itemTap="onItemTap" style="height:1250px width:60px">
                <v-template>
                    <FlexboxLayout flexDirection="row" class="list-group-item">
                        <Label class="list-group-item-heading" >{{ question.qid }} {{ question.title }}</Label>
                    </FlexboxLayout>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
  `
};