let level = []; // масив для зберігання розмірів рівня | array for storing level sizes
let score = 0; // початковий рахунок | initial score
let timeLeft = 420; // 7 хвилин у секундах | 7 minutes in seconds
let timerInterval; // змінна для таймера | variable for timer
let selected = []; // масив для зберігання вибраних елементів | array for storing selected elements

const scoreElement = document.getElementsByClassName('score'); // елемент для відображення рахунку | element for displaying score
const buttons = document.getElementsByClassName('level-button'); // кнопки рівнів | level buttons
const board = document.getElementById('gameBoard'); // ігрова дошка | game board
const playButton = document.getElementsByClassName('play'); // кнопка для початку гри | button to start the game
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1'; // масив літер для гри | array of letters for the game
let elements; // ігрові елементи | game elements

// Обробники кнопок рівнів | Level button handlers
buttons[0].onclick = () => {
  level = [6, 6]; // Встановлює рівень 6x6 |  Sets level to 6x6
  buttonsHide(); // Приховує кнопки вибору рівнів | Hides level selection buttons
  game(); // Запускає гру
  playButton[0].style.display = 'block'; // Показує кнопку для початку гри | Shows the button to start the game
};

buttons[1].onclick = () => {
  level = [7, 6]; 
  board.style.width = '607px'; // Змінює ширину дошки | Changes the width of the board
  buttonsHide();
  game();
  playButton[0].style.display = 'block';
};

buttons[2].onclick = () => {
  level = [9, 6];
  board.style.width = '780px';
  buttonsHide();
  game();
  playButton[0].style.display = 'block';
};

// Приховує кнопки вибору рівнів | Hides level selection buttons
function buttonsHide() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.display = 'none';
  }
  document.querySelector('.level-buttons').style.display = 'none';

}

// Оновлює рахунок кожні 10 мс | Updates the score every 10 ms
setInterval(() => {
  scoreElement[0].textContent = "Рахунок: " + score;
}, 10);

// Генерує масив по дві однакові літери | Generates an array with two identical letters
function generArrLetter(lete) {
  for (let i = 0; i < (level[0] * level[1]) / 2; i++) {
    lete.push(letters[i], letters[i]);
  }
}

// Перемішує масив елементів | Shuffles the array of elements
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function spawnElemts(letterArray) {
  for (let i = 0; i < level[0] * level[1]; i++) {
    const elem = document.createElement('div'); //свторює новий елемент | creates a new element
    elem.classList.add('element', 'hidden', 'matched'); // додає класи для стилізації | adds classes for styling
    elem.textContent = letterArray[i]; // встановлює текст елемента | sets the text of the element
    board.appendChild(elem); // додає елемент на дошку | adds the element to the board
  }

  const elems = board.getElementsByClassName('element');  // отримує всі елементи з класом 'element' | gets all elements with the class 'element'
  let left = 375; // початкова позиція ліворуч | initial left position
  let top = 80; // початкова позиція зверху | initial top position
  let rowOffset = 0;

  for (let i = 0; i < level[0] * level[1]; i++) {
    if (i % level[0] === 0 && i !== 0) { 
      left = 375; // скидає позицію ліворуч | resets the left position
      top += 85; // збільшує позицію зверху | increases the top position
      rowOffset = 0; // скидає зсув рядка | resets the row offset
    }
    elems[i].style.left = left + 85 * rowOffset + 'px'; // встановлює позицію ліворуч | sets the left position
    elems[i].style.top = top + 'px'; // встановлює позицію зверху | sets the top position
    rowOffset++; // збільшує зсув рядка для наступного елемента | increases the row offset for the next element
  }

  elements = elems;
  return elems;
}


// Змінює колір фону елемента | Changes the background color of the element
function changeElementBg(element, color) {
  element.style.backgroundColor = color;
}

// Знімає клас matched у всіх елементів | Removes the matched class from all elements
function notMatch(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove('matched');
  }
}

