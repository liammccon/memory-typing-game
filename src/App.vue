<template>
  <!--App-->
  <div class="container-fluid ltm-content bg-dark pt-5 pb-5 h-100 text-light">
    <div class="ms-3 me-3">
    <!--Tutorial-->
    <div v-if="(currentStage === stages.tutorial)">
          <Tutorial @start="start"/>
        </div>

    <div v-if="(currentStage === stages.playing)" class="ltm-game">
      <Game v-if="(currentStage === stages.playing)" ref="game"/>
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
  position: relative;
}
.ltm-game {
  
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
