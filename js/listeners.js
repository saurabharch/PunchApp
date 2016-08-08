$(document).ready(function (){
    $('.health').html(health);
    $('.topScore').html(topScore);
})



$("#start").click(function() {
    clearTimeout(timer)

    setTimeout(registerListeners, 3000);
});

var health = 5
var GlobalScore = 0
var randomTimer = Math.floor((Math.random() * 4) + 4)
var randomTimer1 = Math.floor((Math.random() * 4) + 5)

//global timer
var timeLeft = 30;
var milliLeft = 99

var topScore = 0

//list of audio fileds to be used

function play() {
    var audio = document.getElementById("startsound");
    audio.play();
}

function playPunchSound() {
    var audio = document.getElementById("punchSound")
    audio.play()
}

function playBonusSound() {
    var audio = document.getElementById("bonusSound")
    audio.play()
}


function playGruntSound() {
    var audio = document.getElementById("gruntSound")
    audio.play()
}
//end of list of audio file

//list of custom combos
var combo = []

$("#jabStraightLowKick").click(function() {
    combo = []
    clearTimeout(timer)
    combo.push(1, 1, 4)
    combomaker()
})
$("#bodyBodyHead").click(function() {
    combo = []
     clearTimeout(timer)
    combo.push(3, 3, 1)
    combomaker()
})
$("#jabStraightLiver").click(function() {
    combo = []
     clearTimeout(timer)
    combo.push(1, 1, 3)
    combomaker()
})

$("#doubleLeftHookStraight").click(function() {
    combo = []
    clearTimeout(timer)
    combo.push(3, 1, 1)
    combomaker()
})
$("#punchKickPunchKick").click(function() {
    combo = []
    clearTimeout(timer)
    combo.push(1, 4, 1, 4)
    combomaker()
})

$("#enterCustomCombo").click(function(){
   var val = document.getElementById('makeYourOwnCombo').value
   combo = []
  function makeIt(answer){
    val = val.split("")
    for(i = 0 ; i <val.length; i ++){
        combo.push(Number(val[i]))
    }
}
makeIt(val)

   combomaker()
})

//end of list of custom combos

//combo creation behavior
var counter = 0;
var timer;
var toRunValue = 0
var addScoreValue = 0
var addTimeValue=0
var addTargetsValue =0
var hasBonusTarget = false

function doOnce(){
    while(toRunValue<1){
        counter++
        toRunValue++
    }
}

function addTime(){
    while(addTimeValue <1){
        timeLeft = timeLeft+7
        addTimeValue++
    }
}

function addTargets(){
    function dothat(){
        $('[id^="target1"]').addClass("target")
        hasBonusTarget = true
        }
    setTimeout(function() {
        hasBonusTarget = false
        ;
        }, 5000);
   dothat()
    }


function addScore(){
    while(addScoreValue <1){
        GlobalScore++
        addScoreValue++
    }
}

function combomaker() {
      toRunValue = 0
    var counterActive = $("[class='target'][id^='target']").length


    if (counter < combo.length) {
        var dc = document.getElementById('target' + combo[counter]);
        $(dc).addClass(" target")
    } else if (counter === combo.length) {
        counter = 0
        var dc = document.getElementById('target' + combo[counter]);
        $(dc).addClass(" target")
    }
}

//all target behaviors
$('[id^="target"]').on('motion', function(ev, data) {

    var spot = $(data.spot.el);

    if (spot.hasClass('target')) {
        var indexHitBox = 0

        function success() {
            var hittedArray = [
                function() {
                if(!hasBonusTarget){
                    spot.removeClass("target")
                    }
                },
                function() {
                    spot.addClass('hitbox')
                },
                function() {
                    playPunchSound()
                },
                function() {
                   doOnce();
                },
                function() {
                    var timer = setTimeout(function() {
                        combomaker()
                        spot.removeClass('hitbox');
                    }, 100);
                }
            ]
            var handleHitBox = window.setInterval(function() {
                if (indexHitBox < hittedArray.length) {
                    hittedArray[indexHitBox++]();
                } else {
                    window.clearInterval(handleHitBox)
                }
            }, 10)
        }
        addScoreValue = 0
        success()
    }

});


