/**
 * @CREDITS
 * Inspired by Morolin's GIFs
   https://imgur.com/gallery/voutF
 * Shuffling method by Jeff
   https://stackoverflow.com/a/6274381
 * Algorithms based on pseudocode from Wikipedia.
 * Thanks to everyone that helping find bugs.
 **/
 /**
  * Like or have suggestions for my GUI elements?
  https://www.khanacademy.org/computer-programming/simple-gui-elements-v2/5201788906799104
  **/

//Boring stuff {
var page = "settings";
var textStroke = function(string, x, y, width, height) {
    for(var i = -2; i < 3; i++){
        for(var j = -1; j < 3; j++){
            if(width) {
                text(string, x + i, y + j, width, height);
            } else {
                text(string, x + i, y + j);
            }
        }
        if(width) {
            text(string, x + i, y, width, height);
            text(string, x, y + i, width, height);
        } else {
            text(string, x + i, y);
            text(string, x, y + i);
        }
    }
};
var debugMode = false;
cursor("DEFAULT");
//}
//Sorting stuff {
var uniqueColors = false;
//Creating the arrays
var valuesPerRow = 50;
var values = [];
var i, j, radioOptions;
var method = "bubble";
var combShrinkFactor = 1.22;
//To randomize the array
var shuffleArray = function() {
    for(var i = 0; i < valuesPerRow; i++) {
        var x, y;
        for (var j = values[i].length - 1 ; j > 0; j--) {
            x = floor(random() * (j + 1));
            y = values[i][j];
            values[i][j] = values[i][x];
            values[i][x] = y;
        }
    }
};
//To reverse the array
var reverseArray = function() {
    for(var i = 0; i < valuesPerRow; i++) {
        values[i] = values[i].reverse();
    }
};
    //Sorting Algorithms {
var bubbleSort = function() {
    for(var v = 0; v < values.length; v++) {
        if(values[v][j] > values[v][j + 1]) {
            var temp = values[v][j];
            values[v][j] = values[v][j + 1];
            values[v][j + 1] = temp;
        }
    }
    if(i < valuesPerRow) {
        j++;
        if(j > valuesPerRow) {
            j = 0;
            i++;
        }
    }
};

var shakerSort = function() {
    for(var v = 0; v < valuesPerRow; v++) {
        if(values[v][j] > values[v][j+1]) {
            var temp = values[v][j];
            values[v][j] = values[v][j+1];
            values[v][j+1] = temp;
        }
        if(values[v][valuesPerRow - j - 2] > values[v][valuesPerRow - j - 2+1]) {
            var temp1 = values[v][valuesPerRow - j - 2];
            values[v][valuesPerRow - j - 2] = values[v][valuesPerRow - j - 2+1];
            values[v][valuesPerRow - j - 2+1] = temp1;
        }
    }
    if(i < valuesPerRow / 2) {
        if(j < valuesPerRow - 1) {
            j++;
        } else {
            i++;
            j = 0;
        }
    }
};

var insertionSort = function() {
    for(var v = 0; v < valuesPerRow; v++) {
        if(i[v] < valuesPerRow) {
            if(j[v] > 0 && values[v][j[v] - 1] > values[v][j[v]]) {
                var temp = values[v][j[v]];
                values[v][j[v]] = values[v][j[v] - 1];
                values[v][j[v] - 1] = temp;
                j[v]--;
            } else {
                i[v]++;
                j[v] = i[v];
            }
        }
    }
};

var combSort = function() {
    for(var v = 0; v < valuesPerRow; v++) {
        if(j[v] > 0) {
            if(i[v] + j[v] < valuesPerRow) {
                if (values[v][i[v]] > values[v][i[v] + j[v]]) {
                    var small = values[v][i[v] + j[v]];
                    values[v][i[v] + j[v]] = values[v][i[v]];
                    values[v][i[v]] = small;
                }
                i[v]++;
            } else {
                i[v] = 0;
                j[v] = floor(j[v] / combShrinkFactor);
            }
        }
    }
};

