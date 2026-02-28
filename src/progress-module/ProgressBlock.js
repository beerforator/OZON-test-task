export default class ProgressBlock {
    constructor(container) {
        if (!container) throw newError('')

        this.container = container

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
        this.container.innerHTML = `
            <div class="progress-block">
                <svg class="progress-block-svg" viewbox="0 0 100 100">
                    <circle 
                        class="progress-bar-bckgrnd" 
                        r="${this.params.radius}" 
                        cx="${this.params.center}" 
                        cy="${this.params.center}" 
                    />    
                    <circle 
                        class="progress-bar" 
                        r="${this.params.radius}" 
                        cx="${this.params.center}" 
                        cy="${this.params.center}" 
                        stroke-dashoffset="${this.len}"
                        stroke-dasharray="${this.len}"
                    />
                </svg>
            </div>
        `;
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
        this.nodes.root.classList.toggle('progress-block--hidden', this.state.isHidden)
    }
}