//Main function that is invoked at the click of start
function registerListeners() {


countdown()


//Bonus add time
function setBonusTime(){
            var randomnum = Math.floor((Math.random() * 4) + 1)
            var d = document.getElementById('bonus' + randomnum);
            $(d).addClass("bonusTime")
            setTimeout(function(){  $(d).removeClass('bonusTime');
                    }, 2500);
        }

function setBonusTarget(){
            var randomnum = Math.floor((Math.random() * 4) + 1)
            var d = document.getElementById('bonus' + randomnum);
            $(d).addClass("bonusTarget")
            setTimeout(function(){  $(d).removeClass('bonusTarget');
                    }, 2500);
        }


setInterval(function() { setBonusTime()}, randomTimer*1700)

setInterval(function() { setBonusTarget()}, randomTimer1*2000)


//bonus activities
$('[id^="bonus"]').on('motion', function(ev, data) {
    var spot = $(data.spot.el);

    if (spot.hasClass('bonusTime')) {
        var indexHitBox = 0

        function success() {
            var hittedArray = [
                function() {
                    spot.removeClass("bonusTime")
                },
                function() {
                    playBonusSound()
                },
                function() {
                    addTime()
                    $('.score').html(GlobalScore);
                }
            ]
            var handleHitBox = window.setInterval(function() {
                if (indexHitBox < hittedArray.length) {
                    hittedArray[indexHitBox++]();
                } else {
                    window.clearInterval(handleHitBox)
                }
            }, 10)
        }
        addTimeValue=0
        success()
    }

    if (spot.hasClass('bonusTarget')) {
        var indexHitBox = 0
        function success() {
            var hittedArray = [
                function() {
                    spot.removeClass("bonusTarget")
                },
                function() {
                    playBonusSound()
                },
                function() {
                    addTargets()
                    $('.score').html(GlobalScore);
                }
            ]
            var handleHitBox = window.setInterval(function() {
                if (indexHitBox < hittedArray.length) {
                    hittedArray[indexHitBox++]();
                } else {
                    window.clearInterval(handleHitBox)
                }
            }, 10)
        }
        success()
    }

});
//end of bonus behaviors


//all target behaviors
$('[id^="target"]').on('motion', function(ev, data) {
    var spot = $(data.spot.el);

    if (spot.hasClass('target')) {
        var indexHitBox = 0

        function success() {
            var hittedArray = [
                 function() {
                if(!hasBonusTarget){
                    spot.removeClass("target")
                    }
                },
                function() {
                    spot.addClass('hitbox')
                },
                function() {
                    playPunchSound()
                },
                function() {
                    addScore()
                    $('.score').html(GlobalScore);
                },
                function() {
                    setTimeout(function() {
                        spot.removeClass('hitbox');
                    }, 100);
                }
            ]
            var handleHitBox = window.setInterval(function() {
                if (indexHitBox < hittedArray.length) {
                    hittedArray[indexHitBox++]();
                } else {
                    window.clearInterval(handleHitBox)
                }
            }, 10)
        }
        success()
    }
    setTimeout(function() {
        if(!hasBonusTarget){
        spot.removeClass('target');
    }
    }, 10);
});


    //nonTarget hitbox behavior
    $('[id^="_"]').not('[id^="target"]').on('motion', function(ev, data) {
        var spot = $(data.spot.el);
        if (spot.hasClass('active')) {
            spot.removeClass('active')
        } else {
            spot.addClass('active');
        }
        setTimeout(function() {
            spot.removeClass('active');
        }, 10);
    });




    //target creation behavior
    function punchHere() {
        if (combo.length === 0) {
            var randomnum = Math.floor((Math.random() * 4) + 1)
            var d = document.getElementById('target' + randomnum);
            $(d).addClass("target")
        }

    }


    function failed() {
        if (health <= 0) {
            alert("You've been punched too many times! \nTip: Bend at the Knees Not at Your Waist! \nYour score was:" + GlobalScore)
            location.reload();
        }


    }


//danger begins here!!! BEWARE!!!
    function shootDanger() {
        var shooting = [

            function() {
                var thisbox = $('#_1b, #_1c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_1b, #_1c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                            function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 100)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },

            function() {
                var thisbox = $('#_2b, #_2c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_2b, #_2c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                                     function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },

            function() {
                var thisbox = $('#_3b, #_3c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_3b, #_3c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                               function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },

            function() {
                var thisbox = $('#_4b, #_4c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_4b, #_4c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                                   function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }

                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },

            function() {
                var thisbox = $('#_5b, #_5c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_5b, #_5c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                                      function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },
            function() {
                var thisbox = $('#_6b, #_6c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_6b, #_6c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                                    function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },
            function() {
                var thisbox = $('#_7b, #_7c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_7b, #_7c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                                      function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },
            function() {
                var thisbox = $('#_8b, #_8c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_8b, #_8c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                                      function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },
            function() {
                var thisbox = $('#_9b, #_9c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_9b, #_9c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                                    function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },
            function() {
                var thisbox = $('#_10b, #_10c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_10b, #_10c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                                   function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },
            function() {
                var thisbox = $('#_11b, #_11c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_11b, #_11c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                                   function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },
            function() {
                var thisbox = $('#_12b, #_12c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_12b, #_12c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                                    function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },
            function() {
                var thisbox = $('#_13b, #_13c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_13b, #_13c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                                     function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            },
            function() {
                var thisbox = $('#_14b, #_14c')
                thisbox.addClass("danger")
            },

            function() {
                var thisbox = $('#_14b, #_14c')
                if (thisbox.hasClass("danger" && "active")) {
                    health--
                    playGruntSound()
                    $('.health').html(health);
                    var indexMissBox = 0

                    function failed() {
                        var missed = [
                            function() {
                                $('.health').html(health);
                            },
                            function() {
                                thisbox.removeClass("danger")
                            },
                                                   function() {
                                thisbox.addClass("missed")
                                 setTimeout(function() {
                               thisbox.removeClass("missed")
                                ;
                                }, 2000);
                            }
                        ]
                        var handleMissedBox = window.setInterval(function() {
                            if (indexMissBox < missed.length) {

                                missed[indexMissBox++]();
                            } else {
                                window.clearInterval(handleMissedBox)
                            }
                        }, 10)
                    }
                    failed()

                } else {
                    thisbox.removeClass("danger")
                }
            }




        ]

        var index = 0

        var handle = window.setInterval(function() {
            if (index < shooting.length) {
                shooting[index++]();
            } else {
                window.clearInterval(handle)
            }
        }, 110)
    }
    setInterval(function() { punchHere(), failed() }, 700)


if(hardmode = true){
    setInterval(function() { shootDanger() }, randomTimer * 1000)
}
//end of danger, back to safety, whew...






var timerId = setInterval(countdown, 1000);
var milliId = setInterval(millisecond, 10)

function millisecond() {
    var elem = document.getElementById('millisecond');
  if (milliLeft == 0) {
    clearTimeout(milliLeft)
    milliLeft = 99
    elem.innerHTML = 00;
  return

  } else {
    elem.innerHTML = milliLeft;
    milliLeft--;

  }
}

function countdown() {
    var elem = document.getElementById('showTime');
  if (timeLeft == 0) {
    clearTimeout(timerId);
    elem.innerHTML = 0
    milliLeft = 0
    alert("Time's Up \nYour score was :" + GlobalScore);
    location.reload();
  } else {
    elem.innerHTML = timeLeft;
    timeLeft--;

  }
}
//end of globalTimer




}
