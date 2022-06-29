const formatTime = (time = 0) => time < 10 ? "0" + time : time 

const getLaunchDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 8) // 8
    date.setHours(date.getHours() + 14) // 14
    date.setMinutes(date.getMinutes() + 47) // 47
    date.setSeconds(date.getSeconds() + 5)
    return date.getTime()
}

const getTimeLeft = () => {

    const now = new Date().getTime()
    let millisecondsLeft = launchDate - now

    const timeLeft = [
        {
            name: "days",
            value: Math.floor(millisecondsLeft / (1000 * 60 * 60 * 24)),
        },
        {
            name: "hours",
            value: Math.floor((millisecondsLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        },
        {
            name: "minutes",
            value: Math.floor((millisecondsLeft % (1000 * 60 * 60)) / (1000 * 60)),
        },
        {
            name: "seconds",
            value: Math.floor((millisecondsLeft % (1000 * 60)) / 1000),
        }
    ]
    
    const finishedCountdown = !timeLeft.some(time => time.value > 0);

    if (finishedCountdown) clearInterval(countdown)

    return timeLeft

}

const updateTimer = () => {

    const timer = document.querySelector("#timer")
    const timeLeft = getTimeLeft()

    timer.innerHTML = timeLeft.reduce((acc, curr) => {
        acc.push(`
            <div class="time-box flex flex-column">
                <p class="time-name text">${curr.name}</p>
                <p class="time-value">${formatTime(curr.value)}</p>
            </div>
        `)
        return acc
    }, []).join('<span class="time-value time-divider">:</span>')

}

const launchDate = getLaunchDate();
const countdown = setInterval(updateTimer, 1000, launchDate)

updateTimer(launchDate)