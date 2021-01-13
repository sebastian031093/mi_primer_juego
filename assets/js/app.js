
//Creas baraja..........
/*
*2C = Two of Clubs (treboles)
*2D = Two of Dimonds (treboles)
*2H = Two of Hearts (treboles)
*2S = Two of Spades (treboles)

*/



let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;


//referencias del HTML

const btnPedir = document.querySelector("#btnPedir");
const smalls = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartaComputadora = document.querySelector('#computadora-cartas');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevoJuego = document.querySelector('#btnNuevo');




const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }


    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }


    // console.log(deck); Mazo en orde....
    deck = _.shuffle(deck)
    console.log(deck); //Mazo aleatorio....
    return deck;
}


crearDeck();


//Esta funcion me permite tomar una carta.

const pedirCarta = () => {
    //Control si el deck esta vacio
    if (deck.length === 0) {
        throw 'No hay cartas en el deck..' // Lanca un error.... al probarce la condicion.
    }

    let carta = deck.pop();
    // console.log(deck);
    // console.log(carta);
    return carta
}

// deck = [];
// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1); //es como si fuera el metodo que rompe el array y regresa uno nuevo.
    //Solucion fernanado
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 :
        valor * 1;

    // console.log({ valor });
    // puntos = (!isNaN(valor)) ? puntos = valor * 1 :
    //     puntos = (valor === 'A') ? 11 : 10
    /*
    if (isNaN(valor)) { //Evalua el valor y dice si no es un numero(true), es un numero(false).
        // console.log('No es un nuemero');
        puntos = (valor === 'A') ? 11 : 10
    } else {
        // console.log('Es un numero');
        puntos = valor * 1; //Retorno el valor como un numero, pues originalmente el pasaba como string(OJO eso es muy delicado).
    }
    */
    // console.log(puntos);
}

//Buena practica, si estoy reutilizando codigo es bueno crear una funcion o algo que me permita reutilizarlo.

//Turno de la computadora.
const turnoComputadore = (puntosMinimos) => {
    do {

        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        smalls[1].innerText = puntosComputadora;
        // console.log(carta);
        // divCartasJugador.append
        //Lo que quiero pintar en el HTML
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartaComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }




    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    //mensaje de win or losse.
    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana :(...');
        } else if (puntosMinimos > 21) {
            alert('maquina gana')
        } else if (puntosComputadora > 21) {
            alert('Humano gana.')
        } else {
            alert('Maquina gana...')
        }
    }, 1000);


}




//eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    smalls[0].innerText = puntosJugador;
    // console.log(carta);
    // divCartasJugador.append
    //Lo que quiero pintar en el HTML
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    //LOGICA DEL EVENTO QUE ESTOY CAPTURANDO CON LO QUE INTE.

    if (puntosJugador > 21) {
        // console.warn('perdiste.');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadore(puntosJugador);

    } else if (puntosJugador === 21) {
        // console.warn('ganaste..');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadore(puntosJugador);

    }



});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadore(puntosJugador);
});



//Nuevo juego.....

btnNuevoJuego.addEventListener('click', () => {

    console.clear();
    deck = [];
    crearDeck();
    smalls[0].innerText = 0;
    smalls[1].innerText = 0;
    btnPedir.disabled = false;
    btnDetener.disabled = false;

    divCartaComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

});