var gaps = [701, 301, 132, 57, 23, 10, 4, 1];
var g = 0;
var shellSort = function() {
    for(var v = 0; v < valuesPerRow; v++) {
        var countOuter = 0;
        var countInner = 0;
        var countSwap = 0;
        
        if(g < gaps.length) {
            var gap = gaps[g];
            if(i[v][g] < values[v].length) {
                countOuter++;
                var temp = values[v][i[v][g]];
                j = i[v][g]; 
                while(j >= gap && values[v][j - gap] > temp) {
                    countInner++;
                    countSwap++;
                    values[v][j] = values[v][j - gap];
                    j -= gap;
                }
                values[v][j] = temp;
                i[v][g]++;
            } else {
                i[v][g] = 0;
                g++;
            }
        }
    }
};
var partition = function(arr, pivot, left, right){
    var pivotValue = arr[pivot],
    partitionIndex = left;
    
    for(var i = left; i < right; i++){
        if(arr[i] < pivotValue){
            var temp = arr[i];
            arr[i] = arr[partitionIndex];
            arr[partitionIndex] = temp;
            partitionIndex++;
        }
    }
    var temp = arr[right];
    arr[right] = arr[partitionIndex];
    arr[partitionIndex] = temp;
    return partitionIndex;
};
var quickSort = function(left, right) {
    var len = values[0].length, 
    pivot,
    partitionIndex;
    if(left < right){
        pivot = right;
        partitionIndex = partition(values[0], pivot, left, right);
    
        //sort left and right
        quickSort(values[0], left, partitionIndex - 1);
        quickSort(values[0], partitionIndex + 1, right);
    }  
};
//}
    //Initializing variables based on sorting method {
