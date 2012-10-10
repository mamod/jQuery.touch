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

(function(b){var j,c,d=0;var f=["swipeLeft","swipeRight","swipeUp","swipeDown","tap","doubleTap","longTap"];b(f).each(function(l,k){b.fn[k]=function(m){return this.each(function(){b(this).on(k,m)})}});var a={};if(h()){a={down:"touchstart",move:"touchmove",up:"touchend",pageX:function(k){return k.originalEvent.touches[0].pageX},pageY:function(k){return k.originalEvent.touches[0].pageY},target:function(k){return k.originalEvent.touches[0].target}}}else{a={down:"mousedown",move:"mousemove",up:"mouseup",pageX:function(k){return k.pageX},pageY:function(k){return k.pageY},target:function(k){return k.target}}}var g=b.fn.on;var i=b.fn.off;b.fn.extend({on:function(q,o,n,l){var p;if(typeof o=="function"){p=o}else{if(typeof n=="function"){p=n}else{if(typeof l=="function"){p=l}}}var k=this;if(b.inArray(q,f)!==-1){this.each(function(){var s={};var r=b(this);r.on(a.down+"."+q,function(u){s.start=new Date().getTime();s.startX=a.pageX(u);s.startY=a.pageY(u);var t=a.target(u);r.on(a.move+".Touch",function(v){s.endX=a.pageX(v);s.endY=a.pageY(v)});r.one(a.up,function(v){v.type=q;j=p;c=v;e[q](r,s);r.off(a.move+".Touch");s={}})})})}var m=g.apply(this,arguments);return m},off:function(l){if(b.inArray(l,f)!==-1){b(this).off(a.down+"."+l)}var k=i.apply(this,arguments);return k}});b.fn.fireCallback=function(){var k=b.proxy(j,this);k(c)};var e={swipeLeft:function(l,m){var k=m.startX-m.endX;if(Math.abs(k)>=30&&k>0){l.fireCallback()}},swipeRight:function(l,m){var k=m.startX-m.endX;if(Math.abs(k)>=30&&k<0){l.fireCallback()}},swipeUp:function(k,m){var l=m.startY-m.endY;if(Math.abs(l)>=30&&l>0){k.fireCallback()}},swipeDown:function(k,m){var l=m.startY-m.endY;if(Math.abs(l)>=30&&l<0){k.fireCallback()}},tap:function(k,n){var m=new Date().getTime();var l=(m-n.start);if(l<=300){k.fireCallback()}},doubleTap:function(k,n){var m=new Date().getTime();var l=(m-n.start);d++;setTimeout(function(){if(d==2){k.fireCallback()}d=0},200)},longTap:function(k,n){var m=new Date().getTime();var l=(m-n.start);if(l>300){k.fireCallback()}}};function h(){return !!("ontouchstart" in window)}}(jQuery));