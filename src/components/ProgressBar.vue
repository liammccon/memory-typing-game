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
    timerMs: Number
  },
  methods: {
    start() {
        $('#progress-bar').attr('aria-valuenow', 0).css('width', 0+'%')

        const updateIntervalMs = 10
        const totalIntervals = this.timerMs / updateIntervalMs 
        var currentInterval = 0
        let percentDone = 0
        const done = () => this.$emit('done')

        var timer = setInterval(function(){
            currentInterval++
            if (currentInterval >= totalIntervals + 200){ //Add a second of time padding for delayed display
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
