import ProgressBlock from "../progress-module/ProgressBlock.js"

document.addEventListener('DOMContentLoaded', () => {
    const progressNode = document.getElementById('place-for-progress-bar')
    const progress = new ProgressBlock(progressNode)

    const inputNormal = document.getElementById('input-value')
    const inputAnimdated = document.getElementById('check-animate')
    const inputHidden = document.getElementById('check-hide')

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
})