var initVariables = function() {
    switch(method) {
        case "bubble":
            i = 0;
            j = 0;
            break;
        case "shaker":
            i = 0;
            j = 0;
            break;
        case "insertion":
            i = [];
            j = [];
            for(var value = 0; value < valuesPerRow; value++) {
                i.push(0);
                j.push(0);
            }
            break;
        case "comb":
            i = [];
            j = [];
            for(var value = 0; value < valuesPerRow; value++) {
                i.push(0);
                j.push(floor(valuesPerRow / combShrinkFactor));
            }
            break;
        case "shell":
            g = 0;
            i = [];
            j = [];
            for(var value = 0; value < valuesPerRow; value++) {
                i.push([701, 301, 132, 57, 23, 10, 4, 1]);
                j.push(0);
            }
            break;
    }
    values = [];
    for(var i = 0; i < valuesPerRow; i++) {
        values.push([]);
        for(var j = 0; j < valuesPerRow; j++) {
            values[i][j] = uniqueColors ? floor(map(values[i].length, 0, valuesPerRow, 0, uniqueColors)) : values[i].length;
        }
    }
    if(radioOptions.random) {
        shuffleArray();
    } else {
        reverseArray();
    }
};
//}
//}
//GUI stuff {
    //Config {
    var config = {
        audioFeedback: null,
        animationStep: 0.2,
        font: createFont("sans-serif", 16),
        strokeWeight: 1,
        symbolWeight: 3,
        fill: {
            accent: color(0, 111, 222),
            outline: color(150),
            background: color(222),
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
        w: 175,
        h: 50,
        r: 5
    };
    config.radiobutton = {
        r: 10
    };
    config.checkbox = {
        w: 20,
        h: 20,
        r: 5
    };
    config.slider = {
        w: 100,
        r: 10,
        max: 100
    };
    config.pane = {
        w: 100,
        h: 125,
        r: 5
    };
    config.dropdown = {
        w: 125,
        h: 25,
        r: 10,
        items: 4
    };
    //}
    //Functions {
    String.prototype.toTitleCase = function(str) {
        return this.replace(/\w\S*/g, function(word) {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
    };
    Array.prototype.except = function(val) {
        return this.filter(function(arr) { return arr !== val; });        
    };
    var inherit = function (subClass, superClass) {
        Object.setPrototypeOf(subClass.prototype, superClass.prototype);
        subClass.prototype.constructor = subClass;
        if (superClass.prototype.constructor === Object) {
            superClass.prototype.constructor = superClass;
        }
    };
    var noop = function() {};
    //}
    //Symbols {
    var symbols = {
        checkmark: function(x, y, scale) {
            scale = scale || 1;
            line(x - (5 * scale), y + (1 * scale), x - (1.75 * scale), y + (5 * scale));
            line(x - (1.75 * scale), y + (5 * scale), x + (5 * scale), y - (5 * scale));
        },
        arrow: function(x, y, scale) {
            scale = scale || 1;
            noFill();
            beginShape();
            vertex(x - (5 * scale), y - (2 * scale));
            vertex(x, y + (3 * scale));
            vertex(x + (5 * scale), y - (2 * scale));
            endShape();
        }
    };
    //}
    //Element {
    var Element = function(params) {
        this.label = params.label;
        this.shape = params.shape;
        this.x = params.x;
        this.y = params.y;
        this.w = params.w || this.shape === ellipse && params.r * 2;
        this.h = params.h || this.shape === ellipse && params.r * 2;
        this.action = params.action;
        
        this.x2 = this.x + this.w / 2;
        this.y2 = this.y + this.h / 2;
        this.x3 = this.x + this.w;
        this.y3 = this.y + this.h;
        this.r = params.r;
        this.cursor = "DEFAULT";
        
        this.selected = false;
        this.focused = false;
        this.transition = 0;
        this.transition2 = 0;
    };
    Element.prototype = {
        disable: function() {
            this.disabled = true;
            this.color = this.fill;
            this.fill = config.fill.disabled;
        },
        enable: function() {
            this.disabled = false;
            this.fill = this.color;
        },
        drawShadow: function(args) {
            if(this.disabled) {
                return;   
            }
            pushStyle();
            stroke(config.shadow.fill);
            noFill();
            for(var i = 0; i < map(this.transition, 0, 1, config.shadow.min, config.shadow.max); i++) {
                strokeWeight(sin(i) * i);
                if(this.shape === rect && !args) {
                    (this.shape)(this.x + 1, this.y + 1, this.w - 2, this.h, this.r);
                } else {
                    ellipseMode(CORNER);
                    (this.shape).apply(this, args);
                }
            }
            popStyle();
        },
        drawGradient: function() {
            if(!config.fill.gradient || this.disabled) {
                return;
            }
            pushStyle();
            strokeWeight(1);
            if(this.shape === rect) {
                for(var i = 0; i < config.gradient.size; i ++) {
                    stroke(lerpColor(config.gradient.startColor, config.gradient.stopColor, map(i, 0, config.gradient.size, 0, 1)));
                    line(this.x, this.y + i, this.x2 + this.w / 2, this.y + i);
                }
            } else {
                println("Only rect gradients are avalible.");
                noLoop();
            }
            popStyle();
        },
        animate: function() {
            if(this.selected || this.disabled) {
                this.transition -= config.animationStep * 2;
                this.transition2 += config.animationStep / 2;
            } else if(this.mouseOver()) {
                this.transition2 -= config.animationStep / 2;
                this.transition += config.animationStep;
                if(this.cursor !== "POINTER" && !this.noCursorChange) {
                     this.cursor = "POINTER";
                     cursor(this.cursor);
                }
            } else {
                this.transition2 -= config.animationStep;
                this.transition -= config.animationStep;
                if(this.cursor !== "DEFAULT" && !this.noCursorChange) {
                     this.cursor = "DEFAULT";
                     cursor(this.cursor);
                }
            }
            this.transition = constrain(this.transition, 0, 1);
            this.transition2 = constrain(this.transition2, 0, 1);
        },
        mouseOver: function() {
            return this.shape === rect ? (mouseX >= this.x && mouseX <= this.x3 && mouseY >= this.y && mouseY <= this.y3) : (dist(mouseX, mouseY, this.thumb ? this.thumb.x : this.x2, this.thumb ? this.thumb.y : this.y2) < this.r);
        },
        onmousepress: function() {
            if(this.mouseOver() && !this.disabled) {
                this.selected = true;
            } else {
                this.focused = false; 
            }
        },
        onmouserelease: function() {
            if(this.mouseOver() && this.selected && !this.disabled) {
                this.focused = true;
                try {
                    this.toggled = this.toggled ? false : true;
                } catch(error) {}
                this.action();
                try {
                    playSound(config.audioFeedback);
                } catch(error) {}
            }
            this.selected = false;
        },
        onmousedrag: noop,
        onmousescroll: noop,
        onkeypress: noop
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
            params.action = params.action || noop;
            Element.call(this, params);
            this.disabled = this.disabled || params.disabled;
            this.fill = this.disabled ? config.fill.disabled : (this.fill || params.fill || config.fill.accent);
        };
        this.init();
    };
    Button.prototype = {
        draw: function() {
            pushStyle();
            rectMode(LEFT);
            ellipseMode(CORNER);
            this.drawShadow();
            strokeWeight(config.strokeWeight);
            stroke(this.disabled ? config.fill.outline : this.fill);
            fill(lerpColor(this.fill, color(255), this.transition / 10));
            (this.shape)(this.x, this.y, this.w, this.h, this.r);
            this.drawGradient();
            fill(255);
            textAlign(CENTER, CENTER);
            textFont(config.font, 17);
            text(this.label, this.x2, this.y2);
            this.animate();
            popStyle();
        }
    };
    inherit(Button, Element);
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
            params.action = params.action || noop;
            Element.call(this, params);
            this.disabled = this.disabled || params.disabled;
            this.textSize = params.textSize;
            this.accurate = params.accurate || false;
            this.value = this.value || params.value || 0;
            this.min = params.min || 0;
            this.max = params.max || config.slider.max;
            this.value = constrain(this.value, this.min, this.max);
            this.thumb = {
                x: map(this.value, this.min, this.max, this.x + this.r, this.x3 - this.r),
                y: this.y + this.r
            };
            this.fill = this.disabled ? config.fill.disabled : (this.fill || params.fill || color(255));
        };
        this.init();
    };
    Slider.prototype = {
        draw: function() {
            pushStyle();
            stroke(config.fill.disabled);
            strokeWeight(config.strokeWeight * 2);
            line(this.x + 1, this.y2, this.x3 - 1, this.y2);
            stroke(!this.disabled ? config.fill.accent : config.fill.disabled);
            strokeCap(SQUARE);
            line(this.x, this.y2, this.thumb.x, this.y2);
            this.drawShadow([this.thumb.x - this.r + 2.5, this.thumb.y - this.r + 3, this.r * 2 - 4, this.r * 2 - 3.5]);
            strokeWeight(config.strokeWeight / 1.5);
            stroke(!this.disabled ? lerpColor(color(255), color(0), 0.1) : config.fill.outline);
            fill(this.disabled ? config.fill.background : lerpColor(this.fill, color(0), this.transition / 50));
            ellipseMode(CENTER);
            (this.shape)(this.thumb.x, this.thumb.y, this.r * 2 * (this.transition / 10 + 1), this.r * 2 * (this.transition / 10 + 1));
            this.animate();
            fill(this.disabled ? config.fill.disabled : color(0));
            textAlign(LEFT, BOTTOM);
            textFont(config.font);
            if(this.textSize) {
                textSize(this.textSize);
            }
            text(this.label, this.x, this.y);
            if(this.label && !this.disabled) {
                fill(100);
                textAlign(RIGHT, BOTTOM);
                text(this.accurate ? this.value.toFixed(2) : round(this.value), this.x3, this.y);
            }
            popStyle();
        },
        onmousedrag: function() {
            if(this.selected) {
                this.thumb.x = constrain(mouseX, this.x + this.r, this.x3 - this.r);
                this.value = map(this.thumb.x, this.x + this.r, this.x3 - this.r, this.min, this.max);
                this.action();
            }
        },
        onkeypress: function() {
            if(this.focused) {
                if(keyCode === 32 || keyCode === ENTER) {
                    return;   
                }
                var amount = this.accurate ? 0.01 : 1;
                if([LEFT, DOWN, 189, 109].includes(keyCode)) {
                    this.value = constrain(this.value - amount, this.min, this.max);
                    this.thumb.x = map(this.value, this.min, this.max, this.x + this.r, this.x3 - this.r);
                } else if([RIGHT, UP, 187, 107].includes(keyCode)) {
                    this.value = constrain(this.value + amount, this.min, this.max);
                    this.thumb.x = map(this.value, this.min, this.max, this.x + this.r, this.x3 - this.r);
                } else if(!isNaN(String.fromCharCode(keyCode))) {
                    this.value = map(String.fromCharCode(keyCode), 0, 10, this.min, this.max);
                    this.thumb.x = map(this.value, this.min, this.max, this.x + this.r, this.x3 - this.r);
                }
                this.action();
            }
        }
    };
    inherit(Slider, Element);
    //}
    //Radio Button {
    var RadioButton = function(params) {
        this.init = function() {
            params.shape = ellipse;
            params.x = this.x || params.x || 0;
            params.y = this.y || params.y || 0;
            params.r = config.radiobutton.r;
            params.action = params.action || noop;
            Element.call(this, params);
            this.disabled = this.disabled || params.disabled;
            this.toggled = this.toggled || params.toggled || false;
            this.fill = this.disabled ? config.fill.disabled : (this.fill || params.fill || config.fill.accent);
        };
        this.init();
    };
    RadioButton.prototype = {
        draw: function() {
            pushStyle();
            strokeWeight(config.strokeWeight);
            if(this.disabled) {
                stroke(config.fill.outline);
                fill(config.fill.disabled);
            } else if(this.toggled) {
                stroke(this.fill);
                fill(lerpColor(this.fill, color(255), this.transition / 10));
            } else if(!this.toggled) {
                stroke(config.fill.outline);
                fill(lerpColor(color(255), color(0), this.transition / 10));
            }
            ellipseMode(CORNER);
            (this.shape)(this.x, this.y, this.r * 2, this.r * 2);
            if(this.toggled) {
                stroke(this.fill);
                fill(this.disabled ? config.fill.outline : color(255));
                ellipseMode(CENTER);
                (this.shape)(this.x2, this.y2, this.r, this.r);
            }
            this.animate();
            fill(this.disabled ? config.fill.disabled : color(0));
            textAlign(LEFT, CENTER);
            textFont(config.font);
            textSize(15);
            text(this.label, this.x3 + 5, this.y2);
            popStyle();
        }
    };
    inherit(RadioButton, Element);
    //}
    //Radiolist {
    var radioOptions;
    var Radiolist = function(params) {
        this.init = function() {
            params.x = this.x || params.x || 0;
            params.y = this.y || params.y || 0;
            params.action = params.action || noop;
            Element.call(this, params);
            this.options = params.options || {};
            this.optionsLength = Object.keys(this.options).length;
            this.radioButtons = [];
            for(var option in this.options) {
                this.radioButtons.push(new RadioButton({
                    label: option.toTitleCase(),
                    x: this.x,
                    y: this.y,
                    toggled: this.options[option]
                }));
            }
            for(var i = 0; i < this.optionsLength; i++) {
                this.radioButtons[i].y = this.y + (config.radiobutton.r * 2 + 5) * i;
                this.radioButtons[i].init();
            }
        };
        this.init();
    };
    Radiolist.prototype = {
        draw: function() {
            this.radioButtons.forEach(function(element) {
                element.draw();
            });
        },
        onmousepress: function() {
            this.radioButtons.forEach(function(element) {
                element.onmousepress();
            });
        },
        onmouserelease: function() {
            //This is a mess
            var toUnselect;
            for(var i = 0; i < this.optionsLength; i++) {
                if(this.radioButtons[i].selected && this.radioButtons[i].mouseOver()) {
                    toUnselect = this.radioButtons.except(this.radioButtons[i]);
                }
            }
            var toUnselectLength = -1;
            for(var element in toUnselect) {
                toUnselectLength++;
            }
            if(toUnselect !== this.radioButtons && toUnselectLength !== this.optionsLength && toUnselectLength > 0) {
                for(var i = 0; i < this.optionsLength; i++) {
                    this.radioButtons[i].toggled = false;
                }
            }
            this.radioButtons.forEach(function(element) {
                element.onmouserelease();
            });
            for(var i = 0; i < this.optionsLength; i++) {
                radioOptions[Object.keys(this.options)[i]] = this.radioButtons[i].toggled;
            }
        }
    };
    inherit(Radiolist, Element);
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
            params.action = params.action || noop;
            Element.call(this, params);
            this.disabled = this.disabled || params.disabled;
            this.toggled = this.toggled || params.toggled || false;
            this.fill = this.disabled ? config.fill.disabled : (this.fill || params.fill || config.fill.accent);
        };
        this.init();
    };
    Checkbox.prototype = {
        draw: function() {
            pushStyle();
            strokeWeight(config.strokeWeight);
            if(this.disabled) {
                stroke(config.fill.outline);
                fill(config.fill.disabled);
            } else if(this.toggled) {
                stroke(this.fill);
                fill(lerpColor(this.fill, color(255), this.transition / 10));
            } else if(!this.toggled) {
                stroke(config.fill.outline);
                fill(lerpColor(color(255), color(0), this.transition / 10));
            }
            (this.shape)(this.x, this.y, this.w, this.h, this.r);
            this.drawGradient();
            if(this.toggled) {
                strokeCap(ROUND);
                strokeWeight(config.symbolWeight);
                stroke(this.disabled ? config.fill.outline : color(255));
                symbols.checkmark(this.x2, this.y2, 0.75);
            }
            this.animate();
            fill(this.disabled ? config.fill.disabled : color(0));
            textAlign(LEFT, CENTER);
            textFont(config.font);
            text(this.label, this.x3 + 5, this.y2);
            popStyle();
        }
    };
    inherit(Checkbox, Element);
    //}
    //ToggleButton {
    var ToggleButton = function(params) {
        this.init = function() {
            params.label = this.label || params.label || "";
            params.shape = rect;
            params.x = this.x || params.x + 1|| 0;
            params.y = this.y || params.y || 0;
            params.w = params.w || config.dropdown.w - 1;
            params.h = params.h || config.dropdown.h;
            params.r = config.button.r;
            params.action = params.action || noop;
            Element.call(this, params);
            this.disabled = this.disabled || params.disabled;
            this.noCursorChange = true;
            this.toggled = this.toggled || params.toggled || false;
            this.fill = this.disabled ? config.fill.disabled : (this.fill || params.fill || config.fill.accent);
        };
        this.init();
    };
    ToggleButton.prototype = {
        draw: function() {
            pushStyle();
            rectMode(LEFT);
            noStroke();
            fill(this.toggled ? this.fill : lerpColor(color(0, 0, 0, 1), color(0, 0, 0, 75), this.transition / 5));
            (this.shape)(this.x, this.y, this.w, this.h);
            fill(this.toggled ? color(255) : color(0));
            textAlign(LEFT, CENTER);
            textFont(config.font);
            textSize(13.5);
            text(this.label, this.x + 5, this.y2);
            this.animate();
            popStyle();
        }
    };
    inherit(ToggleButton, Element);
    //}
    //Dropdown {
    var dropOptions;
    var Dropdown = function(params) {
        this.init = function() {
            params.label = this.label || params.label || undefined;
            params.shape = rect;
            params.x = this.x || params.x || 0;
            params.y = this.y || params.y || 0;
            textFont(config.font);
            params.w = params.w || max(textWidth(params.label) + 40, config.dropdown.w);
            params.h = params.h || config.dropdown.h;
            params.r = config.dropdown.r;
            params.action = params.action || noop;
            Element.call(this, params);
            this.text = params.text;
            this.options = params.options || {};
            this.optionsLength = Object.keys(this.options).length;
            this.toggleButtons = [];
            for(var option in this.options) {
                this.toggleButtons.push(new ToggleButton({
                    label: option.toTitleCase(),
                    x: this.x,
                    y: this.y,
                    w: this.w,
                    toggled: this.options[option]
                }));
            }
            for(var i = 0; i < this.optionsLength; i++) {
                this.toggleButtons[i].y = this.y + this.h + config.dropdown.h * i + 1;
                this.toggleButtons[i].init();
            }
            var label;
            this.toggleButtons.forEach(function(element) {
                element.onmouserelease();
                if(element.toggled) {
                    label = element.label;
                }
            });
            this.label = label;
            this.disabled = this.disabled || params.disabled;
            this.toggled = false;
            this.fill = this.disabled ? config.fill.disabled : (this.fill || params.fill || config.fill.accent);
        };
        this.init();
    };
    Dropdown.prototype = {
        draw: function() {
            pushStyle();
            this.drawShadow([this.x + 1, this.y + 1.5, this.w - 2, this.h + lerp(0, this.h * this.optionsLength, constrain(this.transition2 * 2, 0, 1)) - 1, 5]);
            strokeWeight(config.strokeWeight);
            stroke(config.fill.outline);
            fill(255);
            rect(this.x, this.y, this.w, this.h + lerp(0, this.h * this.optionsLength, constrain(this.transition2 * 2, 0, 1)), 5);
            noStroke();
            fill(lerpColor(lerpColor(this.fill, color(255), this.transition / 10), color(255), this.transition2));
            rect(this.x3 - 8, this.y + 1, 8, this.h - 1, this.r);
            rect(this.x3 - 25, this.y + 1, 20, this.h - 1);
            this.drawGradient();
            strokeWeight(config.symbolWeight);
            stroke(lerpColor(color(255), config.fill.disabled, this.transition2));
            pushMatrix();
            translate(this.x3 - 12.5, this.y2);
            rotate(lerp(0, 180, this.transition2));
            symbols.arrow(0, 0);
            popMatrix();
            fill((this.label === undefined) ? config.fill.disabled : color(0));
            textFont(config.font);
            textSize(15);
            textAlign(LEFT, CENTER);
            text(!this.label ? "Select..." : this.label, this.x + 7.5, this.y2);
            if(this.selected) {
                strokeWeight(config.strokeWeight);
                stroke(config.fill.background);
                line(this.x + 5, this.y3, this.x3 - 5, this.y3);
                if(this.transition2 !== 1) {
                    for(var i = 0; i < this.optionsLength; i++) {
                        this.toggleButtons[i].y = this.y + this.h + lerp(0, config.dropdown.h, constrain(this.transition2 * 2, 0, 1) * i);
                        this.toggleButtons[i].init();
                    }
                }
                this.toggleButtons.forEach(function(element) {
                    element.draw();
                });
            }
            this.animate();
            fill(this.disabled ? config.fill.disabled : color(0));
            textAlign(LEFT, BOTTOM);
            textFont(config.font);
            text(this.text, this.x, this.y - 5);
            popStyle();
        },
        onmousepress: function() {
            if(this.mouseOver() && !this.disabled) {
                this.selected = true;
            }
            if(!this.toggled) {
                return;
            }
            this.toggleButtons.forEach(function(element) {
                element.onmousepress();
            });
        },
        onmouserelease: function() {
            if(this.mouseOver() && this.selected && !this.disabled) {
                try {
                    if(this.toggled) {
                        this.selected = false;   
                    }
                    this.toggled = this.toggled ? false : true;
                } catch(error) {}
                this.action();
                try {
                    playSound(config.audioFeedback);
                } catch(error) {}
                if(this.cursor !== "DEFAULT") {
                    this.cursor = "DEFAULT";
                    cursor(this.cursor);   
                }
            } else {
                this.selected = false;
                this.toggled = false;
                if(this.cursor !== "DEFAULT") {
                    this.cursor = "DEFAULT";
                    cursor(this.cursor);   
                }
            }
            //This is a mess
            var toUnselect;
            for(var i = 0; i < this.optionsLength; i++) {
                if(this.toggleButtons[i].selected && this.toggleButtons[i].mouseOver()) {
                    toUnselect = this.toggleButtons.except(this.toggleButtons[i]);
                }
            }
            var toUnselectLength = -1;
            for(var element in toUnselect) {
                toUnselectLength++;
            }
            if(toUnselect !== this.toggleButtons && toUnselectLength !== this.optionsLength && toUnselectLength > 0) {
                for(var i = 0; i < this.optionsLength; i++) {
                    this.toggleButtons[i].toggled = false;
                }
            }
            var label;
            this.toggleButtons.forEach(function(element) {
                element.onmouserelease();
                if(element.toggled) {
                    label = element.label;
                }
            });
            this.label = label;
            for(var i = 0; i < this.optionsLength; i++) {
                dropOptions[Object.keys(this.options)[i]] = this.toggleButtons[i].toggled;
            }
        }
    };
    inherit(Dropdown, Element);
    //}
    //Making elements {
    var valuesSlider = new Slider({
        label: "Per Row",
        x: 20,
        y: 125,
        w: 200,
        min: 5,
        max: 150,
        value: 50,
        action: function() {
            valuesPerRow = round(this.value);   
        }
    });
    var colorsSlider = new Slider({
        label: "Number of colors",
        x: 375,
        y: 160,
        w: 150,
        min: 2,
        max: valuesPerRow / 2,
        value: constrain(10, this.min, this.max),
        textSize: 15,
        action: function() {
            uniqueColors = this.value;
        },
        disabled: true
    });
    var autoColorsCheck = new Checkbox({
        label: "Automatic Colors",
        x: 350,
        y: 110,
        toggled: true,
        action: function() {
            uniqueColors = this.toggled ? false : colorsSlider.value;
            if(this.toggled) {
                colorsSlider.disable();
                uniqueColors = false;
            } else {
                colorsSlider.enable();   
            }
        }
    });
    var radioOptions = {
        random: true,
        reversed: false
    };
    var valuesOrderRadio = new Radiolist({
        x: 20,
        y: 185,
        options: radioOptions
    });
    var dropOptions = {
        "bubble sort": false,
        "shaker sort": false,
        "insertion sort": false,
        "comb sort": false,
        "shell sort": false
    };
    var updateMethod = function() {
        if(dropOptions["bubble sort"]) {
            method = "bubble";
        } else if(dropOptions["shaker sort"]) {
            method = "shaker";
        } else if(dropOptions["insertion sort"]) {
            method = "insertion";
        } else if(dropOptions["comb sort"]) {
            method = "comb";
        } else if(dropOptions["shell sort"]) {
            method = "shell";
        }
    };
    var methodDrop = new Dropdown({
        text: "Sorting Algorithm",
        label: "Bubble Sort",
        x: 20,
        y: 375,
        w: 200,
        options: dropOptions
    });
    var combShrinkFactorSlider = new Slider({
        label: "Shrink Factor",
        x: 20,
        y: 450,
        w: 200,
        min: 1,
        max: 2,
        value: 1.22,
        accurate: true,
        action: function() {
            combShrinkFactor = this.value;   
        }
    });
    var frameRateSlider = new Slider({
        label: "Frame rate",
        x: 350,
        y: 375,
        w: 200,
        value: 60,
        min: 1,
        max: 250
    });
    var visualizeButton = new Button({
        label: "Visualize",
        x: 212.5,
        y: 520,
        action: function() {
            cursor("NONE");
            initVariables();
            page = "animation";
        }
    });
    
    var elements = [valuesSlider, colorsSlider, autoColorsCheck, valuesOrderRadio, frameRateSlider, visualizeButton, methodDrop];
    //}
