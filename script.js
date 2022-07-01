document.querySelector('button').addEventListener('click',function(){
const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let previousCard = undefined;
let revealedCards = 0;
let correctCards = 0;
let attempts = 0;
function handleCardClick(event) {
  if (event.target.classList.contains("revealed")){
    return};
  attempts+=1;
  let currentCard = event.target;
  event.target.style.backgroundColor = event.target.className;
  currentCard.classList.add('revealed');
  console.log("you just clicked", event.target);
  revealedCards++;
  if (revealedCards == 2){
    if (previousCard.className == currentCard.className){ // Correct
      correctCards+=2;
      currentCard = null; 
      previousCard = null;
    } else { // Incorrect
      setTimeout(function(){
        currentCard.style.backgroundColor = '';
        previousCard.style.backgroundColor = '';
        currentCard.classList.remove('revealed');
        previousCard.classList.remove('revealed');
        currentCard = null; 
        previousCard = null;
      },1000)
    }

    revealedCards = 0;

  } else if (revealedCards == 1){
  previousCard = currentCard;
  }
  if (correctCards == COLORS.length){
    alert(`GAME CLEARED. YOU TOOK ${attempts} ATTEMPTS`)
  }
  document.getElementById('display').innerText = attempts;
}

// when the DOM loads
createDivsForColors(shuffledColors);
})