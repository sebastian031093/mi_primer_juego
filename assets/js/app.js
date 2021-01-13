
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

    if (deck.length === 0) {
        throw 'No hay cartas en el deck..'
    }

    let carta = deck.pop();
    console.log(deck);
    console.log(carta);
    return carta
}

// deck = [];
// pedirCarta();






