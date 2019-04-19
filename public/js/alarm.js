// const express = require('express');
// const router = express.Router();
// const knex = require('../knex');
// const bcrypt = require('bcrypt');
// const passport = require('../auth/local');



// converts seconds to hour:min:sec format
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

// router.get('/', isLoggedIn, (req, res, next) => {
//   knex('users')
//     .select(['snooze'])
//     .where('users.id', req.user.id)
// });

var ac = {
  init : function () {
  // ac.init() : start the alarm clock

    // Get the current time - hour, min, seconds
    ac.chr = document.getElementById("chr");
    ac.cmin = document.getElementById("cmin");
    ac.csec = document.getElementById("csec");

    // The time picker - Hr, Min, Sec
    ac.thr = ac.createSel(23);
    document.getElementById("tpick-h").appendChild(ac.thr);
    ac.thm = ac.createSel(59);
    document.getElementById("tpick-m").appendChild(ac.thm);
    ac.ths = ac.createSel(59);
    document.getElementById("tpick-s").appendChild(ac.ths);

    // The time picker - Set, reset
    ac.tset = document.getElementById("tset");
    ac.tset.addEventListener("click", ac.set);
    ac.treset = document.getElementById("treset");
    ac.treset.addEventListener("click", ac.reset);

    // The alarm sound
    ac.sound = document.getElementById("alarm-sound");

    // Start the clock
    ac.alarm = null;
    setInterval(ac.tick, 1000);
  },

  createSel : function (max) {
  // createSel() : support function - creates a selector for hr, min, sec

    var selector = document.createElement("select");
    for (var i=0; i<=max; i++) {
      var opt = document.createElement("option");
      i = ac.padzero(i);
      opt.value = i;
      opt.innerHTML = i;
      selector.appendChild(opt);
    }
    return selector
  },

  padzero : function (num) {
  // ac.padzero() : support function - pads hr, min, sec with 0 if <10

    if (num < 10) { num = "0" + num; }
    else { num = num.toString(); }
    return num;
  },


  tick : function () {
  // ac.tick() : update the current time

    // Current time
    var now = new Date();
    var hr = ac.padzero(now.getHours());
    var min = ac.padzero(now.getMinutes());
    var sec = ac.padzero(now.getSeconds());

    // Update current clock
    ac.chr.innerHTML = hr;
    ac.cmin.innerHTML = min;
    // ac.csec.innerHTML = sec;

    // Update the timeLeft div

    //console.log(String(hrToSeconds-1).toHHMMSS());
    var tMinus = document.getElementById("timeLeft").innerHTML;
    var tMinusToDisplay = parseInt(tMinus)-1;
    document.getElementById("timeLeft").innerHTML = parseInt(tMinus)-1;
    document.getElementById("timeLeftDisplay").innerHTML = String(tMinusToDisplay).toHHMMSS();

    // Check and sound alarm
    if (ac.alarm != null) {
      now = hr + min + sec;
      if (now == ac.alarm) {
        if (ac.sound.paused) {
          // ac.sound.play();
          // REDIRECT INSTEAD OF PLAY Alarm
          window.location.href = "../html/APItest.html";
        }
      }
    }
  },

  set : function () {
  // ac.set() : set the alarm

    ac.alarm = ac.thr.value + ac.thm.value + ac.ths.value;
    ac.thr.disabled = true;
    ac.thm.disabled = true;
    ac.ths.disabled = true;
    ac.tset.disabled = true;
    ac.treset.disabled = false;

    // document.getElementById("timeLeft").innerHTML = ac.thr.value+":"+ac.thm.value+":"+ac.ths.value;

    var hrToSeconds = parseInt(ac.thr.value)*60*60;
    var minToSeconds = parseInt(ac.thm.value)*60;
    var sToSeconds = parseInt(ac.ths.value);

    document.getElementById("timeLeft").innerHTML = String(hrToSeconds+minToSeconds+sToSeconds);

  },

  reset : function () {
  // ac.reset() : reset the alarm

    if (!ac.sound.paused) {
      ac.sound.pause();
    }
    ac.alarm = null;
    ac.thr.disabled = false;
    ac.thm.disabled = false;
    ac.ths.disabled = false;
    ac.tset.disabled = false;
    ac.treset.disabled = true;

    document.getElementById("timeLeft").innerHTML = 0;
    document.getElementById("timeLeftDisplay").innerHTML = 00+":"+00+":"+00;

  }
};

// INIT - RUN ALARM CLOCK
window.addEventListener("load", ac.init);
