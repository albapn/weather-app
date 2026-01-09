// Navbar mobile Bulma

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});

// WeatherApp


const APIKEY = "0309f90d1e5734c6bacb03e679945d02";

async function obtenerDatos(lat, lon) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&lang=gl&units=metric`
    
    try {
        const response = await fetch(apiUrl);
        return await response.json();
        
    } catch (error) {
        console.error("Non se atopa na API", error)
    }
}

async function actualizarDatos(lat, lon) {

    const data = await obtenerDatos(lat, lon);
    console.log(data)

    if (data) {
        document.getElementById("temperatureWeather").textContent = `${data.main.temp}ºC`;
        document.getElementById("location").textContent = data.name;
        document.getElementById("iconWeather").src = `./assets/iconos/${data.weather[0].icon}.png`;
        document.getElementById("humidity").textContent= `${data.main.humidity}%`;
        document.getElementById("descripcion").textContent =`${data.weather[0].description}`;
        document.getElementById("temrMax").textContent =`${data.main.temp_max}ºC`;
        document.getElementById("temrMin").textContent =`${data.main.temp_min}ºC`;
        document.getElementById("viento").textContent =`${data.wind.speed}m/s`;
        // document.getElementById("sunrise").textContent=`${data.sys.sunrise}`;
        // document.getElementById("sunset").textContent=`${data.sys.sunset}`;
        // fecha actual
      const dataActualTimeStamp=data.dt*1000;
      const dataActual= new Date(dataActualTimeStamp);
      console.log(dataActual)
      const options={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
      }
      document.getElementById("data").textContent=dataActual.toLocaleDateString("es-ES", options)
      // sunrise
      const amanecerTimestamp=data.sys.sunrise * 1000;
      const amanecer=new Date(amanecerTimestamp);
      const amanecerHora=amanecer.getHours();
      const amanecerMin=amanecer.getMinutes();
      const amanecerComplet=`${amanecerHora}:${amanecerMin} AM`;
      document.getElementById("sunrise").textContent=amanecerComplet;
       //sunset
       const atardecerTimestamp=data.sys.sunset * 1000;
      const atardecer=new Date(atardecerTimestamp);
      const atardecerHora=atardecer.getHours();
      const atardecerMin=atardecer.getMinutes();
      const atardecerComplet=`${atardecerHora}:${atardecerMin} PM`;
      document.getElementById("sunset").textContent=atardecerComplet; 
     
    // cambio video dia - noche
    if(dataActual>=amanecer && dataActual<=atardecer){
      let fondo = document.getElementById("video").src="./assets/videos/fondo-dia.mp4";
    

    }else{
      document.getElementById("video").src="./assets/videos/fondo-noche.mp4";
    }
    }

}

actualizarDatos(42.61, -8.79)