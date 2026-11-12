import { CODIGOS_TIEMPO } from './constantes.js';

console.log("1. El script se ha cargado correctamente.");

const lugares = {
    Merida: "https://api.open-meteo.com/v1/forecast?latitude=38.91802&longitude=-6.34292&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Europe%2FBerlin",
    Madrid: "https://api.open-meteo.com/v1/forecast?latitude=40.4165&longitude=-3.70256&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Europe%2FBerlin",
    Barcelona: "https://api.open-meteo.com/v1/forecast?latitude=41.38879&longitude=2.158972&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Europe%2FBerlin"
};

const RUTA_IMAGENES = "img/";

const selector = document.getElementById("selector-localidades");
const pNombre = document.getElementById("nombre-localidad");
const pFechaHora = document.getElementById("fecha-hora");
const pTemperatura = document.getElementById("temperatura");
const pHumedad = document.getElementById("humedad");
const pViento = document.getElementById("viento");
const pCodigo = document.getElementById("codigo");
const imgClima = document.getElementById("imagen-clima");

function cargarClima(nombreLocalidad) {
    const url = lugares[nombreLocalidad];
    pNombre.textContent = `Localidad: ${nombreLocalidad}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            
            const fechaHoraDato = data.current.time;
            const temp = data.current.temperature_2m;
            const humedad = data.current.relative_humidity_2m;
            const viento = data.current.wind_speed_10m;
            const weatherCode = data.current.weather_code;

            let descripcionClima = "Código desconocido";
            let archivoImagen = "not-available.svg";

            if (CODIGOS_TIEMPO[weatherCode]) {
                descripcionClima = CODIGOS_TIEMPO[weatherCode].descripcion;
                archivoImagen = CODIGOS_TIEMPO[weatherCode].imagen;
            }

            pFechaHora.textContent = `Fecha y hora: ${fechaHoraDato.replace("T", " ")}`;
            pTemperatura.textContent = `Temperatura: ${temp} °C`;
            pHumedad.textContent = `Humedad relativa: ${humedad} %`;
            pViento.textContent = `Velocidad del viento: ${viento} km/h`;
            pCodigo.textContent = `Estado del cielo: ${descripcionClima}`;
            
            imgClima.src = `${RUTA_IMAGENES}${archivoImagen}`;
        })
        .catch(error => {
            pTemperatura.textContent = "Temperatura: Error al cargar";
        });
}

cargarClima(selector.value);

selector.addEventListener("change", (event) => {
    cargarClima(event.target.value);
});


// fetch(lugares)
// .then(response => {
//     if (!response.ok) {
//     throw new Error(`Error HTTP: ${response.status}`);
//     }
//     return response.json();
// })
// .then(data => {
    

//     codigo.textContent = `${data.current.weather_code}`;


//     switch (codigo.textContent) {
//         case "0":
//             codigo.textContent = "Clear sky";
//             break;
//         case "1":
//             codigo.textContent = "Mainly clear";
//             break;
//         case "2":
//             codigo.textContent = "Partly cloudy";
//             break;
//         case "3":
//             codigo.textContent = "Overcast";
//             break;
//         case "45":
//             codigo.textContent = "Fog";
//             break;
//         case "48":
//             codigo.textContent = "Depositing rime fog";
//             break;
//         case "51":
//             codigo.textContent = "Light drizzle";
//             break;
//         case "53":
//             codigo.textContent = "Moderate drizzle";
//             break;
//         case "55":
//             codigo.textContent = "Dense drizzle";
//             break;
//         case "56":
//             codigo.textContent = "Light freezing drizzle";
//             break;
//         case "57":
//             codigo.textContent = "Dense freezing drizzle";
//             break;
//         case "61":
//             codigo.textContent = "Slight rain";
//             break;
//         case "63":
//             codigo.textContent = "Moderate rain";
//             break;
//         case "65":
//             codigo.textContent = "Heavy rain";
//             break;
//         case "66":
//             codigo.textContent = "Light freezing rain";
//             break;
//         case "67":
//             codigo.textContent = "Heavy freezing rain";
//             break;
//         case "71":
//             codigo.textContent = "Slight snowfall";
//             break;
//         case "73":
//             codigo.textContent = "Moderate snowfall";
//             break;
//         case "75":
//             codigo.textContent = "Heavy snowfall";
//             break;
//         case "77":
//             codigo.textContent = "Snow grains";
//             break;
//         case "80":
//             codigo.textContent = "Nublaillo y chispea";
//             break;
//         case "81":
//             codigo.textContent = "Moderate rain showers";
//             break;
//         case "82":
//             codigo.textContent = "Violent rain showers";
//             break;
//         case "85":
//             codigo.textContent = "Slight snow showers";
//             break;
//         case "86":
//             codigo.textContent = "Heavy snow showers";
//             break;
//         case "95":
//             codigo.textContent = "Thunderstorm";
//             break;
//         case "96":
//             codigo.textContent = "Thunderstorm with slight hail";
//             break;
//         case "97":
//             codigo.textContent = "Heavy thunderstorm";
//             break;
//         case "99":
//             codigo.textContent = "Thunderstorm with heavy hail";
//             break;
//         default:
//             // Si no coincide con ninguno, se queda como está o muestra un aviso
//             break;
//     }



// })
// .catch(error => {
//     console.error("Error:", error);
// });
