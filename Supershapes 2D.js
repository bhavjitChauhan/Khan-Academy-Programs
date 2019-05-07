//GUI {
var config = {
    audioFeedback: null,
    animationStep: 0.2,
    font: createFont("sans-serif", 16),
    strokeWeight: 2,
    fill: {
        accent: color(0, 111, 222),
        disabled: color(175),
        gradient: true
    },
    shadow: {
        min: 20,
        max: 23,
        size: 0.9,
        fill: color(0, 0, 0, 3)
    },
    gradient: {
        startColor: color(255, 255, 255, 50),
        stopColor: color(255, 255, 255, 0),
        size: 25
    }
};
config.slider = {
    w: 125,
    r: 10,
    max: 100
};
config.checkbox = {
    w: 20,
    h: 20,
    r: 5
};
//Element {
var Element = function(params) {
    this.label = params.label;
    this.shape = params.shape;
    this.x = params.x;
    this.y = params.y;
    this.w = params.w;
    this.h = params.h;
    this.action = params.action;
    
    this.x2 = this.x + this.w / 2;
    this.y2 = this.y + this.h / 2;
    this.x3 = this.x + this.w;
    this.y3 = this.y + this.h;
    this.r = params.r;
    this.cursor = "DEFAULT";
    
    this.selected = false;
    this.transition = 0;
};
Element.prototype.disable = function() {
    this.disabled = true;
    this.color = this.fill;
    this.fill = config.fill.disabled;
};
Element.prototype.enable = function() {
    this.disabled = false;
    this.fill = this.color;
};
Element.prototype.drawShadow = function(args) {
    if(this.disabled) {
        return;   
    }
    pushStyle();
    stroke(config.shadow.fill);
    noFill();
    for(var i = 0; i < map(this.transition, 0, 1, config.shadow.min, config.shadow.max); i++) {
        strokeWeight(sin(i) * i);
        if(this.shape === rect) {
            (this.shape)(this.x + 1, this.y + 1.5, this.w - 2, this.h, this.r);
        } else {
            ellipseMode(CORNER);
            (this.shape).apply(this, args);
        }
    }
    popStyle();
};
Element.prototype.drawGradient = function() {
    if(!config.fill.gradient || this.disabled) {
        return;
    }
    strokeWeight(1);
    if(this.shape === rect) {
        pushStyle();
        for(var i = 0; i < config.gradient.size; i ++) {
            stroke(lerpColor(config.gradient.startColor, config.gradient.stopColor, map(i, 0, config.gradient.size, 0, 1)));
            line(this.x, this.y + i, this.x2 + this.w / 2, this.y + i);
        }
        popStyle();
    } else {
        println("Only rect gradients are avalible.");
        noLoop();
    }
};
Element.prototype.animate = function() {
    if(this.selected || this.disabled) {
        this.transition -= 0.5;
    } else if(this.mouseOver()) {
        this.transition += config.animationStep;
        if(this.cursor !== "POINTER") {
             this.cursor = "POINTER";
             cursor(this.cursor);
        }
    } else {
        this.transition -= config.animationStep;
        if(this.cursor !== "DEFAULT") {
             this.cursor = "DEFAULT";
             cursor(this.cursor);
        }
    }
    this.transition = constrain(this.transition, 0, 1);
};
Element.prototype.mouseOver = function() {
    return this.shape === rect ? mouseX >= this.x && mouseX <= this.x3 && mouseY >= this.y && mouseY <= this.y3 : dist(mouseX, mouseY, this.thumb.x, this.thumb.y) < this.r;
};
Element.prototype.mousePressed = function() {
    if(this.mouseOver() && !this.disabled) {
        this.selected = true;
    }
};
Element.prototype.mouseReleased = function() {
    if(this.mouseOver() && this.selected && !this.disabled) {
        try {
            this.toggled = this.toggled ? false : true;
        } catch(error) {
            
        }
        this.action();
        try {
            playSound(config.audioFeedback);
        } catch(error) {
            
        }
    }
    this.selected = false;
};
//}
//Slider {
var Slider = function(params) {
    this.init = function() {
        params.shape = ellipse;
        params.x = this.x || params.x || 0;
        params.y = this.y || params.y || 0;
        params.w = params.w || config.slider.w;
        params.h = config.slider.r * 2;
        params.r = config.slider.r;
        params.action = params.action || function() {};
        Element.call(this, params);
        this.disabled = this.disabled || params.disabled;
        this.value = this.value || params.value || 0;
        this.min = params.min || 0;
        this.max = params.max || config.slider.max;
        this.thumb = {
            x: map(this.value, this.min, this.max, this.x + this.r, this.x3 - this.r),
            y: this.y + this.r
        };
        this.fill = this.disabled ? config.fill.disabled : (this.fill || params.fill || color(255));
    };
    this.init();
};
Slider.prototype = Object.create(Element.prototype);
Slider.prototype.draw = function() {
    pushStyle();
    stroke(config.fill.disabled);
    strokeWeight(config.strokeWeight);
    line(this.x + 1, this.y2, this.x3 - 1, this.y2);
    stroke(!this.disabled ? config.fill.accent : config.fill.disabled);
    strokeCap(SQUARE);
    line(this.x + 1, this.y2, map(this.thumb.x, this.x + this.r, this.x3 - this.r, this.x, this.x3) - 1, this.y2);
    this.drawShadow([this.thumb.x - this.r + 1, this.thumb.y - this.r + 1.5, this.r * 2 - 1, this.r * 2 - 1]);
    stroke(!this.disabled ? lerpColor(color(255), color(0), 0.1) : lerpColor(config.fill.disabled, color(0), 0.1));
    fill(lerpColor(this.fill, color(0), this.transition / 50));
    ellipseMode(CENTER);
    (this.shape)(this.thumb.x, this.thumb.y, this.r * 2 * (this.transition / 10 + 1), this.r * 2 * (this.transition / 10 + 1));
    this.animate();
    popStyle();
};
Slider.prototype.mouseDragged = function() {
    if(this.selected) {
        this.thumb.x = constrain(mouseX, this.x + this.r, this.x3 - this.r);
        this.value = map(this.thumb.x, this.x + this.r, this.x3 - this.r, this.min, this.max);
        this.action();
    }
};
Slider.prototype.mouseReleased = function() {
    this.selected = false;
};
//}
//Checkbox {
var Checkbox = function(params) {
    this.init = function() {
        params.shape = rect;
        params.x = this.x || params.x || 0;
        params.y = this.y || params.y || 0;
        params.w = config.checkbox.w;
        params.h = config.checkbox.h;
        params.r = config.checkbox.r;
        params.action = params.action || function() {};
        Element.call(this, params);
        this.disabled = this.disabled || params.disabled;
        this.toggled = this.toggled || params.toggled || false;
        this.fill = this.disabled ? config.fill.disabled : (this.fill || params.fill || config.fill.accent);
    };
    this.init();
};
Checkbox.prototype = Object.create(Element.prototype);
Checkbox.prototype.draw = function() {
    pushStyle();
    strokeWeight(config.strokeWeight);
    if(this.disabled) {
        stroke(lerpColor(config.fill.disabled, color(0), 0.1));
        fill(config.fill.disabled);
    } else if(this.toggled) {
        stroke(this.fill);
    fill(lerpColor(this.fill, color(255), this.transition / 10));
    } else if(!this.toggled) {
        stroke(lerpColor(color(250), color(0), 0.4));
        fill(lerpColor(color(250), color(0), this.transition / 10));
    }
    (this.shape)(this.x, this.y, this.w, this.h, this.r);
        this.drawGradient();
    if(this.toggled) {
        strokeCap(SQUARE);
        strokeWeight(2.5);
        stroke(255);
        line(this.x + 5, this.y2 + 1, this.x2 - 1, this.y3 - 4);
        line(this.x2 - 1, this.y3 - 4, this.x3 - 5, this.y + 5);
    }
    this.animate();
    popStyle();
};
//}
//Checklist {
var Checklist = function(params) {
    params.x = this.x || params.x || 0;
    params.y = this.y || params.y || 0;
    params.action = params.action || function() {};
    Element.call(this, params);
    this.options = params.options || {};
    this.elements = [];
    for(var i = 0; i < this.options.length; i++) {
        this.elements.push(new Checkbox({
            x: this.x,
            y: this.y + i * (config.checkbox.h + this.options.length + 5),
            toggled: this.options[i][1]
        }));
    }
};
Checklist.prototype.draw = function() {
    for(var i = 0; i < this.options.length; i++) {
        fill(0);
        textAlign(LEFT, CENTER);
        textFont(config.font);
        text(this.options[i][0], this.x + config.checkbox.w + 5, this.elements[i].y + config.checkbox.h / 2);
        this.elements[i].draw();
    }
};
Checklist.prototype.mousePressed = function() {
    for(var i = 0; i < this.elements.length; i++) {
        this.elements[i].mousePressed();   
    }
};
Checklist.prototype.mouseReleased = function() {
    for(var i = 0; i < this.elements.length; i++) {
        this.elements[i].mouseReleased();
        this.options[i][1] = this.elements[i].toggled; 
    }
    this.action();
};
//}
//}

