const httpModule = require("http");
module.exports = {
    data() {
        return {
            apiUrl: "http://140.114.79.86:8000/api/user/question/post/",
            TitleText: "",
            QuestionText: "",
            wantedtime: [1, 2, 4, 8, 16],
            selectTime: number = 0,
            Expertise1: "",
            Expertise2: "",
            Expertise3: ""
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
            if (this.Expertise3 != "") {
                new_expertises.push(this.Expertise3);
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
                <Span text="Title : \n"/>
            </Label>
            <TextField v-model="TitleText" hint="Enter the title" >
                <Span text="Description : \n"  />
            </TextField>
            <TextField v-model="QuestionText" hint="Describe the quesion" />
            <Label>
                <Span text="Category : \n"/>
            </Label>

            <TextField v-model="Expertise1" hint="Enter Expertise..." />
            <TextField v-model="Expertise2" hint="Enter Expertise..." />
            <TextField v-model="Expertise3" hint="Enter Expertise..." />        
            <Button text="submit" @tap="sendQuestion()" />                  
 
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