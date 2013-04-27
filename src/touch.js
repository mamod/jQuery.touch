/*
* jQuery Touch
*
* Copyright 2012, Mamod A. Mehyar
* 
* http://mamod.me
* http://twitter.com/mamod
* 
* Version : 1.0
* 
* Released under the MIT license
*/

//=========================================================================
// jQuery touch plugin
// detects swipe and taps for both desktop and mobile devices
//=========================================================================
(function($){
    var _callback,
    _e,
    _clickCount = 0,
    __event_detected = false,
    _single_tap_action;
    
    var touchMethods = ['swipeLeft','swipeRight', 'swipeUp', 'swipeDown', 'tap', 'doubleTap','longTap'];
    $(touchMethods).each(function(i,m){
        $.fn[m] = function(callback){
            return this.each(function(){
                $(this).on(m, callback);
            });
        }
    });
    
    var device = {};
    if (is_touch_device()){
        device = {
            down : 'touchstart',
            move : 'touchmove',
            up : 'touchend',
            pageX : function(e){
                return e.originalEvent.touches[0].pageX;
            },
            pageY : function(e){
                return e.originalEvent.touches[0].pageY;
            },
            target : function(e){
                return e.originalEvent.touches[0].target;
            }
        }
    } else {
        device = {
            down : 'mousedown',
            move : 'mousemove',
            up : 'mouseup',
            pageX : function(e){
                return e.pageX;
            },
            pageY : function(e){
                return e.pageY;
            },
            target : function(e){
                return e.target;
            }
        }
    }
    
    //extend on & off functions
    var oldOnFunction = $.fn.on;
    var oldOffFunction = $.fn.off;
    $.fn.extend({
        on : function(type,fn1,fn2,fn3){
            
            //which arg is the callback function?
            //it's not always the first one
            var fn;
            if (typeof fn1 == 'function'){
                fn = fn1;
            } else if (typeof fn2 == 'function'){
                fn = fn2;
            } else if (typeof fn3 == 'function'){
                fn = fn3
            }
            
            var $that = this;
            
            if( $.inArray(type, touchMethods) !== -1 ){
                
                this.each(function() {
                    
                    var touch = {};
                    var $this = $(this);
                    
                    $this.on(device.down+'.'+type,function (e) {
                        touch.start = new Date().getTime();
                        touch.startX = device.pageX(e);
                        touch.startY = device.pageY(e);
                        var target = device.target(e);
                        
                        $this.on(device.move+'.Touch', function(e2){
                            touch.endX = device.pageX(e2);
                            touch.endY = device.pageY(e2);
                        });
                        
                        $this.one(device.up, function(e){
                            e.type = type;
                            _callback  = fn;
                            _e = e;
                            touchHelperMethods[type]($this,touch);
                            $this.off(device.move+'.Touch');
                            touch = {};
                        });
                        
                    });
                });
            }
            
            var ret = oldOnFunction.apply(this, arguments);
            return ret;
        },
        
        off : function(type){
            if( $.inArray(type, touchMethods) !== -1 ){
                $(this).off(device.down+'.'+type);
            }
            var ret = oldOffFunction.apply(this, arguments);
            return ret;
        }
    });
    
    $.fn.fireCallback = function(){
        var callback = $.proxy(_callback, this);
        callback(_e);
        setTimeout(function(){
            __event_detected = false;
        },300);
    };
    
    var touchHelperMethods = {
        swipeLeft : function(ele,touch){
            var x = touch.startX - touch.endX;
            if (Math.abs(x) >= 30 && x > 0 && !__event_detected) {
                __event_detected = true;
                ele.fireCallback();
            }
        },
        swipeRight : function(ele,touch){
            var x = touch.startX - touch.endX;
            if (Math.abs(x) >= 30 && x < 0 && !__event_detected) {
                __event_detected = true;
                ele.fireCallback();
            }
        },
        swipeUp : function(ele,touch){
            var y = touch.startY - touch.endY;
            if (Math.abs(y) >= 30 && y > 0 && !__event_detected) {
                __event_detected = true;
                ele.fireCallback();
            }
        },
        swipeDown : function(ele,touch){
            var y = touch.startY - touch.endY;
            if (Math.abs(y) >= 30 && y < 0 && !__event_detected) {
                __event_detected = true;
                ele.fireCallback();
            }
        },
        tap : function(ele,touch){
            var time = new Date().getTime();
            var diff = (time - touch.start);
            
            if (diff <= 300 && !__event_detected){
                _single_tap_action = setTimeout(function(){
                    __event_detected = true;
                    ele.fireCallback();
                },100);
            }
        },
        doubleTap : function(ele,touch){
            var time = new Date().getTime();
            var diff = (time - touch.start);
            _clickCount++;
            
            setTimeout(function(){
                if (_clickCount == 2 && !__event_detected){
                    __event_detected = true;
                    clearTimeout(_single_tap_action);
                    ele.fireCallback();
                }
                _clickCount = 0;
            },200);
        },
        longTap : function(ele,touch){
            var time = new Date().getTime();
            var diff = (time - touch.start);
            if (diff > 300 && _clickCount < 2 && !__event_detected){
                __event_detected = true;
                ele.fireCallback();
            }
        }
    }
    
    function is_touch_device() {
        return !!('ontouchstart' in window);
    }
    
}(jQuery));