var rainbow = false;
var dots = 500;
var animated = false;
var transition = 0;
var weight = 5;
var r = function(theta, a, b, m, n1, n2, n3) {
    return pow(pow(abs(cos(m * theta / 4) / a), n2) + pow(abs(sin(m * theta / 4) / b), n3), -1 / n1);
};
var a = 4,
    b = 2,
    m = 20,
    n1 = 2,
    n2 = 1,
    n3 = 2;

var aSlider = new Slider({
    x: 440,
    y: 10,
    value: a,
    min: 0,
    max: 20,
    action: function() {
        a = this.value;
    }
});
var bSlider = new Slider({
    x: 440,
    y: 40,
    value: b,
    min: 1,
    max: 5,
    action: function() {
        b = this.value;   
    }
});
var mSlider = new Slider({
    x: 440,
    y: 70,
    value: m, 
    min: 0,
    max: 50,
    action: function() {
        m = this.value;   
    }
});
var n1Slider = new Slider({
    x: 440,
    y: 100,
    value: n1,
    min: 1,
    max: 15,
    action: function() {
        n1 = this.value;   
    }
});
var n2Slider = new Slider({
    x: 440,
    y: 130,
    value: n2,
    min: -1.5,
    max: 2,
    action: function() {
        n2 = this.value;   
    }
});
var n3Slider = new Slider({
    x: 440,
    y: 160,
    value: n3,
    min: -1,
    max: 4,
    action: function() {
        n3 = this.value;   
    }
});
var dotSlider = new Slider({
    x: 440,
    y: 300,
    w: 140,
    value: dots,
    min: 1,
    max: 2000,
    action: function() {
        dots = this.value;   
    }
});
if(!rainbow) {
    dotSlider.disable();   
}
var weightSlider = new Slider({
    x: 415,
    y: 370,
    w: 165,
    value: weight,
    min: 1,
    max: 30,
    action: function() {
        weight = this.value;   
    }
});
var sliders = [aSlider, bSlider, mSlider, n1Slider, n2Slider, n3Slider, dotSlider, weightSlider];

