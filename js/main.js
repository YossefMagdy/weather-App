
let date = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let CurrentDay = document.getElementById("CurrentDay")
let tomForcast = document.getElementById("tomForcast")
let AftertomForcast = document.getElementById("AftertomForcast")
let search = document.getElementById("search")
let contact = document.getElementById("contact")

let Month = monthNames[date.getMonth()]
let Today = days[date.getDay()]
let tomorrowday = null
if (date.getDay() + 1 > days.length - 1) {
  tomorrowday = days[1]
}
else {
  tomorrowday = days[date.getDay() + 1]
}

let After_tomorrow = null

if (date.getDay() + 2 > days.length - 1) {
  After_tomorrow = days[2]
}
else {
  After_tomorrow = days[date.getDay() + 2]
}



let LocationInfo = []
let CurrentWeath = []
let chanceofRain = {}

let tomWeath = [];
let tomWeath_mintemp = [];
let AfterTomWeath = []
let AfterTomWeath_mintemp = [];

search.addEventListener("keyup", () => {
  getcurrentDay(search.value.toLowerCase())
  getTomWeth(search.value.toLowerCase())
  getAfterTomWeth(search.value.toLowerCase())
})

search.addEventListener("keyup", (el) => {

  if (el.key == "Enter") {
    getcurrentDay(search.value.toLowerCase())
    getTomWeth(search.value.toLowerCase())
    getAfterTomWeth(search.value.toLowerCase())
  }
})


function locationopen() {
  getcurrentDay(search.value.toLowerCase())
  getTomWeth(search.value.toLowerCase())
  getAfterTomWeth(search.value.toLowerCase())
}



contact.addEventListener("click", (el) => {
  window.open("Contact.html", "_self")
})

async function getcurrentDay(country) {
  let res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8d4ee5dff1234e3fad9163803232102&q=${country}&days=1&aqi=yes&alerts=no`);
  res = await res.json()
  LocationInfo = res.location
  CurrentWeath = res.current
  chanceofRain = res.forecast.forecastday[0].day.daily_chance_of_rain;
  CurrentDisplay()
}
function CurrentDisplay() {
  temp = `
    <div class="p-3">
    <div class="days">
     <p class="float-start">${Today}</p>
     <p class="float-end" >${date.getDate()}${Month}</p>
     <div class="clearfix"></div>
   </div>
     <p class="mt-4 fs-4" >${LocationInfo.name},${LocationInfo.country}</p>
     <div class="d-flex justify-content-around align-items-center flex-wrap mt-5">
       <div class="degree">
         <h2 class="num" id="temp_C">${Math.floor(CurrentWeath.temp_c)}<sup>o</sup>c</h2>
       </div>
       <div class="icon">
         <img src="https:${CurrentWeath.condition.icon}"  class="" alt="">
       </div>
     </div>
    <div class="situation">
     <p class="mt-3" >${CurrentWeath.condition.text}</p>
    </div>
 <div class="forcast d-flex mt-4">
   <i class="fa-solid fa-umbrella fa-2x text-white-50 me-2"></i>
 <p class=" me-3 text-white-50">${chanceofRain}%</p>
 <i class="fa-solid fa-wind  text-white-50  fa-2x  me-2"></i>
 <p class=" me-3 text-white-50">${CurrentWeath.wind_kph}km/hr</p>
 <i class="fa-regular fa-compass  text-white-50  fa-2x me-2"></i>
 <p class=" me-2 text-white-50">${CurrentWeath.wind_dir}</p>
 </div>
 </div>
    `;
  CurrentDay.innerHTML = temp
}
getcurrentDay("Egypt")

async function getTomWeth(country) {
  let res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8d4ee5dff1234e3fad9163803232102&q=${country}&days=2&aqi=yes&alerts=no`);
  res = await res.json()
  tomWeath = res.forecast.forecastday
  tomWeath_mintemp = tomWeath[1].day

  let time = new Date().getHours()

  tomWeath = tomWeath[1].hour.filter((el)=>{
    
    return el.time.includes(`${time}`)==true
  })
  tomWeath=tomWeath[0]

  
  

  tomDisplay()
}
function tomDisplay() {
  let temp =
    `
  <div class="p-3">
                  <div class="days">
                    <p>${tomorrowday}</p>
                  </div>
                  <img src="https:${tomWeath.condition.icon}" class="mt-4" alt="">
                  <h2 class=" fs-2 mt-4 text-white">${tomWeath.temp_c
    }<sup>o</sup>C</h2>
                  <p class="text-white-50">${tomWeath_mintemp.mintemp_c
    }<sup>o</sup></p>
                  <div class="situation">
                    <p >${tomWeath.condition.text}</p>
                   </div>
          </div>
  `
  tomForcast.innerHTML = temp
}

getTomWeth("Egypt")

async function getAfterTomWeth(country) {
  let res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8d4ee5dff1234e3fad9163803232102&q=${country}&days=3&aqi=yes&alerts=no`);
  res = await res.json()
  AfterTomWeath = res.forecast.forecastday
  AfterTomWeath_mintemp=AfterTomWeath[0].day
  
  let makedata = date.getFullYear()
  let time = new Date().getHours()
  
  AfterTomWeath = AfterTomWeath[2].hour.filter((el)=>{
    
    return el.time.includes(`${time}`)==true
  })
  AfterTomWeath=AfterTomWeath[0]
  

  AftertomDisplay()

}

function AftertomDisplay() {
  let temp =
    `
  <div class="p-3">
                  <div class="days">
                    <p>${After_tomorrow}</p>
                  </div>
                  <img src="https:${AfterTomWeath.condition.icon}" class="mt-4" alt="">
                  <h2 class=" fs-2 mt-4 text-white">${AfterTomWeath.temp_c
    }<sup>o</sup>C</h2>
                  <p class="text-white-50">${AfterTomWeath_mintemp.mintemp_c
    }<sup>o</sup></p>
                  <div class="situation">
                    <p >${AfterTomWeath.condition.text}</p>
                   </div>
          </div>
  `

  AftertomForcast.innerHTML = temp
}
getAfterTomWeth("egypt")