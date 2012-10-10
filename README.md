jQuery.touch
========

A jQuery touch event plugin
    
DESCRIPTION
===========

This module detects touch events on mobiles and other touch devices it also fallsback
to mouse events on desktops and non touch devices

USAGE
========
    
    //Just like any other jQuery attached events
    
    $('body').swipeLeft(function(e){
        console.log(e);
    });
    
    //or
    
    $('body').on('swipeRight',function(){
        ....
    });
    
    //trigger event
    $('body').trigger('swipeRight');
    
    //unbind ebent
    $('body').off('swipeRight');
    

Supported events
================

tap : single tap action or normal click

doubleTap : double tapping or double mouse click

longTap : long tap > 300 ms

swipeLeft : sliding finger or mouse pointer to the left

swipeRight : sliding finger or mouse pointer to the right

swipeUp : sliding finger or mouse pointer up ward

swipeDown : sliding finger or mouse pointer down ward


SPECIAL THANK
=============

    Thank you my brother for giving me your mobile :)
    
LICENSE (MIT)
=============
    
    Copyright (c) 2012 Mamod A. Mehyar

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    
