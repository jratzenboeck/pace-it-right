
document.addEventListener('alpine:init', () => {
    Alpine.data('swim', () => ({
        swimTimesCommonDistances: [],
        swimTimesTriathlon: [],
        swimPaceMinutes: 0,
        swimPaceSeconds: 0,
        customSwimDistanceInMeters: 0,
        customSwimTime: 0,
        swimDistanceInputInMeters: 0,
        swimTimeInputInMinutes: 0,
        swimTimeInputInSeconds: 0,

        init() {
            this.prepareSwimTimesForCommonDistances()
            this.prepareSwimTimesForTriathlon()
        },

        prepareSwimTimesForCommonDistances() {
            for (let distance = 25; distance <= 800; distance *= 2) {
                this.swimTimesCommonDistances.push({
                    distance,
                    distanceUnit: 'm',
                    time: 0
                })
            }

            this.swimTimesCommonDistances.push(
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
        },

        prepareSwimTimesForTriathlon() {
            this.swimTimesTriathlon.push({
                distance: 750,
                distanceUnit: 'm',
                distanceLabel: '(Sprintdistanz)',
                time: 0
            },
                {
                    distance: 1.5,
                    distanceUnit: 'km',
                    distanceLabel: '(Olympische Distanz)',
                    time: 0
                },
                {
                    distance: 1.9,
                    distanceUnit: 'km',
                    distanceLabel: '(Mitteldistanz)',
                    time: 0
                },
                {
                    distance: 3.8,
                    distanceUnit: 'km',
                    distanceLabel: '(Langdistanz)',
                    time: 0
                })
        },

        calculateSwimTimesByPace() {
            const minutesInput = parseInt(this.swimPaceMinutes)
            const secondsInput = parseInt(this.swimPaceSeconds)
            const seconds = minutesInput * 60 + secondsInput

            this.swimTimesCommonDistances.forEach(swimTime => {
                swimTime.time = calculateSwimTime(seconds, swimTime.distance, swimTime.distanceUnit)
            });
            this.swimTimesTriathlon.forEach(swimTime => {
                swimTime.time = calculateSwimTime(seconds, swimTime.distance, swimTime.distanceUnit)
            });
            this.customSwimTime = calculateSwimTime(seconds, this.customSwimDistanceInMeters, 'm')
        },

        calculateSwimTimesByDistanceAndTime() {
            const minutesInput = parseInt(this.swimTimeInputInMinutes)
            const secondsInput = parseInt(this.swimTimeInputInSeconds)
            const seconds = minutesInput * 60 + secondsInput
            const pacePer100InSeconds = (100 / parseInt(this.swimDistanceInputInMeters)) * seconds

            this.swimTimesCommonDistances.forEach(swimTime => {
                swimTime.time = calculateSwimTime(pacePer100InSeconds, swimTime.distance, swimTime.distanceUnit)
            });
            this.swimTimesTriathlon.forEach(swimTime => {
                swimTime.time = calculateSwimTime(pacePer100InSeconds, swimTime.distance, swimTime.distanceUnit)
            });
            this.customSwimTime = calculateSwimTime(pacePer100InSeconds, this.customSwimDistanceInMeters, 'm')
        }
    }))
})

function calculateSwimTime(secondsInput, distance, distanceUnit) {
    const resultInSeconds = secondsInput / 100 * distanceInMeters(distance, distanceUnit)

    const swimTimeHours = Math.floor(resultInSeconds / 3600)
    const swimTimeMinutes = Math.floor(resultInSeconds % 3600 / 60)
    const swimTimeSeconds = Math.floor(resultInSeconds % 3600 % 60)

    return formatTime(swimTimeHours, swimTimeMinutes, swimTimeSeconds)
}

function distanceInMeters(distance, distanceUnit) {
    return distanceUnit == 'km' ? distance * 1000 : distance
}

function formatTime(hours, minutes, seconds) {
    return `${formatTimeElement(hours)}:${formatTimeElement(minutes)}:${formatTimeElement(seconds)}`
}

function formatTimeElement(timeElement) {
    return timeElement < 10 ? `0${timeElement}` : timeElement
}
