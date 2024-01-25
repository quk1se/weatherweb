const hourly1 = document.getElementById("hourly1");
const hourly2 = document.getElementById("hourly2");
const hourly3 = document.getElementById("hourly3");
const hourly4 = document.getElementById("hourly4");
const hourly5 = document.getElementById("hourly5");

const day1 = document.getElementById("day1");
const day2 = document.getElementById("day2");
const day3 = document.getElementById("day3");
const day4 = document.getElementById("day4");
const day5 = document.getElementById("day5");

const weathernowimg = document.getElementById("weather-now-img");
const weathernowday = document.getElementById("weather-now-day");
const weathernowtemp = document.getElementById("weather-now-temp");
const weathernowdescr = document.getElementById("weather-now-descr");
const humidity = document.getElementById("humidity");
const feelslike = document.getElementById("feelslike");
const maxtemp = document.getElementById("maxtemp");
const mintemp = document.getElementById("mintemp");

const yourcityname = document.getElementById("your-city-name");

const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const population = document.getElementById("population");

let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let array = [hourly1,hourly2,hourly3,hourly4,hourly5]
let daysArray = [day1, day2, day3, day4, day5]
let hoursDataArray = ["","","","",""];
let daysDataArray = ["","","","",""];
const maxMinTemps = {};


const weatherState =
{
    "Clear": "weatherIcons/sun/clear.png",
    "Clouds": "weatherIcons/cloud/cloud.png",
    "Rain": "weatherIcons/rain/rain.png",
    "Thunderstorm": "weatherIcons/cloud/rainThunder.png",
    "Snow": "weatherIcons/cloud/snowCloud.png",
    "Mist": "weatherIcons/sun/mist.png",
    "Fog": "weatherIcons/sun/mist.png",
    "Smoke": "weatherIcons/sun/mist.png",
    "Haze": "weatherIcons/sun/haze.png",
    "Temp": "weatherIcons/maxMin.png",
    "Wind": "weatherIcons/windSpeed.png"
}

