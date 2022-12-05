<template>
    <!--Workaround: Unable to use Vue binding with images so have to declare with each option HTML-->
    <img v-if="(bgImgNumber == 1)" class="bg-image" src='../assets/bg-1.png' />
    <img v-if="(bgImgNumber == 2)" class="bg-image" src='../assets/bg-2.png' />
    <img v-if="(bgImgNumber == 3)" class="bg-image" src='../assets/bg-3.png' />
    <img v-if="(bgImgNumber == 4)" class="bg-image" src='../assets/bg-4.png' />
    <img v-if="(bgImgNumber == 5)" class="bg-image" src='../assets/bg-5.png' />
    <img v-if="(bgImgNumber == 6)" class="bg-image" src='../assets/bg-6.png' />
    <img v-if="(bgImgNumber == 7)" class="bg-image" src='../assets/bg-7.png' />
    <img v-if="(bgImgNumber == 8)" class="bg-image" src='../assets/bg-8.png' />
    <img v-if="(bgImgNumber == 9)" class="bg-image" src='../assets/bg-9.png' />
    <img v-if="(bgImgNumber == 10)" class="bg-image" src='../assets/bg-10.png' />
    <img v-if="(bgImgNumber == 11)" class="bg-image" src='../assets/bg-11.png' />

    <!--Backup background color-->
    <div class="ltm-bg-color"></div>
</template>

<script>
export default {
    name: 'Background',
    data(){
        return {
            bgImgNumber: 0
        }
    },
    created(){
        if(!this.bgImgNumber) //Only trigger once
            this.setBgImgNumber()
    },
    methods:{
        setBgImgNumber(){
            let max = 11
            let imgNumber = Math.floor(Math.random() * max) + 1;
            console.log(imgNumber)
            this.bgImgNumber = imgNumber
        }
    }
}
</script>

<style scoped>

.bg-image {
  position: fixed;
  z-index: -1;
  filter: brightness(35%);
  
  /* Image will always cover full window */
  min-width: 100vh;
  min-height: 100vw;
  width: 100vw;
  height: 110vh;
}

.ltm-bg-color {
  position: absolute; 
  z-index: -2; 
  width: 100%; 
  height: 100%; 
  background-color: rgb(33, 37, 41); 
}

</style>