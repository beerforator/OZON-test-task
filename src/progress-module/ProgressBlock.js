export default class ProgressBlock {
    constructor(container, options = {}) {
        if (!container) throw newError('')

        this.container = container

        this.size = options.size || 140

        this.state = {
            percent: 0,
            isAnimated: false,
            isHidden: false
        }

        this.nodes = {}
        this.params = { radius: 44, center: 50 }
        this.len = 2 * Math.PI * this.params.radius
        this._init()
    }

    _init() {
        this._render()
        this._cacheNodes()
    }

    _render() {
        this.container.style.width = this.size + 'px'
        this.container.style.height = this.size + 'px'

        const wrapper = document.createElement('div')
        wrapper.classList.add('progress-block')

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.classList.add("progress-block-svg")
        svg.setAttribute("viewBox", "0 0 100 100")

        const bckgrnd_circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        bckgrnd_circle.classList.add('progress-bar-bckgrnd')
        bckgrnd_circle.setAttribute("cx", this.params.center)
        bckgrnd_circle.setAttribute("cy", this.params.center)
        bckgrnd_circle.setAttribute("r", this.params.radius)

        const bar_circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        bar_circle.classList.add('progress-bar')
        bar_circle.setAttribute("cx", this.params.center)
        bar_circle.setAttribute("cy", this.params.center)
        bar_circle.setAttribute("r", this.params.radius)
        bar_circle.setAttribute("stroke-dashoffset", this.len)
        bar_circle.setAttribute("stroke-dasharray", this.len)

        svg.appendChild(bckgrnd_circle)
        svg.appendChild(bar_circle)
        wrapper.appendChild(svg)

        this.container.innerHTML = ''
        this.container.appendChild(wrapper)
    }

    _cacheNodes() {
        this.nodes.root = this.container.querySelector('.progress-block')
        this.nodes.bar = this.container.querySelector('.progress-bar')
    }

    _updateArc() {
        if (!this.nodes.bar) return

        const offset = this.len - (this.len * (this.state.percent / 100))
        this.nodes.bar.style.strokeDashoffset = offset
    }

    setPercent(percent) {
        const numericPercent = parseFloat(percent) || 0
        const trimmedPercent = Math.max(0, Math.min(100, numericPercent))
        this.state.percent = trimmedPercent
        this._updateArc()
    }

    setAnimation(isAnimated) {
        this.state.isAnimated = !!isAnimated
        this.nodes.root.classList.toggle('progress-block--animated', this.state.isAnimated)
    }

    setHidden(isHidden) {
        this.state.isHidden = !!isHidden
        // this.nodes.root.classList.toggle('progress-block--hidden', this.state.isHidden)
        this.container.classList.toggle('progress-block--hidden', this.state.isHidden);
    }
}