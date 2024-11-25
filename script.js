var selectedtime = 25
let selected = 1
let pomodorotime = "25:00"
let shorttime = "5:00"
let longtime = "15:00"
let pomodorominutes = 25
let shortminutes = 5
let longminutes = 15
let running = false
let cyclecount = 4
let theme = 0
let notificationds = false
const pad = v => `00${v}`.slice(-2)
const hours = m => Math.floor((m / 3600000) % 24)
const minutes = m => Math.floor((m / 60000) % 60)
const seconds = m => Math.floor((m / 1000) % 60)
const render = v => {
  if (pomodorominutes > 59 || shortminutes > 59 || longminutes > 59) {
    timervalue.innerHTML = pad(hours(v)) + ":" + pad(minutes(v)) + ":" + pad(seconds(v))
  } else {
    timervalue.innerHTML = pad(minutes(v)) + ":" + pad(seconds(v))
  }

  if (selected == 1) {
    title.innerHTML = "Pomodoro - " + pad(minutes(v)) + ":" + pad(seconds(v))
  }
  if (selected == 2) {
    title.innerHTML = "Īsa atpūta - " + pad(minutes(v)) + ":" + pad(seconds(v))
  }
  if (selected == 3) {
    title.innerHTML = "Ilga atpūta - " + pad(minutes(v)) + ":" + pad(seconds(v))
  }
  if (pad(minutes(v)) == 0 && pad(seconds(v)) == 0) {
    if (pause) {
      barrunning = false
      clearInterval(timer)
      startbutton.innerHTML = "Restartēt"
      timer = false
      addedsec = 0
      clearbar()
    }else {
      clearInterval(timer)
      next()
    }
  }
} //Parāda atlikušo laiku un maina virsrakstu
let addedsec = 0
let timer = false
let end = 0
var duration = 60000 * selectedtime
var remaining = duration
let data = {
  seconds1: 0,
  minutes1: 0,
  hours1: 0,
  seconds2: 0,
  minutes2: 0,
  hours2: 0,
  vids1: 0,
  vidm1: 0,
  counter1: 0,
  vids2: 0,
  vidm2: 0,
  counter2: 0,
};
let data_serl = []
let data_deserl = []
let parsed = []
let pause = false
let barrunning = false
let colorcycle = false
document.getElementById("pause").checked = false;
document.getElementById("notifications").checked = false;
document.getElementById("themech").checked = false;
cyclecounter.innerHTML = "Atlikušie cikli: " + cyclecount

var elem = document.getElementById("bar");
var width = 4;
let id = setInterval(frame, 500)
function frame() {
  if (barrunning) {
    if (width >= 100) {
      
    } else {
      if (selected == 1) {
        width = width + 0.83 / pomodorominutes;
      } else if (selected == 2) {
        width = width + 0.83 / shortminutes;
      } else {
        width = width + 0.83 / longminutes;
      }
    }
    elem.style.width = width + "%";
  }
}
function clearbar() {
  width = 2;
  elem.style.width = width + "%";
}

