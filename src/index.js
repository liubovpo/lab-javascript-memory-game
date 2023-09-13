const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;
  let waiting = false

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      const clicked = document.getElementById("pairs-clicked");
      const guessed = document.getElementById("pairs-guessed");
      // TODO: write some code here
      if (waiting) {
        return;
      }
      // console.log(`Card clicked: ${card}`);
      card.classList.toggle('turned');
      
      if (memoryGame.pickedCards.length < 2){
        memoryGame.pickedCards.push(card);
      }

      if (memoryGame.pickedCards.length === 2){
        waiting = true
        const firstCard = memoryGame.pickedCards[0]
        const secondCard = memoryGame.pickedCards[1]
        // console.log(firstCard, secondCard)
        if(memoryGame.checkIfPair(firstCard.getAttribute("data-card-name"), secondCard.getAttribute("data-card-name"))){
          firstCard.classList.add("blocked");
          secondCard.classList.add("blocked");
          memoryGame.pickedCards = [];
          waiting = false;
        } else{
          setTimeout(function() {
            firstCard.classList.remove('turned');
            secondCard.classList.remove('turned');
            memoryGame.pickedCards = []; 
            waiting = false;
          }, 1000);
        }
      }
      
      if(memoryGame.checkIfFinished()){
        alert("YOU WON!");
      }
      // console.log(clicked, guessed)
      clicked.innerHTML = memoryGame.pairsClicked;
      guessed.innerHTML = memoryGame.pairsGuessed;
      
    });
  });
});
