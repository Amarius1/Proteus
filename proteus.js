$("[dropdown] > ul").addClass("dd-menu");
$("[dropdown] > a[btn]").addClass("activator");
$("[dropdown] > ul > a").addClass("ripple");
$("[select]").addClass("dropdown");
$("[select] > ul").addClass("list");
$("[select] > ul > a").addClass("ripple");
$("[select] [selected]").addClass("selected");
$("[drawer] ul > a").attr( 'btn', ' ' );
$("a[btn] > i").attr( 'icon', ' ' );





// Open/close
$(document).on('click', '.dropdown', function(event) {
  $('.dropdown').not($(this)).removeClass('open');
  $(this).toggleClass('open');
  if ($(this).hasClass('open')) {
    $(this).find('a').attr('tabindex', 0);
    $(this).find('.selected').focus();
  } else {
    $(this).find('a').removeAttr('tabindex');
    $(this).focus();
  }
});
// Close when clicking outside
$(document).on('click', function(event) {
  if ($(event.target).closest('.dropdown').length === 0) {
    $('.dropdown').removeClass('open');
    $('.dropdown a').removeAttr('tabindex');
  }
  event.stopPropagation();
});
// Option click
$(document).on('click', '.dropdown a', function(event) {
  $(this).closest('.list').find('.selected').removeClass('selected');
  $(this).addClass('selected');
  var text = $(this).data('display-text') || $(this).text();
  $(this).closest('.dropdown').find('label').text(text);
  $(this).closest('.dropdown').prev('select').val($(this).data('value')).trigger('change');
});

// Keyboard events
$(document).on('keydown', '.dropdown', function(event) {
  var focused_option = $($(this).find('.list a:focus')[0] || $(this).find('.list a.selected')[0]);
  // Space or Enter
  if (event.keyCode == 32 || event.keyCode == 13) {
    if ($(this).hasClass('open')) {
      focused_option.trigger('click');
    } else {
      $(this).trigger('click');
    }
    return false;
    // Down
  } else if (event.keyCode == 40) {
    if (!$(this).hasClass('open')) {
      $(this).trigger('click');
    } else {
      focused_option.next().focus();
    }
    return false;
    // Up
  } else if (event.keyCode == 38) {
    if (!$(this).hasClass('open')) {
      $(this).trigger('click');
    } else {
      var focused_option = $($(this).find('.list a:focus')[0] || $(this).find('.list a.selected')[0]);
      focused_option.prev().focus();
    }
    return false;
  // Esc
  } else if (event.keyCode == 27) {
    if ($(this).hasClass('open')) {
      $(this).trigger('click');
    }
    return false;
  }
});

$(document).ready(function() {
  create_custom_dropdowns();
});


var drawer,
    drawerElem,
    iconElem;
window.addEventListener("load", function (e) {
    drawerElem = document.querySelector("[drawer]");
    iconElem = document.getElementById("drawer");
    drawer = new Drawer(drawerElem);
    drawer.setDrawerIcon(new DrawerIcon(iconElem));
    
    //Use methods
    /*drawer.onOpenListener(function () {
        console.log("open");
    });
    drawer.onCloseListener(function () {
        console.log("close");
    });
    drawer.onMoveListener(function (x, percent, animation, duration) {
        console.log(x + " " + percent + " " + animation + " " + duration);
    });
    drawer.openDrawer();
    drawer.closeDrawer();
    drawer.toggleDrawer();
    drawer.isOpen();
    drawer.resetIconOnClick();*/
});