function starttimer() {
  if (timer) {
    addedsec = 0
    startbutton.innerHTML = "Turpināt"
    document.getElementById("nextbutton").style.visibility = "hidden";
    document.getElementById("restartbutton").style.visibility = "hidden";
    clearInterval(timer)
    timer = false
    barrunning = false
    remaining = end - Date.now()
    render(remaining)
  } else {
    addedsec = 1
    running = true
    barrunning = true
    document.getElementById("nextbutton").style.visibility = "visible";
    document.getElementById("restartbutton").style.visibility = "visible";
    startbutton.innerHTML = "Pauzēt"
    end = Date.now() + remaining
    timer = setInterval(() => {
      render(end - Date.now())
    }, 16)
  }
} //Sāk/Pauzē pulksteni
function restartimer() {
  barrunning = false
  clearbar()
  addedsec = 0
  startbutton.innerHTML = "Sākt"
  running = false
  document.getElementById("nextbutton").style.visibility = "hidden";
  document.getElementById("restartbutton").style.visibility = "hidden";
  clearInterval(timer)
  timer = false
  remaining = duration
  render(remaining)
} //Restartē pulksteni
function next() {
  if (selected == 1) {
    data = {
      seconds1: parsed.seconds1,
      minutes1: parsed.minutes1,
        hours1: parsed.hours1,
        seconds2: parsed.seconds2,
        minutes2: parsed.minutes2,
        hours2: parsed.hours2,
        vids1: parsed.vids1,
        vidm1: parsed.vidm1,
        counter1: parsed.counter1 + 1,
        vids2: parsed.vids2,
        vidm2: parsed.vidm2,
        counter2: parsed.counter2
    };
  }
  if (selected == 2 || selected == 3) {
    data = {
      seconds1: parsed.seconds1,
      minutes1: parsed.minutes1,
      hours1: parsed.hours1,
      seconds2: parsed.seconds2,
      minutes2: parsed.minutes2,
      hours2: parsed.hours2,
      vids1: parsed.vids1,
      vidm1: parsed.vidm1,
      counter1: parsed.counter1,
      vids2: parsed.vids2,
      vidm2: parsed.vidm2,
      counter2: parsed.counter2 + 1
    };
  }
  savedata()
  showdata()
  if (selected == 1) {
    if (cyclecount == 0) {
      if (notificationds == 1) {
        new Notification("Pomodoro taimeris ir beidzies", {
          body: "Jums ir tagat ir ilgāks laiks atpūsties",
        })
      }
      if (colorcycle) {
        longcolor()
        document.getElementById("Long").style.backgroundColor = "#4B4A2C";
      } else {
        document.getElementById("Long").style.backgroundColor = "#26313F";
      }
      document.getElementById("Short").style.backgroundColor = "#1E1F24";
      document.getElementById("Pomodoro").style.backgroundColor = "#1E1F24";
      cyclecounter.innerHTML = "Cikls ir beidzies"
      var selectedtime = longminutes
      duration = 60000 * selectedtime
      selected = 3
    } else {
      if (notificationds == 1) {
        new Notification("Pomodoro taimeris ir beidzies", {
          body: "Jums ir tagat ir īss laiks atpūsties",
        })
      }
      if (colorcycle) {
        shortcolor()
        document.getElementById("Short").style.backgroundColor = "#384E39";
      } else {
        document.getElementById("Short").style.backgroundColor = "#26313F";
      }
      document.getElementById("Pomodoro").style.backgroundColor = "#1E1F24";
      document.getElementById("Long").style.backgroundColor = "#1E1F24";

      var selectedtime = shortminutes
      duration = 60000 * selectedtime
      selected = 2
    }
  } else if (selected == 2) {
    if (notificationds == 1) {
      new Notification("Īsā atpūta ir beigusies", {
        body: "Jums ir tagat ir jāsāk strādāt",
      })
    }
    if (colorcycle) {
      pomocolor()
      document.getElementById("Pomodoro").style.backgroundColor = "#5C403C";
    } else {
      document.getElementById("Pomodoro").style.backgroundColor = "#26313F";
    }
    document.getElementById("Short").style.backgroundColor = "#1E1F24";
    document.getElementById("Long").style.backgroundColor = "#1E1F24";
    var selectedtime = pomodorominutes
    duration = 60000 * selectedtime
    selected = 1
    cyclecount--
    if (cyclecount == 0) {
      cyclecounter.innerHTML = "Pēdejais cikls"
    } else {
      cyclecounter.innerHTML = "Atlikušie cikli: " + cyclecount
    }
  } else {
    if (notificationds == 1) {
      new Notification("Ilgā atpūta ir beigusies", {
        body: "Jums ir tagat ir jāsāk strādāt",
      })
    }
    if (colorcycle) {
      pomocolor()
      document.getElementById("Pomodoro").style.backgroundColor = "#5C403C";
    } else {
      document.getElementById("Pomodoro").style.backgroundColor = "#26313F";
    }
    document.getElementById("Short").style.backgroundColor = "#1E1F24";
    document.getElementById("Long").style.backgroundColor = "#1E1F24";
    var selectedtime = pomodorominutes
    duration = 60000 * selectedtime
    selected = 1
    cyclecount = interval.value
    cyclecounter.innerHTML = "Atlikušie cikli: " + cyclecount
  }
  clearbar()
  remaining = duration
  startbutton.innerHTML = "Pauzēt"
  running = true
  clearInterval(timer)
  timer = false
  remaining = duration
  render(remaining)
  starttimer()
} //Pārslēdz pulksteni uz nākamo cikli

