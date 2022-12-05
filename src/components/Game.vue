<template>
    <div class="ltm-content container-fluid border border-light rounded ">
        <p v-if="(currentStage === stages.getReady) 
            || (currentStage === stages.remember) 
            || (currentStage === stages.type)" class="text-center mt-5"><strong>Round: {{round}} </strong></p>
        <!--Content-->
        <div class="text-center ltm-center w-100 p-5 ">
            <!--Get Ready Stage-->
            <div v-if="(currentStage === stages.getReady)"  >
                <h2 class="mb-3 display-5">Get ready!</h2>
                <ProgressBar @done="startRememberPhase" :timerMs="getReadyMs" ref="progressBar"/>
            </div>

            <!--TODO CHANGE TO TEXTAREA FOR LATER STAGE-->

            <!--Remember stage-->
            <div v-if="(currentStage === stages.remember)">
                <h2 class="mb-3 display-5">Remember the following:</h2>
                
                <textarea id="remember-textarea" class="form-control ltm-input monospace bg-dark mb-3" :placeholder="textToType" rows="1" disabled></textarea>
                
                <ProgressBar @done="startTypePhase" :timerMs="rememberMs" ref="progressBar"/>
            </div>

            <!--Type stage-->
            <div v-if="(currentStage === stages.type)">
                <h2 class="mb-3 display-5">Now type it:</h2>
                
                <textarea id="type-input" class="form-control ltm-input monospace bg-dark mb-3" placeholder="type it out" rows="1" ></textarea>

                <ProgressBar @done="verifyInput" :timerMs="typeMs" ref="progressBar"/>
            </div>

            <!--Win stage-->
            <div v-if="(currentStage === stages.win)">
                <h2 class="mb-3 display-5">Correct!</h2>
                <button id="next-round-btn" class="btn btn-light" @click="startNewRound">Next round</button>
            </div>

            <!--Lose stage-->
            <div v-if="(currentStage === stages.lose)">
                <h2 class="mb-3 display-5">So close!</h2>
                <p>You typed: <span class="monospace fw-bold">{{enteredText}}</span> </p>
                <p>But it was: <span class="monospace fw-bold">{{textToType}}</span></p>
                <p><strong>You passed {{(round-1)}} round{{(round - 1 != 1? "s" : "")}}</strong></p>
                <p>Try again?</p>
                <button id="start-over-btn" class="btn btn-light" @click="startOver">Start over!</button>
            </div>

        </div>
        

    </div>
    
</template>

<script>
import ProgressBar from "./ProgressBar.vue"
import CommonWords from "../CommonWords"
import autosize from 'autosize'


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
            numOfWords: Number, 
            timeMsPerChar: Number,
            getReadyMs: 2000,
            rememberMs: Number,
            typeMs: Number,
            enteredText: String,
            textToType: String
        }
    },
    methods: {
        //Stages
        async start(){
            this.initializeFields()

            this.currentStage = this.stages.getReady 
            this.startProgressBar()
        },
        async startNewRound(){
            this.updateFieldsForNextRound()
            this.currentStage = this.stages.getReady 
            this.startProgressBar()
        },
        async startRememberPhase(){
            this.currentStage = this.stages.remember

            const waitForDivLoadMs = 100 //Wait for ProgressBar to be created
            await new Promise(resolve => setTimeout(resolve, waitForDivLoadMs));
            autosize($('#type-input'));


            autosize($('#remember-textarea'));
            this.startProgressBar()
        },
        async startTypePhase(){
            this.currentStage = this.stages.type

            const waitForDivLoadMs = 100 //Wait for ProgressBar to be created
            await new Promise(resolve => setTimeout(resolve, waitForDivLoadMs));
            autosize($('#type-input'));

            $("#type-input").focus()
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
                .replace(/\n/g, " ") //Replace any new lines with a space
                .split(' ') //Separate by spaces
                .filter(word => Boolean(word)) //removes extra spaces
            let cleanInputString = ''

            cleanInputAsWordList.forEach(word => cleanInputString+= (word + ' ')) //Re create the input string with spaces
            cleanInputString = cleanInputString.trim() //Remove extra space at the end
            this.enteredText=cleanInputString

            let isCorrect = cleanInputString == this.textToType
            
            if (isCorrect){
                this.startWinStage()
            } else {
                this.startLoseStage()
            }
        },
        async startWinStage(){
            this.currentStage = this.stages.win
            this.$emit('score', this.round)

            //Focus on the button
            const waitForDivLoadMs = 100 //Wait for ProgressBar to be created
            await new Promise(resolve => setTimeout(resolve, waitForDivLoadMs));
            $('#next-round-btn').focus()
        },
        async startLoseStage() {
            this.currentStage = this.stages.lose

            this.$emit('score', this.round - 1)

            //Focus on the button
            const waitForDivLoadMs = 100 //Wait for ProgressBar to be created
            await new Promise(resolve => setTimeout(resolve, waitForDivLoadMs));
            $('#start-over-btn').focus()
        },
        startOver(){
            this.start()
        },

        //Setting fields and timers
        initializeFields(){
            this.numOfWords = 1
            this.round = 1
            this.timeMsPerChar = 400
            this.textToType = this.getTextToType()

            this.calculateTimers()
        },
        calculateTimers(){
            let textLength = this.textToType.length
            this.rememberMs = textLength * this.timeMsPerChar
            this.typeMs = textLength * this.timeMsPerChar
        },

        updateFieldsForNextRound(){
            this.round++ 
            this.numOfWords++

            const timePerCharMultiplier = 0.8
            this.timeMsPerChar *= timePerCharMultiplier
            this.getReadyMs = 1500 //Shorten the get ready time after one round
            this.textToType = this.getTextToType()
            this.calculateTimers()
        },
        getTextToType(){
            return CommonWords.getRandomWordsAsString(this.numOfWords)
        },
    }      
}
</script>

<style scoped>

.ltm-content{
    width: 700px;
    max-width: 90vw; 
    min-height: 400px;
    position: relative;
    background-color: rgb(33, 37, 41, .7);
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
    font-weight:bold;
    color: white;
}

::placeholder {
    color: rgb(235, 235, 235);
}

.monospace{
    font-family:'Courier New', Courier, monospace; 
}
</style>