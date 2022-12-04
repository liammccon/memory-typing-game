<template>
    <!--Progress bar-->
    <div class="progress">
        <div id="progress-bar" class="progress-bar bg-secondary" role="progressbar" aria-label="Success example" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    timerSeconds: Number
  },
  methods: {
    start() {
        $('#progress-bar').attr('aria-valuenow', 0).css('width', 0+'%')
        console.log('hi!')

        const updateIntervalMs = 10
        const timerMs = this.timerSeconds * 1000
        const totalIntervals = timerMs / updateIntervalMs + 3 //Add a bit of time padding
        var currentInterval = 0
        let percentDone = 0
        const done = () => this.$emit('done')

        var timer = setInterval(function(){
            currentInterval++
            if (currentInterval >= totalIntervals){
                clearInterval(timer)
                done()
            }
            percentDone = (currentInterval / totalIntervals) * 100
            $('#progress-bar').attr('aria-valuenow', percentDone).css('width', percentDone+'%')

        }, updateIntervalMs)
    }
  }
}
</script>