function pomodoro() {
  if (!running) {
    if (theme == 0) {
      if (colorcycle) {
        pomocolor()
        document.getElementById("Pomodoro").style.backgroundColor = "#5C403C";
        document.getElementById("Short").style.backgroundColor = "#1E1F24";
        document.getElementById("Long").style.backgroundColor = "#1E1F24";
      } else {
        document.getElementById("Pomodoro").style.backgroundColor = "#26313F";
        document.getElementById("Short").style.backgroundColor = "#1E1F24";
        document.getElementById("Long").style.backgroundColor = "#1E1F24";
      }
    } else {
      document.getElementById("Pomodoro").style.backgroundColor = "#005A96";
      document.getElementById("Short").style.backgroundColor = "#ACCCE3";
      document.getElementById("Long").style.backgroundColor = "#ACCCE3";
    }
    timervalue.innerHTML = pomodorotime
    var selectedtime = pomodorominutes
    duration = 60000 * selectedtime
    remaining = duration
    clearInterval(timer)
    selected = 1
  }
} //Pārslēdz uz Pomodoro ciklu
function short() {
  if (!running) {
    if (theme == 0) {
      if (colorcycle) {
        shortcolor()
        document.getElementById("Short").style.backgroundColor = "#384E39";
        document.getElementById("Pomodoro").style.backgroundColor = "#1E1F24";
        document.getElementById("Long").style.backgroundColor = "#1E1F24";
      } else {
        document.getElementById("Short").style.backgroundColor = "#26313F";
        document.getElementById("Pomodoro").style.backgroundColor = "#1E1F24";
        document.getElementById("Long").style.backgroundColor = "#1E1F24";
      }
    } else {
      document.getElementById("Short").style.backgroundColor = "#005A96";
      document.getElementById("Pomodoro").style.backgroundColor = "#ACCCE3";
      document.getElementById("Long").style.backgroundColor = "#ACCCE3";
    }
    timervalue.innerHTML = shorttime
    var selectedtime = shortminutes
    duration = 60000 * selectedtime
    remaining = duration
    clearInterval(timer)
    selected = 2
  }
} //Pārslēdz uz Īsas atpūtas ciklu
function long() {
  if (!running) {
    if (theme == 0) {
      if (colorcycle) {
        longcolor()
        document.getElementById("Short").style.backgroundColor = "#1E1F24";
        document.getElementById("Pomodoro").style.backgroundColor = "#1E1F24";
        document.getElementById("Long").style.backgroundColor = "#4B4A2C";
      } else {
        document.getElementById("Short").style.backgroundColor = "#1E1F24";
        document.getElementById("Pomodoro").style.backgroundColor = "#1E1F24";
        document.getElementById("Long").style.backgroundColor = "#26313F";
      }
      
    } else {
      document.getElementById("Short").style.backgroundColor = "#ACCCE3";
      document.getElementById("Pomodoro").style.backgroundColor = "#ACCCE3";
      document.getElementById("Long").style.backgroundColor = "#005A96";
    }

    timervalue.innerHTML = longtime
    var selectedtime = longminutes
    duration = 60000 * selectedtime
    remaining = duration
    clearInterval(timer)
    selected = 3
  }

} //Pārslēdz uz Ilgas atpūtas ciklu