// Основна логіка гри | Main game logic
function mainInGame(elements) {
  let matchedPairs = 0; // лічильник знайдених пар | counter for found pairs
  const totalPairs = (level[0] * level[1]) / 2; // загальна кількість пар | total number of pairs

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function () { // обробник події кліку
      if (selected.length === 2 || this.classList.contains('matched') || selected.includes(this)) return; // якщо вже вибрано 2 елементи або цей елемент вже знайдено |   if already selected 2 elements or this element is already found

      this.classList.remove('hidden'); // показує елемент | shows the element
      changeElementBg(this, 'rgb(112, 0, 182)'); // змінює колір фону елемента |  changes the background color of the element
      selected.push(this); // додає елемент до масиву вибраних |  adds the element to the selected array

      if (selected.length === 2) { 
        setTimeout(() => { // затримка перед перевіркою |   timeout before checking
          const [first, second] = selected; // отримує перший і другий вибрані елементи |   gets the first and second selected elements
          if (first.textContent === second.textContent) { // якщо елементи збігаються | if the elements match
            changeElementBg(first, 'rgb(0, 255, 0)'); // змінює колір фону першого елемента | changes the background color of the first element
            changeElementBg(second, 'rgb(0, 255, 0)'); // змінює колір фону другого елемента | changes the background color of the second element
            first.classList.remove('hidden'); // робить його текст видимим | makes its text visible
            second.classList.remove('hidden');
            first.classList.add('matched'); // додає клас matched до першого елемента щоб він не міг бути вибраний знову | adds the matched class to the first element so it can't be selected again
            second.classList.add('matched');
            matchedPairs++; // збільшує лічильник знайдених пар | increases the counter for found pairs
            score += 11; // збільшує рахунок на 11 | increases the score by 11

            // Перевірка на перемогу
            if (matchedPairs === totalPairs) {
              clearInterval(timerInterval); // зупиняє таймер |   stops the timer
              document.getElementById('bgMusic').pause(); // зупиняє музику | pauses the music
              const totalTime = 420 - timeLeft; // обчислює загальний час гри | calculates the total game time
              timeLeft = 420; // скидає час гри | resets the game time

              const record = document.createElement('main'); // створює новий елемент для запису |  creates a new element for the record
              record.classList.add('record'); 
              record.innerHTML = `
                <h2>🎉 Ви перемогли!</h2>
                <p>✅ Рахунок: <strong>${score}</strong></p>
                <p>⏱ Час гри: <strong>${totalTime} сек.</strong></p>
                <button onclick="restartGame()">🔁 Грати знову</button>
              `;
              document.body.appendChild(record);
              playButton[0].style.display = 'none';
            }
          } else {
            changeElementBg(first, 'rgb(144, 21, 231)'); //Якщо не вгадано то поверни колір фону та зроби текст невидимим | if not guessed, return the background color and make the text invisible
            changeElementBg(second, 'rgb(144, 21, 231)');
            first.classList.add('hidden');
            second.classList.add('hidden');
            if (score > 0) score -= 1; // зменшує рахунок на 1, якщо він більше 0 | decreases the score by 1 if it is greater than 0
          }

          selected = [];
        }, 1000); // затримка 1 секунда перед перевіркою збігів |   timeout of 1 second before checking matches
      }
    });
  }
}

// Запускає таймер
function startTimer() {
  clearInterval(timerInterval); // очищає попередній таймер, якщо він існує | clears the previous timer if it exists
  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60); // обчислює хвилини | calculates minutes
    const seconds = timeLeft % 60; // обчислює секунди | calculates seconds
    // Відображає таймер у форматі MM:SS | Displays the timer in MM:SS format

    document.getElementById("timer").textContent =
      `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").textContent = "Час вийшов!";
      clearInterval(timerInterval); // зупиняє таймер | stops the timer
              document.getElementById('bgMusic').pause(); // зупиняє музику | pauses the music
              const totalTime = 420 - timeLeft; // обчислює загальний час гри | calculates the total game time
              timeLeft = 420; // скидає час гри | resets the game time

              const record = document.createElement('main'); // створює новий елемент для запису |  creates a new element for the record
              record.classList.add('record'); 
              record.innerHTML = `
                <h2>🎉 Ви програли</h2>
                <p>✅ Рахунок: <strong>${score}</strong></p>
                <p>⏱ Час гри: <strong>${totalTime} сек.</strong></p>
                <button onclick="restartGame()">🔁 Грати знову</button>
              `;
              document.body.appendChild(record);
              playButton[0].style.display = 'none';
    }
  }, 1000);

  notMatch(elements);
}

// Відтворює музику та запускає таймер | Plays music and starts the timer
function playMusic() {
  setTimeout(() => {
    for(let i = 0;i<elements.length;i++) {
      elements[i].classList.remove('hidden'); // приховує всі елементи | hides all elements
    }
  },500); 
  setTimeout(() => {
    setTimeout(() => {
    for(let i = 0;i<elements.length;i++) {
      elements[i].classList.add('hidden'); // приховує всі елементи | hides all elements
    }
  },2000); 
  },); 
  const music = document.getElementById('bgMusic');
  music.play();
  music.volume = 0.07; // встановлює гучність музики | sets the music volume
  notMatch(elements);
  startTimer();
}

// Запуск гри | Starts the game
function game() {
  var h1 = document.querySelector('h1'); // отримує заголовок | gets the title
  h1.textContent = `Рівень ${level[0]}x${level[1]}`; // встановлює текст заголовка | sets the title text
  const letterArray = []; // масив для зберігання літер | array for storing letters
  generArrLetter(letterArray); // генерує масив літер | generates an array of letters
  shuffle(letterArray); // перемішує масив літер | shuffles the letter array
  spawnElemts(letterArray); // створює елементи на дошці | creates elements on the board
  mainInGame(elements); // запускає основну логіку гри |  runs the main game logic
}

function restartGame() {
  board.innerHTML = "";

  const resultBlock = document.querySelector('.record');
  if (resultBlock) resultBlock.remove();

  score = 0;
  timeLeft = 420;
  selected = [];

  scoreElement[0].textContent = "Рахунок: 0";
  document.getElementById("timer").textContent = "07:00";

  // ✅ Показуємо всі кнопки рівнів | Shows all level buttons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.display = 'inline-block';
  }

  // ✅ Показуємо сам блок з кнопками рівнів | Shows the block with level buttons
  document.querySelector('.level-buttons').style.display = 'block';

  playButton[0].style.display = 'none';
}