//}
//Drawing the settings page {
var settingsPage = function() {
    background(245);
    fill(0);
    textFont(createFont("Arial Bold", 45));
    text("Values", 20, 75);
    text("Sorting", 20, 325);
    textFont(config.font);
    text("Order:", 20, 175);
    fill(config.fill.disabled);
    textFont(config.font, 15);
    text("Also depends on the number of values per row and your computer's processing power", 350, 400, 225, 65);
    if(method === "comb" && combShrinkFactorSlider.mouseOver()) {
        text("Might mess things up", 20, 490);
    }
    pushStyle();
    textAlign(CENTER);
    if(visualizeButton.mouseOver()) {
        fill(lerpColor(color(config.fill.disabled, 0), config.fill.disabled, visualizeButton.transition));
        text("Press any key during animation to return to settings page", 300, 590);
    } else {
        fill(map(sin(frameCount * 4), -1, 1, 175, 200));
        textFont(config.font, 11);
        text("ENTER", 300, 587.5);
    }
    popStyle();
    textAlign(LEFT);
    updateMethod();
    if(method === "comb") {
        combShrinkFactorSlider.draw();   
    }
    elements.forEach(function (element) {
        element.draw();
    });
};
//}
//Drawing the grid {
var visualize = function() {
    frameRate(frameRateSlider.value);
    switch(method) {
        case "bubble":
            bubbleSort();
            break;
        case "shaker":
            shakerSort();
            break;
        case "insertion":
            insertionSort();
            break;
        case "comb":
            combSort();
            break;
        case "shell":
            shellSort();
            break;
    }
    colorMode(RGB);
    background(0);
    colorMode(HSB);
    noStroke();
    for(var i = 0; i < valuesPerRow; i++)   {
        for(var j = 0; j < valuesPerRow; j++) {
            strokeWeight(1);
            stroke(uniqueColors ? map(values[i][j], 0, uniqueColors, 0, 255) : map(values[i][j], 0, valuesPerRow, 0, 255), 255, 255);
            fill(uniqueColors ? map(values[i][j], 0, uniqueColors, 0, 255) : map(values[i][j], 0, valuesPerRow, 0, 255), 255, 255);
            rect(j * width / valuesPerRow, i * height / valuesPerRow, width / valuesPerRow, height / valuesPerRow);
        }
    }
    colorMode(RGB);
};
//}
//Drawing all the things {
draw = function() {
    switch(page) {
        case "settings":
            settingsPage();
            break;
        case "animation":
            visualize();
            textSize(15);
            textAlign(RIGHT);
            fill(0);
            textStroke(method.toTitleCase() + " sort", 595, 15);
            fill(255);
            text(method.toTitleCase() + " sort", 595, 15);
            textAlign(LEFT);
            if(this.__frameRate < 10 && frameRateSlider.value > 10 && frameCount % 10 === 0) {
                fill(0);
                textStroke("LOW FPS", 10, 20);
                fill(255);
                text("LOW FPS", 10, 20);
            }
            break;
    }
    if(debugMode) {
        pushStyle();
        textAlign(RIGHT, TOP);
        textFont(createFont("monospace"), 15);
        fill(255);
        textStroke(this.__frameRate + "\n" +
        page + "\n" +
        method + "\n" + 
        valuesPerRow + "x" + valuesPerRow, width - 10, 20);
        if(typeof i === "object") {
            textStroke(i + "\n" + j, 290, 100, 300, 400);
        } else {
            textStroke(i + ":" + j, width - 10, 100);   
        }
        fill(0);
        text(this.__frameRate + "\n" +
        page + "\n" +
        method + "\n" + 
        valuesPerRow + "x" + valuesPerRow, width - 10, 20);
        if(typeof i === "object") {
            text(i + "\n" + j, 290, 100, 300, 400);
        } else {
            text(i + ":" + j, width - 10, 100);   
        }
        popStyle();
    }
};
//}
//Event handling {
mousePressed = function() {
    if(page === "settings") {
        elements.forEach(function (element) {
            element.onmousepress();
        });
        if(method === "comb") {
            combShrinkFactorSlider.onmousepress();   
        }
    }
};
mouseReleased = function() {
    if(page === "settings") {
        elements.forEach(function (element) {
            element.onmouserelease();
        });
        if(method === "comb") {
            combShrinkFactorSlider.onmouserelease();   
        }
    }
};
mouseDragged = function() {
    if(page === "settings") {
        elements.forEach(function (element) {
            element.onmousedrag();
        });
        if(method === "comb") {
            combShrinkFactorSlider.onmousedrag();   
        }
    }
};
//mouseOut = mouseReleased;
keyPressed = function() {
    if(page === "animation" && keyCode !== 192) {
        page = "settings";
        frameRate(60);
        cursor("DEFAULT");
    } else {
        if(keyCode === ENTER) {
            cursor("NONE");
            initVariables();
            page = "animation";
        }
    }
    if(page === "settings") {
        elements.forEach(function (element) {
            element.onkeypress();
        });
        if(method === "comb") {
            combShrinkFactorSlider.onkeypress();   
        }
    }
    if(keyCode === 192) {
        debugMode = !debugMode;
    }
};
//}
//Yes, this line was necessary
