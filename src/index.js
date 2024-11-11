
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

        reset() {
            this.swimTimesCommonDistances.forEach(swimTime => swimTime.time = 0)
            this.swimTimesTriathlon.forEach(swimTime => swimTime.time = 0)
            this.swimPaceMinutes = 0
            this.swimPaceSeconds = 0
            this.customSwimDistanceInMeters = 0
            this.customSwimTime = 0
            this.swimDistanceInputInMeters = 0
            this.swimTimeInputInMinutes = 0
            this.swimTimeInputInSeconds = 0
        },

        changeInputType(isPaceInput) {
            this.swimPace = isPaceInput
            this.reset()
        },

        prepareSwimTimesForCommonDistances() {
            this.swimTimesCommonDistances = prepareDistances(25, 800)
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
                swimTime.time = calculateTime(seconds, swimTime.distance, swimTime.distanceUnit, 100)
            });
            this.swimTimesTriathlon.forEach(swimTime => {
                swimTime.time = calculateTime(seconds, swimTime.distance, swimTime.distanceUnit, 100)
            });
            this.customSwimTime = calculateTime(seconds, this.customSwimDistanceInMeters, 'm', 100)
        },

        calculateSwimTimesByDistanceAndTime() {
            const minutesInput = parseInt(this.swimTimeInputInMinutes)
            const secondsInput = parseInt(this.swimTimeInputInSeconds)
            const seconds = minutesInput * 60 + secondsInput
            const paceRatio = 100
            const pacePer100InSeconds = (paceRatio / parseInt(this.swimDistanceInputInMeters)) * seconds

            this.swimTimesCommonDistances.forEach(swimTime => {
                swimTime.time = calculateTime(pacePer100InSeconds, swimTime.distance, swimTime.distanceUnit, paceRatio)
            });
            this.swimTimesTriathlon.forEach(swimTime => {
                swimTime.time = calculateTime(pacePer100InSeconds, swimTime.distance, swimTime.distanceUnit, paceRatio)
            });
            this.customSwimTime = calculateTime(pacePer100InSeconds, this.customSwimDistanceInMeters, 'm', paceRatio)
        }
    })),

    Alpine.data('bike', () => ({
        bikeTriathlonDistances: [],
        bikePaceKmPerHour: 0,
        bikeTimeInputInHours: 0,
        bikeTimeInputInMinutes: 0,
        bikeTimeInputInSeconds: 0,
        bikeDistanceInputInKm: 0,
        customBikeDistanceInKm: 0,
        customBikeTime: 0,

        init() {
            this.prepareBikeTimesForTriathlon()
        },

        reset() {
            this.bikeTriathlonDistances.forEach(bikeTime => bikeTime.time = 0)
            this.bikePaceKmPerHour = 0
            this.bikeTimeInputInHours = 0
            this.bikeTimeInputInMinutes = 0
            this.bikeDistanceInputInKm = 0
            this.customBikeDistanceInKm = 0
            this.customBikeTime = 0
        },

        changeInputType(isPaceInput) {
            this.bikePace = isPaceInput
            this.reset()
        },

        prepareBikeTimesForTriathlon() {
            this.bikeTriathlonDistances.push(
            {
                distance: 20,
                distanceUnit: 'km',
                distanceLabel: '(Sprintdistanz)',
                time: 0
            },
            {
                distance: 40,
                distanceUnit: 'km',
                distanceLabel: '(Olympische Distanz)',
                time: 0
            },
            {
                distance: 90,
                distanceUnit: 'km',
                distanceLabel: '(Mitteldistanz)',
                time: 0
            },
            {
                distance: 180,
                distanceUnit: 'km',
                distanceLabel: '(Langdistanz)',
                time: 0
            })
        },

        calculateBikeTimesByPace() {
            const pace = parseFloat(this.bikePaceKmPerHour)

            this.bikeTriathlonDistances.forEach(bikeDistance => {
                bikeDistance.time = calculateTimeSegmentsFromSeconds((bikeDistance.distance / pace) * 3600)
            });
            this.customBikeTime = calculateTimeSegmentsFromSeconds((parseFloat(this.customBikeDistanceInKm) / pace) * 3600)
        },

        calculateBikeTimesByDistanceAndTime() {
            const hoursInput = parseInt(this.bikeTimeInputInHours)
            const minutesInput = parseInt(this.bikeTimeInputInMinutes)
            const secondsInput = parseInt(this.bikeTimeInputInSeconds)
            const seconds = hoursInput * 3600 + minutesInput * 60 + secondsInput

            const bikeDistanceInputInKmParsed = parseFloat(this.bikeDistanceInputInKm)
            this.bikeTriathlonDistances.forEach(bikeDistance => {
                bikeDistance.time = calculateTimeSegmentsFromSeconds((bikeDistance.distance / bikeDistanceInputInKmParsed) * seconds)
            });
            this.customBikeTime = calculateTimeSegmentsFromSeconds((parseFloat(this.customBikeDistanceInKm) / bikeDistanceInputInKmParsed) * seconds)
        }
    })),

    Alpine.data('run', () => ({
        runTimesShortTrack: [],
        runTimesMiddleTrack: [],
        runTimesLongTrack: [],
        runPaceMinutes: 0,
        runPaceSeconds: 0,
        customRunDistanceInMeters: 0,
        customRunTime: 0,
        runDistanceInputInMeters: 0,
        runTimeInputInMinutes: 0,
        runTimeInputInSeconds: 0,

        init() {
            this.prepareRunTimesForShortCourse()
            this.prepareRunTimesForMiddleTrack()
            this.prepareRunTimesForLongTrack()
        },

        changeInputType(isPaceInput) {
            this.runPace = isPaceInput
            this.reset()
        },

        reset() {
            this.runTimesShortTrack.forEach(runTime => runTime.time = 0)
            this.runTimesMiddleTrack.forEach(runTime => runTime.time = 0)
            this.runTimesLongTrack.forEach(runTime => runTime.time = 0)
            this.runPaceMinutes = 0
            this.runPaceSeconds = 0
            this.customRunDistanceInMeters = 0
            this.customRunTime = 0
            this.runDistanceInputInMeters = 0
            this.runTimeInputInMinutes = 0
            this.runTimeInputInSeconds = 0
        },

        prepareRunTimesForShortCourse() {
            this.runTimesShortTrack = prepareDistances(100, 400, 2)
        },

        prepareRunTimesForMiddleTrack() {
            this.runTimesMiddleTrack.push(
                {
                    distance: 800,
                    distanceUnit: 'm',
                    time: 0
                },
                {
                    distance: 1200,
                    distanceUnit: 'm',
                    time: 0
                },
                {
                    distance: 1600,
                    distanceUnit: 'm',
                    time: 0
                })
        },

        prepareRunTimesForLongTrack() {
            this.runTimesLongTrack.push(
                {
                    distance: 2000,
                    distanceUnit: 'm',
                    time: 0
                },
                {
                    distance: 3000,
                    distanceUnit: 'm',
                    time: 0
                },
                {
                    distance: 5000,
                    distanceUnit: 'm',
                    time: 0
                },
                {
                    distance: 10,
                    distanceUnit: 'km',
                    time: 0
                },
                {
                    distance: 21.1,
                    distanceUnit: 'km',
                    distanceLabel: '(Halbmarathon)',
                    time: 0
                },
                {
                    distance: 42.195,
                    distanceUnit: 'km',
                    distanceLabel: '(Marathon)',
                    time: 0
                })
        },

        calculateRunTimesByPace() {
            const minutesInput = parseInt(this.runPaceMinutes)
            const secondsInput = parseInt(this.runPaceSeconds)
            const seconds = minutesInput * 60 + secondsInput
            const ratio = 1000

            this.runTimesShortTrack.forEach(runTime => {
                runTime.time = calculateTime(seconds, runTime.distance, runTime.distanceUnit, ratio)
            });
            this.runTimesMiddleTrack.forEach(runTime => {
                runTime.time = calculateTime(seconds, runTime.distance, runTime.distanceUnit, ratio)
            });
            this.runTimesLongTrack.forEach(runTime => {
                runTime.time = calculateTime(seconds, runTime.distance, runTime.distanceUnit, ratio)
            });
            this.customRunTime = calculateTime(seconds, this.customRunDistanceInMeters, 'm', ratio)
        },

        calculateRunTimesByDistanceAndTime() {
            const minutesInput = parseInt(this.runTimeInputInMinutes)
            const secondsInput = parseInt(this.runTimeInputInSeconds)
            const seconds = minutesInput * 60 + secondsInput
            const ratio = 1000
            const pacePerKmInSeconds = (ratio / parseInt(this.runDistanceInputInMeters)) * seconds

            this.runTimesShortTrack.forEach(runTime => {
                runTime.time = calculateTime(pacePerKmInSeconds, runTime.distance, runTime.distanceUnit, ratio)
            });
            this.runTimesMiddleTrack.forEach(runTime => {
                runTime.time = calculateTime(pacePerKmInSeconds, runTime.distance, runTime.distanceUnit, ratio)
            });
            this.runTimesLongTrack.forEach(runTime => {
                runTime.time = calculateTime(pacePerKmInSeconds, runTime.distance, runTime.distanceUnit, ratio)
            });
            this.customRunTime = calculateTime(pacePerKmInSeconds, this.customRunDistanceInMeters, 'm', ratio)
        }
    }))
})

function prepareDistances(start, end, factor = 2, meters = 'm') {
    const distances = []

    for (let distance = start; distance <= end; distance *= factor) {
        distances.push({
            distance,
            distanceUnit: meters,
            time: 0
        })
    }

    return distances
}

function calculateTime(secondsInput, distance, distanceUnit, paceRatio) {
    const resultInSeconds = secondsInput / paceRatio * distanceInMeters(distance, distanceUnit)

    return calculateTimeSegmentsFromSeconds(resultInSeconds)
}

function calculateTimeSegmentsFromSeconds(seconds) {
    const timeHours = Math.floor(seconds / 3600)
    const timeMinutes = Math.floor(seconds % 3600 / 60)
    const timeSeconds = Math.floor(seconds % 3600 % 60)

    return formatTime(timeHours, timeMinutes, timeSeconds)
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
