module.exports = {
    methods: {
        sendQuestion() {
            console.log("Send the question!!");
            var time = new Date();
            console.log(this.TitleText + " :\n" + this.QuestionText);
            let year = time.getFullYear();
            let month = time.getMonth();
            let day = time.getDate();
            let hour = time.getHours();
            let minute = time.getMinutes();
            let sec = time.getSeconds();

            console.log("Time stamp : ");
            console.log(year + "/" + month + "/" + day);
            console.log(hour + ":" + minute + ":" + sec);
            console.log("Category : ")
            console.log(this.category[this.selectCategory.number]);
            console.log("Wanted time : ")
            console.log(this.wantedtime[this.selectTime.number]);
        },
    },
    data() {
        return {
            TitleText: "",
            QuestionText: "",
            category: ["C++", "Python", "JavaScript"],
            wantedtime: [1, 2, 4, 8, 16],
            selectCategory: number = 0,
            selectTime: number = 0,
        }
    },
    template: `
    <Page>
    <ActionBar :title="$route.path">
        <NavigationButton text="Back!" android.systemIcon="ic_menu_back" @tap="$router.back()" />
    </ActionBar>
    <GridLayout rows="auto auto auto auto auto auto auto auto auto auto auto auto">
        
            <Span text="Title : \n" row="1"/>
            <TextField v-model="TitleText" hint="Enter the title" row="2"/>
            <Span text="Description : \n" row="3" />
            <TextField v-model="QuestionText" hint="Describe the quesion" row="4"/>
            

            <ScrollView orientation="vertical" row="5">
            <StackLayout orientation="vertical" class="scroll-menu">
                <StackLayout >
                    <Span text="Category : \n"/>
                    <ListPicker :items="category" v-model="selectCategory" />        
                    <Button text="submit" @tap="sendQuestion()" />                  
                </StackLayout>
            </StackLayout>
        </ScrollView>   
    </GridLayout>   
    </Page>
  `
};

/*
<StackLayout >
<Span text="Wanted replay time : \n" />
<ListPicker :items="wantedtime" v-model="selectTime"/>              
</StackLayout>
*/