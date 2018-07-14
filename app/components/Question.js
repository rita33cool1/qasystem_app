const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/user/question/post/",
            TitleText: "",
            QuestionText: "",
            category: ["None", "C++", "Python", "JavaScript"],
            wantedtime: [1, 2, 4, 8, 16],
            selectCategory: number = 0,
            selectCategory2: number = 0,
            selectCategory3: number = 0,
            selectTime: number = 0,
            Expertise1: "",
            Expertise2: ""
        }
    },
    methods: {
        sendQuestion() {

            console.log("Send the question!!");
            var time = new Date();
            console.log(this.TitleText + " : " + this.QuestionText);
            let year = time.getFullYear();
            let month = time.getMonth();
            let day = time.getDate();
            let hour = time.getHours();
            let minute = time.getMinutes();
            let sec = time.getSeconds();
            console.log("Time stamp : ");
            console.log(year + "/" + month + "/" + day);
            console.log(hour + ":" + minute + ":" + sec);
            console.log(this.category[this.selectCategory2]);

            var new_expertises = [];

            if (this.Expertise1 != "") {
                new_expertises.push(this.Expertise1);
            }
            if (this.Expertise2 != "") {
                new_expertises.push(this.Expertise2);
            }

            console.log(new_expertises);

            httpModule.request({
                url: this.apiUrl,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: this.$user_id.val,
                    title: this.TitleText,
                    content: this.QuestionText,
                    expertises: new_expertises
                })
            }).then((response) => {
                const result = response.content.toJSON();
                if (result.msg == "Success") {

                    console.log(result);
                    this.$router.go(-1);
                } else {
                    console.log(result);
                }
                //console.log(response.content.toJson.prototype);
            }, (e) => {
                alert(e);
            });


        },
    },

    template: `
    <Page>
    <ActionBar :title="$route.path">
        <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
    </ActionBar>
    <ScrollView>
        <StackLayout >
            <Label>
                <Span text="Title : \n" row="1"/>
            </Label>
            <TextField v-model="TitleText" hint="Enter the title" row="2">
                <Span text="Description : \n" row="3" />
            </TextField>
            <TextField v-model="QuestionText" hint="Describe the quesion" row="4"/>
            <Label>
                <Span text="Category : \n"/>
            </Label>
            <ListPicker :items="category" v-model="selectCategory" />                
        </StackLayout>
    </ScrollView>
      
    </Page>
  `
};

/*
<StackLayout >
<Span text="Wanted replay time : \n" />
<ListPicker :items="wantedtime" v-model="selectTime"/>              
</StackLayout>
*/