/* Drawer Library */
function Drawer(drawerElem) {
    "use strict";

    function checkMobile(a) {
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
    }
    var drawerIcon = {
            set: function (a) {},
            setState: function (a, b) {},
            setOnClick: function(a) {}
        },
        drawerBg,
        drawerStarted = false,
        width = drawerElem.offsetWidth,
        correct = 0,
        percent = 0,
        trx = 0,
        opened = false,
        startMoveTime = 0,
        startX = 0,
        speedSwipe = 0,
        isMobile = checkMobile(navigator.userAgent || navigator.vendor || window.opera),
        isIE = window.navigator.msPointerEnabled,
        isIE11 = window.navigator.pointerEnabled,
        typeStart = isIE ? "MSPointerDown" : (isMobile ? "touchstart" : "mousedown"),
        typeMove = isIE ? "MSPointerMove" : (isMobile ? "touchmove" : "mousemove"),
        typeEnd = isIE ? "MSPointerUp" : (isMobile ? "touchend" : "mouseup"),
        trZ = "translateZ(0)",
        stateMoved = false,
        transformProp = "transform",
        transitionProp = "transition",
        propPrefixCss = "",
        antiSelect,
        onOpened = function () {},
        onClosed = function () {},
        onMove = function (x, percent, animation, duration) {};

    function setProperty(elem, property, value) {
        elem.style[property] = value;
    }

    function transfrom(x) {
        setProperty(drawerElem, transformProp, x + " " + trZ);
    }

    function move(x, e) {
        if (x < 0) {
            x = 0;
        }
        if (x > width) {
            x = width;
        }
        if (!stateMoved) {
            if (!isMobile) {
                antiSelect.style.visibility = "visible";
                if (!document.body.classList.contains("rx_noselect"))
                    document.body.classList.add("rx_noselect");
            }
            if (trx == x) {
                stateMoved = false;
                return;
            } else {
                e.preventDefault();
                stateMoved = true;
            }

        }
        trx = x;
        transfrom("translateX(-" + x + "px)");
        percent = (1 - (x / width));
        if (percent >= 1) {
            percent = 1;
        } else if (percent <= 0) {
            percent = 0;
        }
        drawerIcon.set(percent * 100);
        drawerBg.style.opacity = percent;
        onMove(320 - x, percent, false, 0);
    }

    function setTransition(s) {
        setProperty(drawerElem, transitionProp, propPrefixCss + "transform " + s + "s cubic-bezier(0.0, 0.0, 0.2, 1)");
        setProperty(drawerBg, transitionProp, "opacity " + s + "s cubic-bezier(0.0, 0.0, 0.2, 1)");
    }

    function clearTransition() {
        setProperty(drawerElem, transitionProp, "none");
        setProperty(drawerBg, transitionProp, "none");
    }

    function openDrawer(s) {
        s = s || 0.225;
        opened = true;
        setTransition(s);
        drawerElem.style.opacity = 1;
        drawerBg.style.opacity = 1;
        drawerBg.style.visibility = "visible";
        transfrom("translateX(0)");
        drawerIcon.setState(1, s);
        onMove(width, 1, true, s);
        setTimeout(function () {
            clearTransition();
            if (drawerStarted) {
                return;
            }
            onOpened();
        }, s * 1000);
    }

    function closeDrawer(s) {
        s = s || 0.225;
        opened = false;
        setTransition(s);
        drawerBg.style.opacity = 0.001;
        transfrom("translateX(-" + width + "px)");
        drawerIcon.setState(0, s);
        onMove(0, 0, true, s);
        setTimeout(function () {
            clearTransition();
            if (drawerStarted) {
                return;
            }
            drawerElem.style.opacity = 0.001;
            drawerBg.style.visibility = "hidden";
            onClosed();
        }, s * 1000);
    }

    function toggleDrawer() {
        if (opened) {
            closeDrawer(0.225);
        } else {
            openDrawer(0.225);
        }
    }

    function onMovedNoOpen(e) {
        move(correct - e.touches[0].clientX, e);
    }

    function onMovedOpen(e) {
        move(startX - e.touches[0].clientX, e);
    }

    function onMovedNoOpenDesktop(e) {
        move(correct - e.clientX, e);
    }

    function onMovedOpenDesktop(e) {
        move(startX - e.clientX, e);
    }

    window.addEventListener("resize", function (e) {
        width = drawerElem.offsetWidth;
        if (!opened) {
            transfrom("translateX(-" + width + "px)");
        }
    });

    drawerElem.addEventListener(typeStart, function (e) {
        drawerElem.style.opacity = 1;
        drawerBg.style.visibility = "visible";
        startX = isMobile ? e.touches[0].clientX : e.clientX;
        startMoveTime = new Date();
        correct = width + startX;
        drawerStarted = true;
    });
    document.addEventListener(typeStart, function (e) {
        if (!drawerStarted) {
            return;
        }
        if (opened) {
            document.addEventListener(typeMove, isMobile ? onMovedOpen : onMovedOpenDesktop);
        } else {
            document.addEventListener(typeMove, isMobile ? onMovedNoOpen : onMovedNoOpenDesktop);
        }
    });

    document.addEventListener(typeEnd, function (e) {
        drawerStarted = false;
        stateMoved = false;
        if (!isMobile) {
            antiSelect.style.visibility = "hidden";
            document.body.classList.remove("rx_noselect");
        }
        document.removeEventListener(typeMove, isMobile ? onMovedOpen : onMovedOpenDesktop);
        document.removeEventListener(typeMove, isMobile ? onMovedNoOpen : onMovedNoOpenDesktop);

        speedSwipe = (((width / 2) / ((Math.abs((isMobile ? e.changedTouches[0].clientX : e.clientX) - startX)) / (new Date() - startMoveTime))) / 1000).toFixed(3);
        if (speedSwipe == Infinity) {
            if (!opened) {
                closeDrawer(0);
            } else {
                openDrawer(0);
            }
            return;
        }
        if (trx == 0) {
            return;
        }
        if (speedSwipe <= 0.150) {
            speedSwipe = 0.150;
        } else if (speedSwipe >= 0.5) {
            speedSwipe = 0.5;
        }
        var intent = (startX - (isMobile ? e.changedTouches[0].clientX : e.clientX)) > 0;
        if ((width / 2.25) > trx) {
            if (intent && speedSwipe < 0.4) {
                closeDrawer(speedSwipe);
            } else {
                openDrawer(speedSwipe);
            }
        } else {
            if (!intent && speedSwipe < 0.4) {
                openDrawer(speedSwipe);
            } else {
                closeDrawer(speedSwipe);
            }
        }
        trx = 0;
    });
    this.setDrawerIcon = function (icon) {
        drawerIcon = icon;
        drawerIcon.setOnClick(function (e) {
            toggleDrawer();
        });
    };
    this.getDrawerIcon = function () {
        return drawerIcon;
    };
    this.resetIconOnClick = function(){
        drawerIcon.setOnClick(function (e) {
            toggleDrawer();
        });
    };
    this.onOpenListener = function (listener) {
        onOpened = listener;
    };
    this.onCloseListener = function (listener) {
        onClosed = listener;
    };
    this.onMoveListener = function (listener) {
        onMove = listener;
    };
    this.openDrawer = function () {
        openDrawer();
    };
    this.closeDrawer = function () {
        closeDrawer();
    };
    this.toggleDrawer = function () {
        toggleDrawer();
    };
    this.isOpen = function () {
        return opened;
    };

    (function () {
        drawerBg = document.createElement("DIV");
        drawerBg.className = "drawer_bg";
        drawerBg.id = "drawer_bg";
        drawerElem.parentElement.insertBefore(drawerBg, drawerElem);
        drawerBg.onclick = function () {
            if (opened) {
                closeDrawer(0.225);
            }
        };
        antiSelect = document.createElement("DIV");
        antiSelect.className = "antiSelect";
        drawerElem.appendChild(antiSelect);
        var label = document.createElement("DIV");
        label.className = "label";
        drawerElem.appendChild(label);
        //Find prop name
        var vendors;
        if (antiSelect.style.transform === undefined) {
            vendors = ['Webkit', 'Moz', 'ms', 'O'];
            for (var vendor in vendors) {
                if (antiSelect.style[vendors[vendor] + 'Transform'] !== undefined) {
                    transformProp = vendors[vendor] + 'Transform';
                    propPrefixCss = "-" + vendors[vendor].toLowerCase() + "-";
                }
                if (antiSelect.style[vendors[vendor] + 'Transition'] !== undefined) {
                    transitionProp = vendors[vendor] + 'Transition';
                }
            }
        }
        if (/.*opera.*presto/i.test(navigator.userAgent)) {
            trZ = "";
        }
    })();
}