var animateCheckbox = new Checkbox({
    x: 410,
    y: 210,
    toggled: animated,
    action: function() {
        animated = this.toggled;
        if(this.toggled) {
            n1Slider.disable();
            n2Slider.disable();
            n3Slider.disable();   
        } else {
            n1Slider.enable();
            n2Slider.enable();
            n3Slider.enable();  
        }
    }
});
var rainbowCheckbox = new Checkbox({
    x: 410,
    y: 245,
    toggled: rainbow,
    action: function() {
        rainbow = this.toggled;
        if(!this.toggled) {
            dotSlider.disable(); 
        } else {
            dotSlider.enable();
        }
    }
});

draw = function() {
    angleMode = radians;
    translate(400 / 2, height / 2);
    colorMode(HSB);
    background(0);
    strokeWeight(weight);
    noFill();
    beginShape();
    for(var theta = 0; theta <= PI * 2; theta += rainbow ? (PI * 2 / dots) : (0.01)) {
        var rad = r(theta,
        a, //a
        b, //b
        m,//m
        animated ? sin(transition) + n1 : n1, //n1
        animated ? sin(transition) + n2 : n2, //n2
        animated ? sin(transition) + n3 : n3);//n3
        var x = rad * cos(theta) * 50;
        var y = rad * sin(theta) * 50;
        if(rainbow) {
            stroke(map(theta, 0, PI * 2, 0, 255), 255, 255);
            point(x, y);
        } else {
            stroke(255);
            vertex(x, y);
        }
    }
    endShape();
    transition += 0.1;
    resetMatrix();
    colorMode(RGB);
    noStroke();
    fill(255, 255, 255, 200);
    rect(width - 210, 0, 210, height);
    fill(0);
    textAlign(RIGHT);
    textFont(createFont("Times"), 20);
    text("a", width - 175, 25);
    text("b", width - 175, 55);
    text("m", width - 175, 85);
    text("n1", width - 175, 115);
    text("n2", width - 175, 145);
    text("n3", width - 175, 175);
    textFont(config.font);
    text(round(a), width - 10, 25);
    text(round(b), width - 10, 55);
    text(round(m), width - 10, 85);
    text(round(n1), width - 10, 115);
    text(round(n2), width - 10, 145);
    text(round(n3), width - 10, 175);
    for(var i = 0; i < sliders.length; i++) {
        sliders[i].draw();
    }
    animateCheckbox.draw();
    rainbowCheckbox.draw();
    fill(0);
    textAlign(LEFT);
    text("Animate", 440, 225);
    text("Rainbow", 440, 260);
    text("Stroke", 415, 360);
    textAlign(RIGHT);
    text(round(weight), 580, 360);
    textAlign(LEFT);
    textSize(14);
    text("Dots", 440, 290);
    textAlign(RIGHT);
    text(round(dots), 580, 290);
    if(animated) {
        n1Slider.value = constrain(sin(transition) + n1, n1Slider.min, n1Slider.max);
        n2Slider.value = constrain(sin(transition) + n2, n2Slider.min, n2Slider.max);
        n3Slider.value = constrain(sin(transition) + n3, n3Slider.min, n3Slider.max);
        n1Slider.init();
        n2Slider.init();
        n3Slider.init();
    }
    strokeWeight(1);
    stroke(0, 0, 0, 20);
    line(390, 195, 600, 195);
    line(390, 330, 600, 330);
    fill(255, 225, 0);
    textAlign(LEFT, TOP);
    text(this.__frameRate.toFixed(2), 0, 0);
};
mousePressed = function() {
    for(var i = 0; i < sliders.length; i++) {
        sliders[i].mousePressed();
    }
    animateCheckbox.mousePressed();
    rainbowCheckbox.mousePressed();
};
mouseReleased = function() {
    for(var i = 0; i < sliders.length; i++) {
        sliders[i].mouseReleased();
    }
    animateCheckbox.mouseReleased();
    rainbowCheckbox.mouseReleased();
};
mouseDragged = function() {
    for(var i = 0; i < sliders.length; i++) {
        sliders[i].mouseDragged();
    }  
};
