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
                    alert(result.msg);
                    this.$router.go(-1);
                } else {
                    alert(result.msg);
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
            <TextField v-model="TitleText" hint="Enter the title" />
            
            <Label>
                <Span text="Description : \n"  />
            </Label>
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