/* Hamburger Library */
function DrawerIcon(icon) {
    "use strict";
    var ic,
        line1,
        line2,
        line3,
        const1 = 1 / 300,
        const2 = 1 / 500,
        const3 = 2 / 3,
        direction = true,
        locked = false,
        rotateLine,
        scaleX,
        transY,
        transX,
        scaleX2,
        transX2,
        rotateIc,
        transformProp = "transform",
        transitionProp = "transition",
        trZ = "translateZ(0)",
        propPrefixCss = "";

    function setProperty(elem, property, value) {
        elem.style[property] = value;
    }

    function enableAnimation(duration) {
        var transition = propPrefixCss + "transform " + duration + "s ease";
        setProperty(line1, transitionProp, transition);
        setProperty(line2, transitionProp, transition);
        setProperty(line3, transitionProp, transition);
        setProperty(ic, transitionProp, transition);
    }

    function disableAnimation() {
        setProperty(line1, transitionProp, "none");
        setProperty(line2, transitionProp, "none");
        setProperty(line3, transitionProp, "none");
        setProperty(ic, transitionProp, "none");
    }
    
    this.state = function () {
        return direction;
    };
    
    this.setOnClick = function (listener) {
        icon.onclick = listener;
    };
    
    this.set = function (percent) {
        if (locked) {
            return;
        }
        if (percent > 100) {
            percent = 100;
        }
        if (percent < 0) {
            percent = 0;
        }
        if (percent >= 100) {
            direction = false;
        }
        if (percent <= 0) {
            direction = true;
        }

        rotateLine = 0.45 * percent;
        scaleX = 1 - const1 * percent;
        transY = 0.054 * percent;
        transX = 0.033 * percent;
        scaleX2 = 1 - const2 * percent;
        transX2 = -0.01 * percent;
        if (direction) {
            rotateIc = 1.80 * percent;
        } else {
            rotateIc = 360 - (1.80 * percent);
        }
        setProperty(line1, transformProp, "rotate(" + rotateLine + "deg) scaleX(" + scaleX + ") translateY(" + transY + "px) translateX(" + transX + "px) " + trZ);
        setProperty(line2, transformProp, "scaleX(" + scaleX2 + ") translateX(" + transX2 + "px) " + trZ);
        setProperty(line3, transformProp, "rotate(" + (-rotateLine) + "deg) scaleX(" + scaleX + ") translateY(" + (-transY) + "px) translateX(" + transX + "px) " + trZ);
        setProperty(ic, transformProp, "rotate(" + rotateIc + "deg) " + trZ);
    };
    
    this.setState = function (state, duration) {
        duration = duration || 0.225;
        enableAnimation(duration);
        var temp = this;
        switch (state) {
            case 0:
                this.set(1);
                break;
            case 1:
                this.set(100);
                break;
        }
        setTimeout(function () {
            disableAnimation();
            if (state === 0) {
                temp.set(0);
            }
        }, Number(duration) * 1000);
    };

    this.lock = function () {
        locked = true;
    };
    this.unLock = function () {
        locked = false;
    };

    (function () {
        icon.innerHTML += '<span class="ic"><i class="line one"></i><i class="line two"></i><i class="line thr"></i></span>';
        ic = icon.querySelector(".ic");
        line1 = ic.querySelector(".one");
        line2 = ic.querySelector(".two");
        line3 = ic.querySelector(".thr");
        //Find prop name
        var testEl = document.createElement('div'),
            vendors;
        if (testEl.style.transform === undefined) {
            vendors = ['Webkit', 'Moz', 'ms', 'O'];
            for (var vendor in vendors) {
                if (testEl.style[vendors[vendor] + 'Transform'] !== undefined) {
                    transformProp = vendors[vendor] + 'Transform';
                    propPrefixCss = "-" + vendors[vendor].toLowerCase() + "-";
                }
                if (testEl.style[vendors[vendor] + 'Transition'] !== undefined) {
                    transitionProp = vendors[vendor] + 'Transition';
                }
            }
        }
        if (/.*opera.*presto/i.test(navigator.userAgent)) {
            trZ = "";
        }
    })();
}

