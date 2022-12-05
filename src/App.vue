<template>
  
  <!--App-->
  <div class="">
    <img id="bg-image" class = "" src='./assets/wide-background-1.png' />
    
    <div class="container-fluid  pt-5 pb-5 h-100 text-light">
      <div class="ms-3 me-3 ltm-content">
      
        <!--Tutorial-->
        <div v-if="(currentStage === stages.tutorial)">
            <Tutorial @start="start"/>
        </div>

        <!--Game-->
        <div v-if="(currentStage === stages.playing)" class="ltm-game">
          <Game v-if="(currentStage === stages.playing)" ref="game"/>
        </div>
      
        <div class="ltm-spacer"></div>

      </div>
    </div>
  </div>
  
</template>

<script>
import Tutorial from './components/Tutorial.vue'
import Game from './components/Game.vue'

export default {
  name: 'App',
  components: {
    Tutorial, Game
  }, data(){
    return {
      stages: {
        tutorial: "TUTORIAL",
        playing: "PLAYING"
      },
      currentStage: String,
      round: 0,
      
    }
  },
  created(){
    this.currentStage = this.stages.tutorial
  },
  methods: {
    async start(){
      this.currentStage = this.stages.playing

      //Wait for Game to be created
      const waitForGameInitMs = 100
      await new Promise(resolve => setTimeout(resolve, waitForGameInitMs));

      this.$refs.game.start() //Start the game timers
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
.ltm-content {
}
.ltm-game {
  
}
.ltm-spacer{
  height:10px;
}
#bg-image {
  position: fixed;
  z-index: -1;
  filter: brightness(50%);
}
</style>