function searchWeather()
{
        const apiKey = "6cbac81e4bebc96d720e2bd1332730e1";

        let minTemperature = 10000;
        let maxTemperature = -10000;
        let city = document.getElementById("searchInput").value;
        let urlHours = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

        fetch(urlHours)
            .then(response => response.json())
            .then(data => {
                let timeString;
                let sunstime = data.city.sunrise;
                let sunretime = data.city.sunset;
                const sunriseDate = new Date(sunretime * 1000);
                const sunsetDate = new Date(sunstime * 1000);
                population.textContent = data.city.population;
                const options = { hour: '2-digit', minute: '2-digit', hour12: false };
                sunsetTime.textContent = sunriseDate.toLocaleTimeString('en-US', options);
                sunriseTime.textContent = sunsetDate.toLocaleTimeString('en-US', options);
                console.log(data);
                yourcityname.textContent = data.city.name.toUpperCase();
                for (let i = 0; i < 5; i++)
                {
                    const description = data.list[i].weather[0].main;
                    const forecastDateTime = new Date(data.list[i].dt_txt);
                    const hours = forecastDateTime.getHours();
                    const minutes = forecastDateTime.getMinutes();
                    const temperature = Math.round(data.list[i].main.temp - 273.15);
                    const icon = weatherState[data.list[i].weather[0].main];
                    const thishumidity = data.list[i].main.humidity;
                    const thisfeelslike = Math.round(data.list[i].main.feels_like - 273.15);

                    if (i == 0) 
                    {
                        timeString = "Now";
                        weathernowimg.src = icon;
                        weathernowtemp.textContent = temperature + '\u00B0';
                        weathernowdescr.textContent = description;
                        humidity.textContent = thishumidity + '%';
                        feelslike.textContent = thisfeelslike + '\u00B0';
                    }
                    else timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
                    let weatherHtml = `<p class="card-head">${timeString}</p>
                                       <p class="card-temp">${temperature}&deg;</p>
                                       <img class="card-img"src="${icon}" alt="Weather Icon">`;
                    
                    hoursDataArray[i] = data.list[i];
                    array[i].innerHTML = weatherHtml;
                }
                for (let i = 0; i < 8; i++)
                {
                    const thismaxtemp = Math.round(data.list[i].main.temp_max - 273.15);
                    const thismintemp = Math.round(data.list[i].main.temp_min - 273.15);

                    if (thismaxtemp > maxTemperature) maxTemperature = thismaxtemp;
                    if (thismintemp < minTemperature) minTemperature = thismintemp;

                    maxtemp.textContent = maxTemperature + '\u00B0';
                    mintemp.textContent = minTemperature + '\u00B0';
                }
            })
            .catch(error =>
                {
                    alert("Invalid city name, try again.");
                });
        let fiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

        fetch(fiveDays).then(response => response.json()).then(data => 
            {
                for (let i = 0, j = 0; i < 40; i+=8, j++)
                {
                    const forecastDateTime = new Date(data.list[i].dt_txt);
                    const dayIndex = forecastDateTime.getDay();
                    const dayOfWeek = daysOfWeek[dayIndex];
                    const temperature = Math.round(data.list[i].main.temp - 273.15);
                    const icon = weatherState[data.list[i].weather[0].main];

                    if (i == 0)
                    {
                        weathernowday.textContent = dayOfWeek;
                    }

                    let weatherHtml = `<p class="card-head">${dayOfWeek}</p>
                                       <p class="card-temp">${temperature}&deg;</p>
                                       <img class="card-img"src="${icon}" alt="Weather Icon">`;

                    daysArray[j].innerHTML = weatherHtml;
                    daysDataArray[j] = data.list[i];

                        
                    const thismaxtemp = Math.round(data.list[i].main.temp_max - 273.15);
                    const thismintemp = Math.round(data.list[i].main.temp_min - 273.15);

                    if (thismaxtemp > maxTemperature) maxTemperature = thismaxtemp;
                    if (thismintemp < minTemperature) minTemperature = thismintemp;

                    let tempmax = "temp_max";
                    let tempmin = "temp_min";

                    maxMinTemps[data.list[j].dt] = {};
                    maxMinTemps[data.list[j].dt].tempmax = maxTemperature;
                    maxMinTemps[data.list[j].dt].tempmin = minTemperature;
                }
            })
}
function peekAnotherHour(button)
{
    for (let i = 0; i < hoursDataArray.length; i++)
    {
        if (button.id == `hourly${i + 1}`)
        {
            const forecastDateTime = new Date(hoursDataArray[i].dt_txt);
            const dayIndex = forecastDateTime.getDay();
            weathernowday.textContent = daysOfWeek[dayIndex];
            weathernowtemp.textContent = Math.round(hoursDataArray[i].main.temp - 273.15) + '\u00B0';
            weathernowdescr.textContent = hoursDataArray[i].weather[0].main;
            weathernowimg.src = weatherState[hoursDataArray[i].weather[0].main];
            humidity.textContent = hoursDataArray[i].main.humidity + '%';
            feelslike.textContent = Math.round(hoursDataArray[i].main.feels_like - 273.15) + '\u00B0';
            const id = Object.keys(maxMinTemps);
            maxtemp.textContent = maxMinTemps[id[0]].tempmax + '\u00B0';
            mintemp.textContent = maxMinTemps[id[0]].tempmin + '\u00B0';
            break;
        }
    }
}
function peekAnotherDay(button)
{
    for (let i = 0; i < daysDataArray.length; i++)
    {
        if (button.id == `day${i + 1}`)
        {
            const forecastDateTime = new Date(daysDataArray[i].dt_txt);
            const dayIndex = forecastDateTime.getDay();
            weathernowday.textContent = daysOfWeek[dayIndex];
            weathernowtemp.textContent = Math.round(daysDataArray[i].main.temp - 273.15) + '\u00B0';
            weathernowdescr.textContent = daysDataArray[i].weather[0].main;
            weathernowimg.src = weatherState[daysDataArray[i].weather[0].main];
            humidity.textContent = daysDataArray[i].main.humidity + '%';
            feelslike.textContent = Math.round(daysDataArray[i].main.feels_like - 273.15) + '\u00B0';
            const id = Object.keys(maxMinTemps); // REWORK
            maxtemp.textContent = Math.round(daysDataArray[i].main.temp_max - 273.15) + '\u00B0';
            mintemp.textContent = Math.round(daysDataArray[i].main.temp_min - 273.15) + '\u00B0';
            break;
        }
    }
}
searchWeather();