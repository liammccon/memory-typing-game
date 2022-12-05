<template>
    <div class="display-1 mb-3 text-center">Word Mash! </div>
    <div class="m-auto ltm-content text-start fs-5 py-3 px-3 border border-light rounded ">
        <div class="display-5 mb-3 text-center">Tutorial</div>
        <h4 class="text-center">Word Mash will put your memory and typing to the test!</h4>
        <p>Each round, you will be shown a string of random words. After a few seconds, the words will disapear and you will have to type them
             out by memory before the timer runs out. If you correctly types all words before the timer runs out, a new round begins, 
             otherwise, you lose and must start over. The timer is calculated based on the total number of letters.</p> 
        <p>Each round gets progressively harder. The number of words to remember increases, and the time to complete it decreases.</p>
        <p>The text will be automatically submitted, no need to press 'Enter'</p>
        <div class="text-center mt-5 mb-5">
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
    background-color: rgb(33, 37, 41, .7);
}
</style>