/////////////////////////////////////////////////////////////////////END DRAWER//////By Mobile Application Design-Development - Codepen////////


var acc = document.querySelectorAll('[collapsible] > a');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
      panel.style.opacity = "0";
      panel.style.visibility = "hidden";
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.opacity = "1";
      panel.style.visibility = "visible";
    }
  });
}
var coll = document.querySelectorAll('[accordion]');
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
$("a[btn]").addClass("ripple");
$("a[accordion]").addClass("ripple");
$(".tabs > span[action] > label").addClass("ripple");
$(".dropdown > label").addClass("ripple");
$(".dropdown li").addClass("ripple");

$( "[drawer] > *" ).wrapAll( "<div class='overflow'></div>" );

//$( "[dropdown] > a.fwf" ).wrapAll( "<div class='dd-menu'></div>" );

(function(window) {
    'use strict';

    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);

    // Find exact position of element
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offset(elem) {
        var docElem, win,
            box = {top: 0, left: 0},
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(obj) {
        var style = '';

        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }

        return style;
    }

    var Effect = {

        // Effect delay
        duration:390,

        show: function(e, element) {

            // Disable right click
            if (e.button === 2) {
                return false;
            }

            var el = element || this;

            // Create ripple
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple';
            el.appendChild(ripple);

            // Get click coordinate and element witdh
            var pos         = offset(el);
            var relativeY   = (e.pageY - pos.top);
            var relativeX   = (e.pageX - pos.left);
            var scale       = 'scale('+((el.clientWidth / 102) * 14)+')';

            // Support for touch devices
            if ('touches' in e) {
              relativeY   = (e.touches[0].pageY - pos.top);
              relativeX   = (e.touches[0].pageX - pos.left);
            }

            // Attach data to element
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);

            // Set ripple position
            var rippleStyle = {
                'top': relativeY+'px',
                'left': relativeX+'px',
            };

            ripple.className = ripple.className + ' waves-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('waves-notransition', '');

            // Scale the ripple
            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity   = '0.85';




            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
            rippleStyle['transition-duration']         = Effect.duration + 'ms';



            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function(e) {
            TouchHandler.touchup(e);

            var el = this;
            var width = el.clientWidth * 1.5;

            // Get first ripple
            var ripple = null;
            var ripples = el.getElementsByClassName('waves-ripple');
            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }

            var relativeX   = ripple.getAttribute('data-x');
            var relativeY   = ripple.getAttribute('data-y');
            var scale       = ripple.getAttribute('data-scale');

            // Get delay beetween mousedown and mouse leave
            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
            var delay = 350 - diff;

            if (delay < 0) {
                delay = 0;
            }

            // Fade out ripple after delay
            setTimeout(function() {
                var style = {
                    'top': relativeY+'px',
                    'left': relativeX+'px',
                    'opacity': '0',

                    // Duration
                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    'transform': scale,
                };

                ripple.setAttribute('style', convertStyle(style));

                setTimeout(function() {
                    try {
                        el.removeChild(ripple);
                    } catch(e) {
                        return false;
                    }
                }, Effect.duration);
            }, delay);
        },

        // Little hack to make <input> can perform waves effect
        wrapInput: function(elements) {
            for (var a = 0; a < elements.length; a++) {
                var el = elements[a];

                if (el.tagName.toLowerCase() === 'input') {
                    var parent = el.parentNode;

                    // If input already have parent just pass through
                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('ripple') !== -1) {
                        continue;
                    }

                    // Put element class and style to the specified parent
                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' waves-input-wrapper';

                    var elementStyle = el.getAttribute('style');

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', elementStyle);

                    el.className = 'waves-button-input';
                    el.removeAttribute('style');

                    // Put element as child
                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);
                }
            }
        }
    };


    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {
        /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
        touches: 0,
        allowEvent: function(e) {
            var allow = true;

            if (e.type === 'touchstart') {
                TouchHandler.touches += 1; //push
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                setTimeout(function() {
                    if (TouchHandler.touches > 0) {
                        TouchHandler.touches -= 1; //pop after 500ms
                    }
                }, 500);
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                allow = false;
            }

            return allow;
        },
        touchup: function(e) {
            TouchHandler.allowEvent(e);
        }
    };


    /**
     * Delegated click handler for .ripple element.
     * returns null when .ripple element not in "click tree"
     */
    function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentElement !== null) {
            if (!(target instanceof SVGElement) && target.className.indexOf('ripple') !== -1) {
                element = target;
                break;
            } else if (target.classList.contains('ripple')) {
                element = target;
                break;
            }
            target = target.parentElement;
        }

        return element;
    }

    /**
     * Bubble the click and show effect if .ripple elem was found
     */
    function showEffect(e) {
        var element = getWavesEffectElement(e);

        if (element !== null) {
            Effect.show(e, element);

            if ('ontouchstart' in window) {
                element.addEventListener('touchend', Effect.hide, false);
                element.addEventListener('touchcancel', Effect.hide, false);
            }

            element.addEventListener('mouseup', Effect.hide, false);
            element.addEventListener('mouseleave', Effect.hide, false);
        }
    }

    Waves.displayEffect = function(options) {
        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        //Wrap input inside <i> tag
        Effect.wrapInput($$('.ripple'));

        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect, false);
        }

        document.body.addEventListener('mousedown', showEffect, false);
    };

    /**
     * Attach Waves to an input element (or any element which doesn't
     * bubble mouseup/mousedown events).
     *   Intended to be used with dynamically loaded forms/inputs, or
     * where the user doesn't want a delegated click handler.
     */
    Waves.attach = function(element) {
        //FUTURE: automatically add waves classes and allow users
        // to specify them with an options param? Eg. light/classic/button
        if (element.tagName.toLowerCase() === 'input') {
            Effect.wrapInput([element]);
            element = element.parentElement;
        }

        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', showEffect, false);
        }

        element.addEventListener('mousedown', showEffect, false);
    };

    window.Waves = Waves;

    document.addEventListener('DOMContentLoaded', function() {
        Waves.displayEffect();
    }, false);

})(window);







