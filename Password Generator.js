//GUI {
var config = {
    audioFeedback: null,
    animationStep: 0.2,
    font: createFont("sans-serif", 16),
    strokeWeight: 2,
    fill: {
        accent: color(255, 145, 0),
        disabled: color(175),
        gradient: true
    },
    shadow: {
        min: 25,
        max: 28,
        size: 0.9,
        fill: color(0, 0, 0, 3)
    },
    gradient: {
        startColor: color(255, 255, 255, 50),
        stopColor: color(255, 255, 255, 0),
        size: 25
    }
};
config.button = {
    w: 75,
    h: 30,
    r: 5
};
config.slider = {
    w: 100,
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
//Button {
var Button = function(params) {
    this.init = function() {
        params.label = this.label || params.label || "";
        params.shape = rect;
        params.x = this.x || params.x || 0;
        params.y = this.y || params.y || 0;
        textFont(config.font);
        params.w = max(textWidth(params.label) + 40, config.button.w);
        params.h = params.h || config.button.h;
        params.r = config.button.r;
        params.action = params.action || function() {};
        Element.call(this, params);
        this.disabled = this.disabled || params.disabled;
        this.fill = this.disabled ? config.fill.disabled : (this.fill || params.fill || config.fill.accent);
    };
    this.init();
};
Button.prototype = Object.create(Element.prototype);
Button.prototype.draw = function() {
    pushStyle();
    rectMode(LEFT);
    ellipseMode(CORNER);
    this.drawShadow();
    strokeWeight(config.strokeWeight);
    stroke(this.disabled ? lerpColor(config.fill.disabled, color(0), 0.1) : this.fill);
    fill(lerpColor(this.fill, color(255), this.transition / 10));
    (this.shape)(this.x, this.y, this.w, this.h, this.r);
    this.drawGradient();
    textAlign(CENTER, CENTER);
    textFont(config.font);
    fill(255);
    text(this.label, this.x2, this.y2);
    this.animate();
    popStyle();
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
        fill(255);
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
var options = {
    passLength: 15,
    numeric: true,
    alphabetic: true,
    mixedCase: true,
    symbols: false
};
var numbersList = "0123456789";
var lettersList = "abcdefghijklmnopqrstuvwxyz";
var symbolsList = "!\";#$%&'()*+,-./:;<=>?@[]^_`{|}~\\";
var generatePassword = function() {
    var passLength = options.passLength,
        numeric = options.numeric,
        alphabetic = options.alphabetic,
        mixedCase = options.mixedCase,
        symbols = options.symbols;
    
    var possible = (numeric ? numbersList : "") + 
        (alphabetic ? lettersList : "") + 
        (alphabetic && mixedCase ? lettersList.toUpperCase() : "") + 
        (symbols ? symbolsList : "");
    var password = "";
    for (var i = 0; i < passLength; i++) {
        password += possible[floor(random() * possible.length)];
    }
    if(password.search("undefined") !== -1) {
        return "";
    }
    return password;
};
var password = generatePassword();
var passScore = function(password) {
    if(password.length > 50) {
        return 10;   
    }
    if(password === "") {
        return 0;
    }
    var score = 10;
    var tests = {
        numerical: /\d/.test(password),
        lowercases: /[a-z]/.test(password),
        uppercases: /[A-Z]/.test(password),
        symbols: /\W/.test(password),  
    };
    for(var test in tests) {
        score -= !tests[test] && 1;
    }
    score *= password.length * 0.07;
    return constrain(score, 0, 10);
};
var lengthSlider = new Slider({
    x: 30,
    y: 90,
    w: 340,
    min: 1,
    max: 100,
    value: options.passLength,
    action: function() {
        options.passLength = this.value;
    }  
});
var generateButton = new Button({
    label: "Generate",
    x: 25,
    y: 280,
    action: function() {
        var pass = generatePassword();
        password = pass;
        println("\n\n\n\n" + pass + "");
    }
});
var optionSelect = new Checklist({
    x: 30,
    y: 125,
    options: [
        ["Numeric", true],
        ["Alphabetic", true],
        ["Mixed Case", true],
        ["Symbols", false],
    ],
    action: function() {
        options.numeric = this.options[0][1];
        options.alphabetic = this.options[1][1];
        options.mixedCase = this.options[2][1];
        options.symbols = this.options[3][1];
    }
});
draw = function() {
    background(30);
    fill(255);
    textFont(config.font);
    textAlign(LEFT, TOP);
    text("Password Length", 30, 60);
    textAlign(RIGHT, TOP);
    text(round(lengthSlider.value), 370, 60);
    lengthSlider.draw();
    optionSelect.draw();
    generateButton.draw();
    fill(255, 255, 255, 25);
    arc(250, 150, 100, 100, 180, 360);
    if(passScore(password) === 0) {
        noFill();
    } else if(passScore(password) <= 3) {
        fill(255, 0, 0);
        stroke(150, 0, 0);
    } else if(passScore(password) <= 7) {
        fill(255, 255, 0);
        stroke(150, 150, 0);
    } else {
        fill(0, 255, 0);
        stroke(0, 150, 0);
    }
    strokeWeight(5);
    strokeCap(SQUARE);
    arc(250, 150, 100, 100, 180, map(passScore(password), 0, 10, 180, 360));
    fill(255);
    text("SCORE", 270, 215);
    noStroke();
    fill(222);
    rect(175, 280, 190, 30);
    fill(0);
    textFont(createFont("monospace", 15));
    textAlign(CENTER, CENTER);
    if(password.length > 20) {
        text(password.substring(0, 17) + "...", 265, 295);
    } else {
        text(password, 265, 295);   
    }
};
println("\n\n\n" + password);

mousePressed = function() {
    generateButton.mousePressed();
    optionSelect.mousePressed();
    lengthSlider.mousePressed();
};
mouseReleased = function() {
    generateButton.mouseReleased();
    optionSelect.mouseReleased();
    lengthSlider.mouseReleased();
};
mouseDragged = function() {
    lengthSlider.mouseDragged();
};
