let questions = [], current = 0, score = 0, timer, timeLeft = 15;
fetch('questions.json')
  .then(r => r.json())
  .then(data => {
    questions = shuffle(data).slice(0, 110);
    showQuestion();
  });
function showQuestion() {
  if (current >= questions.length) {
    document.getElementById('question').innerText = 'Quiz terminé !';
    document.getElementById('answers').innerHTML = '';
    return;
  }
  const q = questions[current];
  document.getElementById('question').innerText = 'Dans quel livre trouve-t-on ce verset : « ' + q.text + ' » ?';
  const ansDiv = document.getElementById('answers');
  ansDiv.innerHTML = '';
  const opts = shuffle([q.correct, ...q.incorrect]);
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.onclick = () => {
      clearInterval(timer);
      let pts = 0;
      if (opt === q.correct) {
        if (timeLeft > 10) pts = 10;
        else if (timeLeft > 5) pts = 5;
        else pts = 0;
        score += pts;
        btn.classList.add('correct');
      } else {
        score -= 5;
        btn.classList.add('incorrect');
      }
      updateScore();
      setTimeout(() => {
        current++;
        timeLeft = 15;
        showQuestion();
      }, 1000);
    };
    ansDiv.appendChild(btn);
  });
  startTimer();
  updateScore();
}
function startTimer() {
  document.getElementById('timer').innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      current++;
      timeLeft = 15;
      showQuestion();
    }
  }, 1000);
}
function updateScore() {
  document.getElementById('score').innerText = score;
}
function shuffle(a) {
  for (let i = a.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// Rules modal
document.getElementById('btn-rules').onclick = () => {
  document.getElementById('rules-modal').classList.remove('hidden');
};
document.getElementById('close-rules').onclick = () => {
  document.getElementById('rules-modal').classList.add('hidden');
};
// Download button
document.getElementById('btn-download').onclick = () => {
  window.location.href = 'manifest.json';
};
// Share score
document.getElementById('share').onclick = () => {
  const text = encodeURIComponent(`J’ai fait ${score} points sur TJ QUIZ !`);
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
};