// var nums = [2, 10, 9, 6, 12, 13];
// var totalSum = 0;
// for (var i in nums) {
//     totalSum += nums[i];
// }
// var numsCnt = nums.length;
// var average = totalSum / numsCnt;
// console.log('Average is: ' + average);
const currentWeatherItems = document.querySelector('.current-weather__items')
const weatherForcastItems = document.querySelector('.future-forecast')
const APIKey = '1d58bcdd6cca557e086295cfa18ae78a';

getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${APIKey}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeather(data);
        })
    })
}

function showWeather(data) {
    let { humidity } = data.current;
    let { temp } = data.daily[0];
    let { weather } = data.daily[0];
    let temperatures = [{}];
    let tempSum = 0;
    for (let i in temperatures) {
        tempSum += temperatures[i];
    }
    let tempNum = temperatures.length;
    let tempMean = tempSum / tempNum;

    currentWeatherItems.innerHTML =
        `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="icon" class="weather-icon">
        <div class="mean-temp">
            Mean temp: ${tempMean}° C
        </div >
        <div class="humidity">
            Humidity: ${humidity}%
        </div>
        <div class="all-day-temp">
            <div class="morning all-day-item">
                Morning
                <p>${temp.morn}°C</p>
            </div>
            <div class="evening all-day-item">
                Day
                <p>${temp.day}°C</p>
            </div>
            <div class="night all-day-item">
                Night
                <p>${temp.night}°C</p>
            </div>
        </div>`;

    let forcastWeather = ''
    data.daily.forEach((day, idx) => {
        if (idx == 0) {

        } else {
            forcastWeather += `
                <div class="future-forecast__item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="icon" class="weather-icon">
                <div class="min-max-temp">
                    <div class="min-temp">
                        L: ${day.temp.min}°C
                    </div>
                    <div class="max-temp">
                        H: ${day.temp.max}°C
                    </div>
                </div>
            </div>`
        }
    })

    weatherForcastItems.innerHTML = forcastWeather;
}

