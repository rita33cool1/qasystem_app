const httpModule = require("http");
module.exports = {
    methods: {

    },
    data() {

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