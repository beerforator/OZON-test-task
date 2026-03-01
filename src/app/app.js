import ProgressBlock from "../progress-module/ProgressBlock.js"

const progressNode = document.getElementById('place-for-progress-bar')
const progress = new ProgressBlock(progressNode, { size: 140 })

const inputNormal = document.getElementById('input-value')
const inputAnimdated = document.getElementById('check-animate')
const inputHidden = document.getElementById('check-hide')

let simInterval = null

function startSimulation() {
    let current = 0

    progress.setAnimation(true)
    inputAnimdated.checked = true

    simInterval = setInterval(() => {
        current += 1

        inputNormal.value = current
        progress.setPercent(current)

        if (current >= 100) stopSimulation()
    }, 50)
}

function stopSimulation() {
    clearInterval(simInterval)
    simInterval = null
    inputAnimdated.checked = false

    setTimeout(() => progress.setAnimation(false), 300)
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (document.activeElement === inputNormal) return

        e.preventDefault()

        if (simInterval) {
            stopSimulation()
        } else {
            startSimulation()
        }
    }
})

inputNormal.addEventListener('input', (e) => {
    let percent = e.target.value
    if (percent > 100) {
        percent = 100
        e.target.value = 100
    } else if (percent < 0 && percent !== "") {
        percent = 0
        e.target.value = 0
    }

    progress.setPercent(percent)
})

inputAnimdated.addEventListener('input', (e) => {
    progress.setAnimation(e.target.checked)
})

inputHidden.addEventListener('input', (e) => {
    progress.setHidden(e.target.checked)
})