function togglePopup() {
  var popup = document.getElementById("settingsPopup");
  var overlay = document.getElementById("overlay");
  if (popup.style.display === "none") {
    popup.style.display = "block";
    overlay.style.display = "block";
  } else {
    maxinputmessage.innerHTML = ""
    selectedtime = pomotime.value
    duration = 60000 * selectedtime
    remaining = duration
    pomodorominutes = pomotime.value
    shortminutes = shorttime1.value
    longminutes = longtime1.value
    pomodorotime = selectedtime + ":" + "00"
    shorttime = shortminutes + ":" + "00"
    longtime = longminutes + ":" + "00"
    cyclecount = Number(interval.value)
    cyclecounter.innerHTML = "Atlikušie cikli: " + cyclecount
    if (selected == 1) {
      timervalue.innerHTML = pomodorotime
    }
    if (selected == 2) {
      timervalue.innerHTML = shorttime
    }
    if (selected == 3) {
      timervalue.innerHTML = longtime
    }
    if (pomodorominutes > 0 && pomodorominutes < 61) {
      if (shortminutes > 0 && shortminutes < 61) {
        if (longminutes > 0 && longminutes < 61) {
          popup.style.display = "none";
          overlay.style.display = "none";
        } else {
          maxinputmessage2.innerHTML = "Ievadiet laiku no 1 līdz 60 minūtēm!"
        }
      } else {
        maxinputmessage3.innerHTML = "Ievadiet laiku no 1 līdz 60 minūtēm!"
      }
    } else {
      maxinputmessage.innerHTML = "Ievadiet laiku no 1 līdz 60 minūtēm!"
    }

  }
} //Istatījumu popups
function togglePopup1() {
  var popup1 = document.getElementById("morePopup");
  var overlay1 = document.getElementById("overlay1");
  if (popup1.style.display === "none") {
    popup1.style.display = "block";
    overlay1.style.display = "block";
  } else {
    popup1.style.display = "none";
    overlay1.style.display = "none";
  }
} //Statistikas popups
function themechange() {
  if (theme == 0) { //roast this coding to medium rare
    document.getElementById("page").style.backgroundColor = "white";
    document.getElementById("title1").style.color = "#005B94";
    document.getElementById("more1").style.color = "black";
    document.getElementById("more2").style.color = "black";
    document.getElementById("more1").style.backgroundColor = "white";
    document.getElementById("more2").style.backgroundColor = "white";
    document.getElementById("main").style.backgroundColor = "#E5F3FE";
    document.getElementById("restartbutton").style.backgroundColor = "#005A96";
    document.getElementById("restartbutton").style.color = "white";
    document.getElementById("startbutton").style.backgroundColor = "#005A96";
    document.getElementById("startbutton").style.color = "white";
    document.getElementById("nextbutton").style.backgroundColor = "#005A96";
    document.getElementById("nextbutton").style.color = "white";
    document.getElementById("Pomodoro").style.color = "#EBF5FF";
    document.getElementById("Pomodoro").style.backgroundColor = "#ACCCE3";
    document.getElementById("Short").style.color = "#EBF5FF";
    document.getElementById("Short").style.backgroundColor = "#ACCCE3";
    document.getElementById("Long").style.color = "#EBF5FF";
    document.getElementById("Long").style.backgroundColor = "#ACCCE3";
    document.getElementById("timervalue").style.color = "black";
    document.getElementById("cyclecounter").style.color = "black";
    document.getElementById("progressbar").style.backgroundColor = "lightgray";
    document.getElementById("settingsPopup").style.backgroundColor = "darkgray";
    document.getElementById("settingsPopup").style.color = "black";
    document.getElementById("morePopup").style.backgroundColor = "darkgray";
    document.getElementById("morePopup").style.color = "black";
    document.getElementById("bar").style.borderColor = "#D3D3D3";
    theme = 1
  } else {
    darkcolor()
    theme = 0
  }
} //Nomaina režīmu
function colorchange() {
    if (colorcycle == false) {
      if (theme == 1) {
      themechange()
      }
      document.getElementById("themech").checked = false;
      document.getElementById("themech").disabled = true;
      colorcycle = true
      if (selected == 1) {
        pomocolor()
      }
      if (selected == 2) {
        shortcolor()
      }
      if (selected == 3) {
        longcolor()
      }
    } else {
      colorcycle = false
      document.getElementById("themech").disabled = false;
      darkcolor()
    }

} //Use 3 colors for the timer cycles
function darkcolor() {
  document.getElementById("page").style.backgroundColor = "#1A191F";
  document.getElementById("title1").style.color = "#9ED5FF";
  document.getElementById("more1").style.color = "#8699A7";
  document.getElementById("more2").style.color = "#8699A7";
  document.getElementById("more1").style.backgroundColor = "#1A191F";
  document.getElementById("more2").style.backgroundColor = "#1A191F";
  document.getElementById("main").style.backgroundColor = "#1E1F24";
  document.getElementById("restartbutton").style.backgroundColor = "#9ED5FF";
  document.getElementById("restartbutton").style.color = "#182244";
  document.getElementById("startbutton").style.backgroundColor = "#9ED5FF";
  document.getElementById("startbutton").style.color = "#182244";
  document.getElementById("nextbutton").style.backgroundColor = "#9ED5FF";
  document.getElementById("nextbutton").style.color = "#182244";
  document.getElementById("Pomodoro").style.color = "#9ED5FB";
  document.getElementById("Pomodoro").style.backgroundColor = "#26313F";
  document.getElementById("Short").style.color = "#9ED5FB";
  document.getElementById("Short").style.backgroundColor = "#26313F";
  document.getElementById("Long").style.color = "#9ED5FB";
  document.getElementById("Long").style.backgroundColor = "#26313F";
  document.getElementById("timervalue").style.color = "white";
  document.getElementById("cyclecounter").style.color = "white";
  document.getElementById("progressbar").style.backgroundColor = "#4F4F4F";
  document.getElementById("settingsPopup").style.backgroundColor = "#1E1F24";
  document.getElementById("settingsPopup").style.color = "#ACC1D2";
  document.getElementById("morePopup").style.backgroundColor = "#1E1F24";
  document.getElementById("morePopup").style.color = "#ACC1D2";
  document.getElementById("bar").style.backgroundColor = "#8BC6FE";
  document.getElementById("bar").style.borderColor = "#4F4F4F";
} //Dark mode
function pomocolor() {
  document.getElementById("title1").style.color = "#E7000A";
  document.getElementById("more1").style.color = "#F3DED9";
  document.getElementById("more2").style.color = "#F3DED9";
  document.getElementById("more1").style.backgroundColor = "#1A191F";
  document.getElementById("more2").style.backgroundColor = "#1A191F";
  document.getElementById("restartbutton").style.backgroundColor = "#8D0801";
  document.getElementById("restartbutton").style.color = "#E3BEB6";
  document.getElementById("startbutton").style.backgroundColor = "#8D0801";
  document.getElementById("startbutton").style.color = "#E3BEB6";
  document.getElementById("nextbutton").style.backgroundColor = "#8D0801";
  document.getElementById("nextbutton").style.color = "#E3BEB6";
  document.getElementById("Pomodoro").style.color = "#F3DED9";
  document.getElementById("Pomodoro").style.backgroundColor = "#5C403C";
  document.getElementById("Short").style.color = "#F3DED9";
  document.getElementById("Short").style.backgroundColor = "#5C403C";
  document.getElementById("Long").style.color = "#F3DED9";
  document.getElementById("Long").style.backgroundColor = "#5C403C";
  document.getElementById("bar").style.backgroundColor = "#E7000A";
} //Red mode
function shortcolor() {
  document.getElementById("title1").style.color = "#00D434";
  document.getElementById("more1").style.color = "#DAE8D9";
  document.getElementById("more2").style.color = "#DAE8D9";
  document.getElementById("more1").style.backgroundColor = "#1A191F";
  document.getElementById("more2").style.backgroundColor = "#1A191F";
  document.getElementById("restartbutton").style.backgroundColor = "#384E39";
  document.getElementById("restartbutton").style.color = "#DBE9DA";
  document.getElementById("startbutton").style.backgroundColor = "#384E39";
  document.getElementById("startbutton").style.color = "#DBE9DA";
  document.getElementById("nextbutton").style.backgroundColor = "#384E39";
  document.getElementById("nextbutton").style.color = "#DBE9DA";
  document.getElementById("Pomodoro").style.color = "#DAE8D9";
  document.getElementById("Pomodoro").style.backgroundColor = "#384E39";
  document.getElementById("Short").style.color = "#DAE8D9";
  document.getElementById("Short").style.backgroundColor = "#384E39";
  document.getElementById("Long").style.color = "#DAE8D9";
  document.getElementById("Long").style.backgroundColor = "#384E39";
  document.getElementById("bar").style.backgroundColor = "#00D434";
} //Green mode
function longcolor() {
  document.getElementById("title1").style.color = "#C5B500";
  document.getElementById("more1").style.color = "#E4E6D0";
  document.getElementById("more2").style.color = "#E4E6D0";
  document.getElementById("more1").style.backgroundColor = "#1A191F";
  document.getElementById("more2").style.backgroundColor = "#1A191F";
  document.getElementById("restartbutton").style.backgroundColor = "#C5B500";
  document.getElementById("restartbutton").style.color = "black";
  document.getElementById("startbutton").style.backgroundColor = "#C5B500";
  document.getElementById("startbutton").style.color = "black";
  document.getElementById("nextbutton").style.backgroundColor = "#C5B500";
  document.getElementById("nextbutton").style.color = "black";
  document.getElementById("Pomodoro").style.color = "#CFCBA6";
  document.getElementById("Pomodoro").style.backgroundColor = "#4B4A2C";
  document.getElementById("Short").style.color = "#CFCBA6";
  document.getElementById("Short").style.backgroundColor = "#4B4A2C";
  document.getElementById("Long").style.color = "#CFCBA6";
  document.getElementById("Long").style.backgroundColor = "#4B4A2C";
  document.getElementById("bar").style.backgroundColor = "#FFEE58";
} //Yelloww mode
function enablenotifications() {
  Notification.requestPermission().then(perm => {
    notificationmessage.innerHTML = ""
    if (perm === "granted" && notificationds == false) {
      notificationds = true
      new Notification("Paziņojumi ir ieslēgti", {
        body: "Jūs saņemsiet paziņojumus par taimera beigšanu un sākšanu",
      })
    } else {
      notificationds = false
      new Notification("Paziņojumi ir izslēgti", {
        body: "Jūs vairs nesaņemsiet paziņojumus par taimera beigšanu un sākšanu",
      })
    }
    if (perm === "denied") {
      notificationmessage.innerHTML = "Atļaujiet paziņojumus!"
      document.getElementById("notifications").checked = false;
    }
  })
} //Ieslēdz/Izslēdz paziņojumus
function enablepause() {
  if (pause) {
    pause = false
  } else {
    pause = true
  }
} //Pauzēt pēc taimera pabeigšanas