// drop down menu script
	$( "[dropdown]" ).on( "click", ".activator", function() {
		$('[dropdown]').removeClass('open');
		$(this).parent().toggleClass('open');

	});

$(document).on("click", function(event){
        var $trigger = $("[dropdown]");
        if($trigger !== event.target && !$trigger.has(event.target).length){
            $("[dropdown]").removeClass("open");

        }
    });

// drop down menu script end
$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 20) {
        $("[bar].flat:not(.bottom)").addClass("depth-2");
    } else {
        $("[bar].flat:not(.bottom)").removeClass("depth-2");
    }
});
$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 7) {
          $("[bar].prominent").addClass("condensed");


    } else {
        $("[bar].prominent").removeClass("condensed");


    }
});
$('#modal-activator').click(function(e) {
  $('.modal').addClass('active');
  e.preventDefault();
});
$('.close').click(function(e) {
  $('.modal').removeClass('active');
  e.preventDefault();
});


///////////////////////////////////////////////////
var intervalId;
$("#scroll-right").mousedown(function() {
  intervalId = setInterval(tab_scroll_right, 10);
}).mouseup(function() {
  clearInterval(intervalId);
}).mouseleave(function() {
//this should help solve the problem that occurs when the mouse leaves the button while pressed down
  clearInterval(intervalId);
});

