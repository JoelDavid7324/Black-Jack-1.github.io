// some things

let deck = [];

const tips = ["C", "D", "H", "S"];
const letters = ["A", "J", "Q", "K"];

// create a new deck

const setDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tip of tips) {
      deck.push(i + tip);
    }
  }
  for (let letter of letters) {
    for (let tip of tips) {
      deck.push(letter + tip);
    }
  }
};
setDeck();
deck = _.shuffle(deck);

// take a card

const takeCard = () => {
  let card = deck.pop();
  return card;
};

// card value

const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

// ia play
// score control
let score = document.querySelectorAll("small");

const iatime = (minPoints) => {
  do {
    // save score and refresh the points panel
    const card = takeCard();
    pcpoints = pcpoints + cardValue(card);
    score[1].innerText = pcpoints;

    // cards img
    const imgPcCards = document.createElement("img");
    imgPcCards.src = `assets/img/${card}.png`;
    imgPcCards.classList.add("card");
    picturesCom.append(imgPcCards);
    if (minPoints > 21) {
      break;
    }
  } while (pcpoints < minPoints && minPoints <= 21);

  if (pjpoints > 21 && pcpoints > 21) {
    document.querySelector("header").innerText = "No one wins!";
  } else if (
    (pjpoints > 21 && pcpoints <= 21) ||
    (pjpoints < 21 && pjpoints < pcpoints && pcpoints <= 21)
  ) {
    document.querySelector("header").innerText = "You lost";
  } else if (pjpoints == pcpoints) {
    document.querySelector("header").innerText = "No one win!";
  } else {
    document.querySelector("header").innerText = "You win";
  }
};

// html references

// buttons
const btn_nGame = document.querySelector("#control__nGame");
const btn_nCard = document.querySelector("#control__nCard");
const btn_stop = document.querySelector("#control__stop");
// cards div
const pictures = document.querySelector(".pictures");
const picturesCom = document.querySelector(".picturesCom");

// events for buttons

let pjpoints = 0;
let pcpoints = 0;

btn_nCard.addEventListener("click", function () {
  if (deck.length === 0) {
    console.log("Empty deck");
  } else {
    // save score and refresh the points panel
    const card = takeCard();
    pjpoints = pjpoints + cardValue(card);
    score[0].innerText = pjpoints;

    // cards img
    const imgPjCards = document.createElement("img");
    imgPjCards.src = `assets/img/${card}.png`;
    imgPjCards.classList.add("card");
    pictures.append(imgPjCards);

    // pj points condition
    if (pjpoints > 21) {
      btn_nCard.disabled = true;
      btn_stop.disabled = true;
      iatime(pjpoints);
    } else if (pjpoints == 21) {
      btn_nCard.disabled = true;
      btn_stop.disabled = true;
      iatime(pjpoints);
    }
  }
});

btn_stop.addEventListener("click", function () {
  iatime(pjpoints);
  btn_nCard.disabled = true;
  btn_stop.disabled = true;
});

btn_nGame.addEventListener("click", function () {
  setDeck();
  deck = _.shuffle(deck);
  pjpoints = 0;
  pcpoints = 0;
  score[0].innerText = pjpoints;
  score[1].innerText = pcpoints;
  btn_nCard.disabled = false;
  btn_stop.disabled = false;
  pictures.innerHTML = "";
  picturesCom.innerHTML = "";
  document.querySelector("header").innerText = "Black Jack";
});
