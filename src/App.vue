<template>
  
  <!--App-->
  <div class="">

    <Background />
    

    <div class="container-fluid  pt-5 pb-5 h-100 text-light ltm-outer">
      <div class="ms-3 me-3 ltm-middle">
      
        <!--Tutorial-->
        <div v-if="(currentStage === stages.tutorial)" class="ltm-inner">
            <Tutorial @start="start"/>
        </div>

        <!--Game-->
        <div v-if="(currentStage === stages.playing)" class="ltm-inner">
          <Game v-if="(currentStage === stages.playing)" @score="updateHighscore" ref="game"/>
        </div>
      
        <p v-if="highscore" class="text-center mt-5">Highscore: {{highscore}}</p>
        <div class="ltm-spacer"></div>

      </div>
    </div>
  </div>
  
</template>

<script>
import Tutorial from './components/Tutorial.vue'
import Game from './components/Game.vue'
import Background from './components/Background.vue'


export default {
  name: 'App',
  components: {
    Tutorial, Game, Background
  }, data(){
    return {
      stages: {
        tutorial: "TUTORIAL",
        playing: "PLAYING"
      },
      currentStage: String,
      round: 0,
      highscore: 0,
      bgImgNumber: 0
      
    }
  },
  created(){
    this.currentStage = this.stages.tutorial
    if (!this.bgImgNumber)
      this.setBgImgNumber()
  },
  methods: {
    async start(){
      this.currentStage = this.stages.playing

      //Wait for Game to be created
      const waitForGameInitMs = 100
      await new Promise(resolve => setTimeout(resolve, waitForGameInitMs));

      this.$refs.game.start() //Start the game timers
    },
    updateHighscore(score){
      this.highscore = score > this.highscore ? score : this.highscore
    },
    setBgImgNumber(){
      let max = 1
      let imgNumber = Math.floor(Math.random() * max) + 1;
      console.log(imgNumber)
      return imgNumber
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
      
}
.ltm-outer {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
}

.ltm-middle {
  display: table-cell;
  vertical-align: middle;
}

.ltm-inner {
  margin-left: auto;
  margin-right: auto;
  /* Whatever width you want */
}
.ltm-spacer{
  height:10px;
}


</style>
