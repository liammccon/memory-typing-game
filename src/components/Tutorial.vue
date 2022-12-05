<template>
    <div class="m-auto ltm-content text-start fs-5">
        <div class="display-3 mb-3">Tutorial</div>
        <p>This game will put your short-term memory, spelling, and typing speed to the test!</p>
        <p>Each round, you will be shown a string of random words. After a few seconds, the words will disapear and you will have to type them
             out by memory before the timer runs out. If you correctly types all words before the timer runs out, a new round begins, 
             otherwise, you lose and must start over. The timer is calculated based on the length of the string of words.</p> 
        <p>Each round gets progressively harder. The number of words to remember increases, and the time to complete it decreases.</p>
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
}
</style>