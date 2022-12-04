<template>
    <div class="m-auto ltm-content text-start fs-5">
        <h2>Tutorial</h2>
        <p>In this game, the player will be shown a string of random words to remember.</p>
        <p>After a few seconds, the words will disapear and the player will have to type the words out by memory with a timer. If the player correctly types all words before the timer runs out, a new round begins, otherwise, they lose and must start over.</p> 
        <p>Each round gets progressively harder. The number of words to remember increases, and the time to complete each one decreases.</p>
        <div class="text-center mt-5">
            <p>Ready to begin?</p>
            <button @click="$emit('start')" class="btn btn-light">Lets go!</button>
        </div>
        

    </div>
    </template>

<script>
export default {
  name: 'Tutorial',
}
</script>

<style scoped>
.ltm-content {
    max-width: 700px;
}
</style>