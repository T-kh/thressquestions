'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const quizSet = [
    {q: 'What is A?', c: ['A0', 'A1', 'A2']},
    {q: 'What is B?', c: ['B0', 'B1', 'B2']},
    {q: 'What is C?', c: ['C0', 'C1', 'C2']},
  ];
  const result = document.getElementById('result');
  const resultText = result.firstElementChild;
  let currentNum = 0;
  let isAnswered = false;
  let score = 0;

  // 2
  function shuffle(arr) { 
     for(let i = arr.length -1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [arr[j], arr[i]] = [arr[i], arr[j]];
     }
     return arr;
  }

  function checkAnswer(li) {

    if(isAnswered) {
      return;
    }

    isAnswered = true;

    if(li.textContent === quizSet[currentNum].c[0]) {
      score++;
      li.classList.add('correct');
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');

  }

  
  function setQuiz() {
    isAnswered = false;
    //1
    question.textContent = quizSet[currentNum].q;
    
    while(choices.firstChild) {
      choices.removeChild(choices.firstChild)
    }
    // 1, 2
    const shuffled = shuffle([...quizSet[currentNum].c]);
    shuffled.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });
    btn.classList.add('disabled');
    if(currentNum === quizSet.length -1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();
  
  btn.addEventListener('click', () => {
    if(isAnswered === false) {
      return;
    }
    if(currentNum === quizSet.length -1) {
      result.classList.remove('hidden');
      resultText.textContent = `Score: ${score} / ${quizSet.length}`;
      return;
    }
    currentNum++;
    setQuiz();

  });
}
// 1: textの表示
// 2: 選択肢のシャッフル。それを表示
// 3: btnを押したときの処理。