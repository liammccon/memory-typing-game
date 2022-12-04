<template>
    <div class="ltm-content container-fluid border border-light bg-dark rounded ">
        <p v-if="(currentStage !== stages.getReady)" class="text-center mt-5"><strong>Round: {{round}} </strong></p>
        <!--Content-->
        <div class="text-center ltm-center w-100 p-5">
            <!--Get Ready Stage-->
            <div v-if="(currentStage === stages.getReady)"  >
                <h2 class="mb-3 display-5">Get ready!</h2>
                <ProgressBar @done="startRememberPhase" :timerSeconds="getReadyTimeSecs" ref="progressBar"/>
            </div>

            <!--Remember stage-->
            <div v-if="(currentStage === stages.remember)">
                <h2 class="mb-3 display-5">Remember the following:</h2>
                <input class="form-control ltm-input bg-dark mb-3" type="text" :placeholder="textToType" aria-label="Disabled input" disabled>
                <ProgressBar @done="startTypePhase" :timerSeconds="rememberSecs" ref="progressBar"/>
            </div>

            <!--Type stage-->
            <div v-if="(currentStage === stages.type)">
                <h2 class="mb-3 display-5">Now type it:</h2>
                <input id="type-input" class="form-control ltm-input bg-dark mb-3" type="text" placeholder="type it out!" aria-label="input" autofocus>
                <ProgressBar @done="verifyInput" :timerSeconds="typeSecs" ref="progressBar"/>
            </div>

        </div>
        

    </div>
    
</template>

<script>
import ProgressBar from "./ProgressBar.vue"

export default {
    name: 'Tutorial',
    components: {
        ProgressBar,
    },
    data(){
        return {
            stages: {
                getReady: "GET_READY",
                remember: "REMEMBER",
                type: "TYPE",
                win: "WIN",
                lose: "LOSE",
            },
            currentStage: "GET_READY",
            round: 1,
            numOfWords: 1, //TODO REFACTOR into time to complete each word, calculate time remaining
            getReadyTimeSecs: 2,
            rememberSecs: 4,
            typeSecs: 4,
            textToType: String
        }
    },
    methods: {
        //Stages
        async start(){
            console.log("starting game")
            this.currentStage = this.stages.getReady 
            this.textToType = this.getTextToType()
            this.startProgressBar()
        },
        async startRememberPhase(){
            this.currentStage = this.stages.remember
            this.startProgressBar()
        },
        async startTypePhase(){
            this.currentStage = this.stages.type
            this.startProgressBar()
        },
        async startProgressBar(){
            const waitForProgressBarInitMs = 100 //Wait for ProgressBar to be created
            await new Promise(resolve => setTimeout(resolve, waitForProgressBarInitMs));
            this.$refs.progressBar.start()
        },
        verifyInput(){
            const originalInput = $("#type-input").val()

            //Clean the input string
            let cleanInputAsWordList = originalInput 
                .toLowerCase()
                .split(' ') //Separate by spaces
                .filter(word => Boolean(word)) //removes extra spaces
            let cleanInputString = ''

            cleanInputAsWordList.forEach(word => cleanInputString+= (word + ' ')) //Re create the input string with spaces
            cleanInputString = cleanInputString.trim() //Remove extra space at the end

            let isCorrect = cleanInputString == this.textToType
            
            //Todo
            console.log(isCorrect)
            if (isCorrect){
                //this.startWinStage()
            } else {
                //this.startLoseStage()
            }
        },

        //Helper methods
        getTextToType(){
            //TODO
            return "apple pie milkshake"
        }
    }      
}
</script>

<style scoped>

.ltm-content{
    width: 700px;
    max-width: 90vw; 
    min-height: 400px;
    position: relative;
}
.ltm-center{
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}
.ltm-input {
    font-size:larger;
    font-family:'Courier New', Courier, monospace;
    font-weight:bold;
    color: white;
}

::placeholder {
    color: rgb(235, 235, 235);
}
</style>