function checkdata() {
  data_deserl = JSON.parse(localStorage.getItem("Saveddata"));
  if (data_deserl == null || data_deserl == "null") {
    deletedata()
  }
  showdata()
} //Pārbauda vai ir saglabāti dati, ja nav, saglabā
function savedata() {
  data_serl = JSON.stringify([data]);
  localStorage.setItem("Saveddata", data_serl);
} //Saglabā pašreiz iestatītos datus
function showdata() {
  data_deserl = JSON.parse(localStorage.getItem("Saveddata"));
  parsed = data_deserl[0];
  focustime.innerHTML = "Kopējias fokussa laiks: " + parsed.hours1 + ":" + parsed.minutes1 + ":" + parsed.seconds1
  pausetime.innerHTML = "Kopējais atpūtas laiks: " + parsed.hours2 + ":" + parsed.minutes2 + ":" + parsed.seconds2
  focuscycles.innerHTML = "Kopējie fokussa cikli: " + parsed.counter1
  pausecycles.innerHTML = "Kopējie atpūtas cikli: " + parsed.counter2
  let num1 = parsed.vidm1 / parsed.counter1
  let num11 = parsed.vids1 / parsed.counter1
  let num2 = parsed.vidm2 / parsed.counter2
  let num22 = parsed.vids2 / parsed.counter2
  if (parsed.counter1 >= 1) {
    focustimevid.innerHTML = "Vidējais fokuss laiks: ~ " + num1.toFixed(1) + ":" + num11.toFixed(1)
  } else {
    focustimevid.innerHTML = "Vidējais fokuss laiks: ~ 00:00"
  }
  if (parsed.counter2 >= 1) {
    pausetimevid.innerHTML = "Vidējais atpūtas laiks: ~ " + num2.toFixed(1) + ":" + num22.toFixed(1)
  } else {
    pausetimevid.innerHTML = "Vidējais atpūtas laiks: ~ 00:00"
  }
  
} //Parāda saglabātos datus 
function deletedata() {
  data = {
    seconds1: 0,
    minutes1: 0,
    hours1: 0,
    seconds2: 0,
    minutes2: 0,
    hours2: 0,
    vids1: 0,
    vidm1: 0,
    counter1: 0,
    vids2: 0,
    vidm2: 0,
    counter2: 0,
  };
  data_serl = JSON.stringify([data]);
  localStorage.setItem("Saveddata", data_serl);
  showdata()
} //Izdzēšs saglabātos datus
setInterval(function() {
  if (selected == 1) {
    data = {
      seconds1: parsed.seconds1 + addedsec,
      minutes1: parsed.minutes1,
        hours1: parsed.hours1,
        seconds2: parsed.seconds2,
        minutes2: parsed.minutes2,
        hours2: parsed.hours2,
        vids1: parsed.vids1 + addedsec,
        vidm1: parsed.vidm1,
        counter1: parsed.counter1,
        vids2: parsed.vids2,
        vidm2: parsed.vidm2,
        counter2: parsed.counter2
    };
    if (parsed.seconds1 == 59) {
      data = {
        seconds1: 0,
        minutes1: parsed.minutes1 + 1,
        hours1: parsed.hours1,
        seconds2: parsed.seconds2,
        minutes2: parsed.minutes2,
        hours2: parsed.hours2,
        vids1: parsed.vids1,
        vidm1: parsed.vidm1,
        counter1: parsed.counter1,
        vids2: parsed.vids2,
        vidm2: parsed.vidm2,
        counter2: parsed.counter2
      };
    }
    if (parsed.vids1 == 59) {
      data = {
        seconds1: 0,
        minutes1: parsed.minutes1 + 1,
        hours1: parsed.hours1,
        seconds2: parsed.seconds2,
        minutes2: parsed.minutes2,
        hours2: parsed.hours2,
        vids1: 0,
        vidm1: parsed.vidm1 + 1,
        counter1: parsed.counter1,
        vids2: parsed.vids2,
        vidm2: parsed.vidm2,
        counter2: parsed.counter2
      };
    }
    if (parsed.minutes1 == 59 && parsed.seconds1 == 59) {
      data = {
        seconds1: 0,
        minutes1: 0,
        hours1: parsed.hours1 + 1,
        seconds2: parsed.seconds2,
        minutes2: parsed.minutes2,
        hours2: parsed.hours2,
        vids1: parsed.vids1,
        vidm1: parsed.vidm1,
        counter1: parsed.counter1,
        vids2: parsed.vids2,
        vidm2: parsed.vidm2,
        counter2: parsed.counter2
      };
    }
  }
  if (selected == 2 || selected == 3) {
    data = {
      seconds1: parsed.seconds1,
      minutes1: parsed.minutes1,
      hours1: parsed.hours1,
      seconds2: parsed.seconds2 + addedsec,
      minutes2: parsed.minutes2,
      hours2: parsed.hours2,
      vids1: parsed.vids1,
      vidm1: parsed.vidm1,
      counter1: parsed.counter1,
      vids2: parsed.vids2 + addedsec,
      vidm2: parsed.vidm2,
      counter2: parsed.counter2
    };
    if (parsed.seconds2 == 59) {
      data = {
        seconds1: parsed.seconds1,
        minutes1: parsed.minutes1,
        hours1: parsed.hours1,
        seconds2: 0,
        minutes2: parsed.minutes2 + 1,
        hours2: parsed.hours2,
        vids1: parsed.vids1,
        vidm1: parsed.vidm1,
        counter1: parsed.counter1,
        vids2: parsed.vids2,
        vidm2: parsed.vidm2,
        counter2: parsed.counter2
      };
    }
    if (parsed.vids2 == 59) {
      data = {
        seconds1: 0,
        minutes1: parsed.minutes1,
        hours1: parsed.hours1,
        seconds2: parsed.seconds2,
        minutes2: parsed.minutes2,
        hours2: parsed.hours2,
        vids1: parsed.vids1,
        vidm1: parsed.vidm1,
        counter1: parsed.counter1,
        vids2: 0,
        vidm2: parsed.vidm2  + 1,
        counter2: parsed.counter2
      };
    }
    if (parsed.minutes2 == 59 && parsed.seconds2 == 59) {
      data = {
        seconds1: parsed.seconds1,
        minutes1: parsed.minutes1,
        hours1: parsed.hours1,
        seconds2: 0,
        minutes2: 0,
        hours2: parsed.hours2 + 1,
        vids1: parsed.vids1,
        vidm1: parsed.vidm1,
        counter1: parsed.counter1,
        vids2: parsed.vids2,
        vidm2: parsed.vidm2,
        counter2: parsed.counter2
      };
    }
  }
  
  savedata()
  showdata()
}, 1000); //Ja taimers strādā, iestata un saglabā jaunus datus
setInterval(function() {
  var w = document.documentElement.clientWidth || window.innerWidth;
  if (w <= 470) {
    title1.innerHTML = "Pomodoro"
  } else {
    title1.innerHTML = "Pomodoro timers"
  }
}, 500); //Changes the title if screen width too small