<template>
    <div class="ltm-content container-fluid border border-light bg-dark rounded ">
        <p v-if="(currentStage !== stages.getReady)" class="text-start mt-4 ms-4"><strong>Round: {{round}} </strong></p>
        <div class="text-center ltm-center w-100 p-5">
            <!--Content-->
            <div v-if="(currentStage === stages.getReady)"  >
                <h2 class="mb-3">Get ready!</h2>
                <ProgressBar @done="startRememberPhase" :timerSeconds="getReadyTimeSecs" ref="progressBar"/>
            </div>
            <div v-if="(currentStage === stages.remember)">
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
            getReadyTimeSecs: 3,

        }
    },
    methods: {
        async start(){
            console.log("starting game")
            this.currentStage = this.stages.getReady 
            //Wait for ProgressBar to be created
            const waitForProgressBarInitMs = 100
            await new Promise(resolve => setTimeout(resolve, waitForProgressBarInitMs));
            this.$refs.progressBar.start()
        },
        async startRememberPhase(){
            console.log("Starting remember phase")
            this.currentStage = this.stages.remember
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
</style>