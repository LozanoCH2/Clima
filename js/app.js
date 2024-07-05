const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario= document.querySelector('#formulario');

window.addEventListener('load',()=>{
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault();

    // Vlidamos fomulario
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        //Hubo un error
        mostrarError('Ambos campos son obligatorios');

        return;

    }

    consultarAPI(ciudad,pais);

}

function mostrarError(mensaje) {
    const alerta= document.querySelector('.bg-red-100');
    if(!alerta){
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100','border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
        'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML=`
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>`;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }   
}


function consultarAPI(ciudad,pais) {
    const appId='d6b64f5c704b8d02a582ce3da2fcf999';

    const url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos=>{
            limpiarHTML();
            if(datos.cod ==="404"){
                mostrarError('Ciudad no encontrada')
                return;
            }

            mostrarClima(datos);
        })
}

function mostrarClima(datos) {

    const {main: {temp, temp_max, temp_min}}=datos;

    const centigrados=kelvinAcentigrados(temp);
    const tmin=kelvinAcentigrados(temp_min);
    const tmax=kelvinAcentigrados(temp_max);


    const actual=document.createElement('p');
    actual.innerHTML=`${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    
    const tempmax=document.createElement('p');
    tempmax.innerHTML=`Maxima: ${tmax} &#8451`;
    tempmax.classList.add( 'text-xl');

    const tempmin=document.createElement('p');
    tempmin.innerHTML=`Minima :${tmin} &#8451`;
    tempmin.classList.add( 'text-xl');

    const resultadoDiv=document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempmax);
    resultadoDiv.appendChild(tempmin);

    resultado.appendChild(resultadoDiv);
    
}

const kelvinAcentigrados= grados=>parseInt(grados-273.15);

function limpiarHTML(params) {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}