function tab_scroll_right() {
  var actualScroll = $(".tab-bar").scrollLeft();
  $(".tab-bar").scrollLeft(actualScroll+5)
}
/////////////////////////////////////////////////
var intervalId;
$("#scroll-left").mousedown(function() {
  intervalId = setInterval(tab_scroll_left, 10);
}).mouseup(function() {
  clearInterval(intervalId);
}).mouseleave(function() {
//this should help solve the problem that occurs when the mouse leaves the button while pressed down
  clearInterval(intervalId);
});

function tab_scroll_left() {
  var actualScroll = $(".tab-bar").scrollLeft();
  $(".tab-bar").scrollLeft(actualScroll-5)
}

//////////////////////////////////////////////
/* IN PROGRESS - CONFLICTING WITH TABS

var nav = document.getElementById('nav'),
    inner = document.getElementById('inner'),
    height = inner.innerHeight,
    scroll,
    lastScroll = 0;

function navCheck() {
  scroll = inner.scrollTop;

  if (scroll >= lastScroll) {
    nav.className = 'fixed slide-up';
  } else {
    nav.className = 'fixed slide-down';
  }

  lastScroll = scroll;
}

inner.onscroll = navCheck;
*/


$(document).ready(function(){
	$("input.indeterminate").attr('state','1').each(function(){
		$(this)[0].indeterminate = true;
	});
	$("input.indeterminate").click(function(){
		var state = parseInt($(this).attr('state'));
		if( state == 0 ) {
			$(this)[0].indeterminate = true;
			$(this)[0].checked = false;
		} else if( state == 1 ) {
			$(this)[0].indeterminate = false;
			$(this)[0].checked = true;
		} else if( state == 2 ) {
			$(this)[0].indeterminate = false;
			$(this)[0].checked = false;
			state = -1;
		}
		$(this).attr('state', ++state);
	});
});

var tabBar = (function () {
  var btn = document.querySelectorAll('.wave'),
      tab = document.querySelector('.tab-bar'),
      indicator = document.querySelector('.indicator'),
      indi = 0;
      indicator.style.marginLeft = indi + 'px';

  for(var i = 0; i < btn.length; i++) {
      btn[i].onmousedown = function (e) {

      var width = $(".tab").width();




      indicator.style.width = width;
      indicator.style.marginLeft = indi + (this.dataset.num-1) * width + 'px';


    };
  }
}());


(function($){
    var _dataFn = $.fn.data;
    $.fn.data = function(key, val){
        if (typeof val !== 'undefined'){
            $.expr.attrHandle[key] = function(elem){
                return $(elem).attr(key) || $(elem).data(key);
            };
        }
        return _dataFn.apply(this, arguments);
    };
})(jQuery);



$(document).ready(function(){

	$('ul.tab-bar li').click(function(){
		var tab_id = $(this).attr('data-target');

		$('ul.tab-bar li').removeClass('active');
		$('.tab-content').removeClass('active');

		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
	})

})



