'use strict'
const forcePointSize = 10;
const width = 500;
const height = 500;
const pointCountX = 10;
const pointCountY = 10;
const stepX = width / (pointCountX - 1);
const stepY = width / (pointCountY - 1);
class Flow {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rad = Math.atan(y/x);
        this.degree = 180 * this.rad / Math.PI;
        this.length = Math.sqrt(x*x + y*y);
        this._createEl();
    }
    _createEl() {
        const el = document.createElement('DIV');
        el.style.position = 'absolute';
        el.style.width = this.length + 'px';
        el.style.height = '2px';
        el.style.background = 'green';
        el.style.transformOrigin = 'left center';
        el.style.transform = `rotate(${this.degree}deg)`;
        this.el = el;
    }
    setPosition(x, y) {
        this.position = {x,y}
        this.el.style.left = x + 'px';
        this.el.style.top = y + 'px';
    }
}
class ForcePoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.active = false;
        this.position = {
            x:  stepX * this.x,
            y: stepY * this.y,
        }
        this._createEl();
        this._createFlow();
    }
    _createEl() {
        const $point = document.createElement('DIV');
        $point.className = 'force-point';
        $point.style.left = this.position.x - forcePointSize/2 + 'px'
        $point.style.top = this.position.y - forcePointSize/2 + 'px';
        $point.style.width = forcePointSize + 'px';
        $point.style.height = forcePointSize + 'px';
        this.el = $point;
        this._listenClick();
    }
    _createFlow() {
        this.flow = new Flow(30, 30);
        this.flow.setPosition(this.position.x, this.position.y);
    }
    _listenClick() {
        let _this = this;
        this.el.addEventListener('click', function(e) {
            console.log('click');
            _this.active = !_this.active;
            _this._updateUI();
        });
    }
    _updateUI() {
        if(!this.active) {
            this.el.classList.remove('active')
        } else {
            this.el.classList.add('active')
        }
    }
}
;(function() {
    setupField();
})();

function setupField() {

    const $field = document.getElementById('field');
    $field.style.width = width + 'px';
    $field.style.height = height + 'px';


    const $points = [];

    for(let x = 0; x < pointCountX; x++) {
        for(let y = 0; y < pointCountY; y++) {
            let forcePoint = new ForcePoint(x, y);
            $points.push(forcePoint);
            $field.append(forcePoint.el);
            $field.append(forcePoint.flow.el);
        }
    }
}

