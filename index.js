
document.addEventListener('alpine:init', () => {
    Alpine.data('swim', () => ({
        swimTimesCommonDistances: [],
        swimPaceMinutes: 0,
        swimPaceSeconds: 0,
    
        init() {
            this.swimTimesCommonDistances = this.prepareSwimTimes()
        },
    
        prepareSwimTimes() {
            const swimTimes = []
        
            for (let distance = 25; distance <= 800; distance *= 2) {
                swimTimes.push({
                    distance,
                    distanceUnit: 'm',
                    time: 0
                })
            }
        
            swimTimes.push(
                {
                    distance: 1500,
                    distanceUnit: 'm',
                    time: 0
                },
                {
                    distance: 5000,
                    distanceUnit: 'm',
                    time: 0
                }
            )
        
            return swimTimes
        },
    
        calculateSwimTimesByPace() {
            const minutesInput = parseInt(this.swimPaceMinutes)
            const secondsInput = parseInt(this.swimPaceSeconds)
            const seconds = minutesInput * 60 + secondsInput
        
            this.swimTimesCommonDistances.forEach(swimTime => {
                const resultInSeconds = seconds / 100 * distanceInMeters(swimTime.distance, swimTime.distanceUnit)

                const swimTimeHours = Math.floor(resultInSeconds / 3600)
                const swimTimeMinutes = Math.floor(resultInSeconds % 3600 / 60)
                const swimTimeSeconds = Math.floor(resultInSeconds % 3600 % 60)
                swimTime.time = formatTime(swimTimeHours, swimTimeMinutes, swimTimeSeconds)
            });
        },
    }))
})

function distanceInMeters(distance, distanceUnit) {
    return distanceUnit == 'km' ? distance * 1000 : distance
}

function formatTime(hours, minutes, seconds) {
    return `${formatTimeElement(hours)}:${formatTimeElement(minutes)}:${formatTimeElement(seconds)}`
}

function formatTimeElement(timeElement) {
    return timeElement < 10 ? `0${timeElement}` : timeElement
}
