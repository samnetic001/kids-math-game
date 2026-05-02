const modes = [
  { id: "addSub", label: "加減法", ruby: "ㄐㄧㄚ ㄐㄧㄢˇ ㄈㄚˇ", icon: "+−", color: "#4fb477" },
  { id: "multiply", label: "乘法", ruby: "ㄔㄥˊ ㄈㄚˇ", icon: "×", color: "#8b6de8" },
  { id: "divide", label: "除法", ruby: "ㄔㄨˊ ㄈㄚˇ", icon: "÷", color: "#72c8e6" },
  { id: "mixed", label: "混合挑戰", ruby: "ㄏㄨㄣˋ ㄏㄜˊ ㄊㄧㄠˇ ㄓㄢˋ", icon: "?", color: "#ff7aa7" }
];

const difficulties = [
  { id: "easy", label: "簡單", ruby: "ㄐㄧㄢˇ ㄉㄢ" },
  { id: "normal", label: "普通", ruby: "ㄆㄨˇ ㄊㄨㄥ" },
  { id: "hard", label: "困難", ruby: "ㄎㄨㄣˋ ㄋㄢˊ" }
];

const encouragements = [
  "太棒了，魔法花開了！",
  "答對囉，星光又亮一點！",
  "小魔法師成功施法！",
  "森林朋友都在為你拍手！"
];

const storyMoments = [
  { icon: "✿", text: "魔法花醒來了！", ruby: "ㄇㄛˊ ㄈㄚˇ ㄏㄨㄚ ㄒㄧㄥˇ ㄌㄞˊ ㄌㄜ˙", className: "is-flower", left: 70, top: 64 },
  { icon: "✦", text: "星星燈亮起來！", ruby: "ㄒㄧㄥ ㄒㄧㄥ ㄉㄥ ㄌㄧㄤˋ ㄑㄧˇ ㄌㄞˊ", className: "is-lamp", left: 58, top: 38 },
  { icon: "◆", text: "水晶橋長出來！", ruby: "ㄕㄨㄟˇ ㄐㄧㄥ ㄑㄧㄠˊ ㄓㄤˇ ㄔㄨ ㄌㄞˊ", className: "is-crystal", left: 76, top: 48 },
  { icon: "⌂", text: "糖果屋開燈了！", ruby: "ㄊㄤˊ ㄍㄨㄛˇ ㄨ ㄎㄞ ㄉㄥ ㄌㄜ˙", className: "is-house", left: 66, top: 24 },
  { icon: "☘", text: "幸運葉跳舞！", ruby: "ㄒㄧㄥˋ ㄩㄣˋ ㄧㄝˋ ㄊㄧㄠˋ ㄨˇ", className: "is-leaf", left: 48, top: 66 },
  { icon: "☁", text: "彩色雲朵飄過！", ruby: "ㄘㄞˇ ㄙㄜˋ ㄩㄣˊ ㄉㄨㄛˇ ㄆㄧㄠ ㄍㄨㄛˋ", className: "is-cloud", left: 76, top: 18 },
  { icon: "♬", text: "森林唱起歌！", ruby: "ㄙㄣ ㄌㄧㄣˊ ㄔㄤˋ ㄑㄧˇ ㄍㄜ", className: "is-music", left: 54, top: 52 },
  { icon: "☼", text: "陽光灑進森林！", ruby: "ㄧㄤˊ ㄍㄨㄤ ㄙㄚˇ ㄐㄧㄣˋ ㄙㄣ ㄌㄧㄣˊ", className: "is-sun", left: 83, top: 31 },
  { icon: "◈", text: "寶石泉水閃耀！", ruby: "ㄅㄠˇ ㄕˊ ㄑㄩㄢˊ ㄕㄨㄟˇ ㄕㄢˇ ㄧㄠˋ", className: "is-gem", left: 62, top: 72 },
  { icon: "★", text: "城堡大門打開！", ruby: "ㄔㄥˊ ㄅㄠˇ ㄉㄚˋ ㄇㄣˊ ㄉㄚˇ ㄎㄞ", className: "is-castle", left: 82, top: 58 }
];

const hintByType = {
  "+": "可以把兩邊的星星放在一起數一數。",
  "-": "先看全部，再拿走一些，剩下多少呢？",
  "×": "想成一組一組的魔法花，再全部加起來。",
  "÷": "平均分給大家，每一組會有幾個呢？"
};

const state = {
  mode: "addSub",
  difficulty: "easy",
  sound: true,
  questionIndex: 0,
  stars: 0,
  questions: [],
  locked: false,
  audioContext: null
};

const els = {
  home: document.querySelector("#homeScreen"),
  game: document.querySelector("#gameScreen"),
  result: document.querySelector("#resultScreen"),
  modeButtons: document.querySelector("#modeButtons"),
  difficultyButtons: document.querySelector("#difficultyButtons"),
  startButton: document.querySelector("#startButton"),
  backButton: document.querySelector("#backButton"),
  homeButton: document.querySelector("#homeButton"),
  playAgainButton: document.querySelector("#playAgainButton"),
  bopomofoToggle: document.querySelector("#bopomofoToggle"),
  soundToggle: document.querySelector("#soundToggle"),
  gameSoundToggle: document.querySelector("#gameSoundToggle"),
  questionProgress: document.querySelector("#questionProgress"),
  starCount: document.querySelector("#starCount"),
  difficultyLabel: document.querySelector("#difficultyLabel"),
  helperText: document.querySelector("#helperText"),
  questionText: document.querySelector("#questionText"),
  visualAid: document.querySelector("#visualAid"),
  answerButtons: document.querySelector("#answerButtons"),
  feedbackText: document.querySelector("#feedbackText"),
  magicItems: document.querySelector("#magicItems"),
  storyStage: document.querySelector("#storyStage"),
  spellTrail: document.querySelector("#spellTrail"),
  storyBubble: document.querySelector("#storyBubble"),
  resultText: document.querySelector("#resultText"),
  resultStars: document.querySelector("#resultStars")
};

function ruby(text, bopomofo) {
  return `<ruby>${text}<rt>${bopomofo}</rt></ruby>`;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function renderSetup() {
  els.modeButtons.innerHTML = modes.map((mode) => `
    <button class="mode-card ${mode.id === state.mode ? "is-selected" : ""}" type="button" data-mode="${mode.id}" style="--mode-color:${mode.color}">
      <span class="mode-card__icon">${mode.icon}</span>
      <span>${ruby(mode.label, mode.ruby)}</span>
    </button>
  `).join("");

  els.difficultyButtons.innerHTML = difficulties.map((difficulty) => `
    <button class="${difficulty.id === state.difficulty ? "is-selected" : ""}" type="button" data-difficulty="${difficulty.id}">
      ${ruby(difficulty.label, difficulty.ruby)}
    </button>
  `).join("");
}

function setSound(enabled) {
  state.sound = enabled;
  els.soundToggle.classList.toggle("is-on", enabled);
  els.soundToggle.setAttribute("aria-pressed", String(enabled));
  els.gameSoundToggle.classList.toggle("is-muted", !enabled);
  els.gameSoundToggle.textContent = enabled ? "♪" : "×";
}

function playTone(type) {
  if (!state.sound) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  state.audioContext ||= new AudioContext();
  const ctx = state.audioContext;
  const now = ctx.currentTime;
  const tone = {
    tap: { freqs: [520], duration: 0.05, wave: "sine" },
    right: { freqs: [720, 920], duration: 0.08, wave: "triangle" },
    wrong: { freqs: [210], duration: 0.12, wave: "sawtooth" },
    win: { freqs: [520, 660, 820], duration: 0.12, wave: "triangle" }
  }[type] || { freqs: [440], duration: 0.08, wave: "sine" };

  tone.freqs.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = tone.wave;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now + index * 0.09);
    gain.gain.linearRampToValueAtTime(0.13, now + index * 0.09 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.09 + tone.duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + index * 0.09);
    osc.stop(now + index * 0.09 + tone.duration + 0.03);
  });
}

function makeQuestion(mode, difficulty) {
  let type = mode;
  if (mode === "addSub") type = pick(["+", "-"]);
  if (mode === "multiply") type = "×";
  if (mode === "divide") type = "÷";
  if (mode === "mixed") type = pick(["+", "-", "×", "÷"]);

  if (type === "+") return makeAddition(difficulty);
  if (type === "-") return makeSubtraction(difficulty);
  if (type === "×") return makeMultiplication(difficulty);
  return makeDivision(difficulty);
}

function makeAddition(difficulty) {
  const max = difficulty === "easy" ? 10 : difficulty === "normal" ? 50 : 100;
  const a = rand(1, Math.floor(max / 2));
  const b = rand(1, max - a);
  return buildQuestion(a, b, "+", a + b);
}

function makeSubtraction(difficulty) {
  const max = difficulty === "easy" ? 10 : difficulty === "normal" ? 50 : 100;
  const a = rand(2, max);
  const b = rand(1, a - 1);
  return buildQuestion(a, b, "-", a - b);
}

function makeMultiplication(difficulty) {
  let a;
  let b;
  if (difficulty === "easy") {
    a = pick([2, 5, 10]);
    b = rand(1, 10);
  } else if (difficulty === "normal") {
    a = rand(2, 9);
    b = rand(2, 9);
  } else {
    a = rand(2, 12);
    b = rand(3, 9);
  }
  return buildQuestion(a, b, "×", a * b);
}

function makeDivision(difficulty) {
  let divisor;
  let answer;
  if (difficulty === "easy") {
    divisor = pick([2, 5, 10]);
    answer = rand(1, 5);
  } else if (difficulty === "normal") {
    divisor = rand(2, 9);
    answer = rand(2, 9);
  } else {
    divisor = rand(3, 12);
    answer = rand(3, 12);
  }
  return buildQuestion(divisor * answer, divisor, "÷", answer);
}

function buildQuestion(a, b, op, answer) {
  return {
    a,
    b,
    op,
    answer,
    text: `${a} ${op} ${b} = ?`,
    choices: makeChoices(answer)
  };
}

function makeChoices(answer) {
  const choices = new Set([answer]);
  const spread = answer <= 10 ? 4 : answer <= 50 ? 10 : 18;
  while (choices.size < 3) {
    const candidate = Math.max(0, answer + rand(-spread, spread));
    if (candidate !== answer) choices.add(candidate);
  }
  return shuffle([...choices]);
}

function startGame() {
  playTone("tap");
  state.questionIndex = 0;
  state.stars = 0;
  state.locked = false;
  state.questions = Array.from({ length: 10 }, () => makeQuestion(state.mode, state.difficulty));
  els.magicItems.innerHTML = "";
  els.storyStage.innerHTML = "";
  els.spellTrail.innerHTML = "";
  els.storyBubble.innerHTML = "";
  showScreen("game");
  renderQuestion();
}

function showScreen(name) {
  els.home.classList.toggle("hidden", name !== "home");
  els.game.classList.toggle("hidden", name !== "game");
  els.result.classList.toggle("hidden", name !== "result");
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function renderQuestion() {
  const question = state.questions[state.questionIndex];
  const difficulty = difficulties.find((item) => item.id === state.difficulty);
  els.questionProgress.textContent = `${state.questionIndex + 1} / 10`;
  els.starCount.textContent = state.stars;
  els.difficultyLabel.textContent = difficulty.label;
  els.helperText.innerHTML = ruby("星星精靈說：試試看這一題！", "ㄒㄧㄥ ㄒㄧㄥ ㄐㄧㄥ ㄌㄧㄥˊ ㄕㄨㄛ ㄕˋ ㄕˋ ㄎㄢˋ ㄓㄜˋ ㄧˋ ㄊㄧˊ");
  els.questionText.textContent = question.text;
  els.feedbackText.textContent = "";
  els.storyBubble.classList.remove("is-showing");
  renderVisualAid(question, state.difficulty === "easy");
  els.answerButtons.innerHTML = question.choices.map((choice) => `
    <button class="answer" type="button" data-answer="${choice}">${choice}</button>
  `).join("");
  state.locked = false;
}

function renderVisualAid(question, showFull) {
  els.visualAid.innerHTML = "";
  if (!showFull && state.difficulty !== "normal") {
    els.visualAid.innerHTML = `<p class="helper">${hintByType[question.op]}</p>`;
    return;
  }

  if (question.op === "+" || question.op === "-") {
    const total = question.op === "+" ? question.a + question.b : question.a;
    const limit = Math.min(total, 30);
    for (let i = 0; i < limit; i++) {
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.style.setProperty("--dot-color", i < question.a ? "#ff7aa7" : "#72c8e6");
      if (question.op === "-" && i >= question.a - question.b) dot.classList.add("is-muted");
      els.visualAid.appendChild(dot);
    }
    if (total > limit) els.visualAid.append("...");
  } else {
    const groups = question.op === "×" ? question.a : question.b;
    const dots = question.op === "×" ? question.b : question.answer;
    const groupLimit = Math.min(groups, 10);
    const dotLimit = Math.min(dots, 12);
    for (let g = 0; g < groupLimit; g++) {
      const group = document.createElement("div");
      group.className = "group";
      for (let d = 0; d < dotLimit; d++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.style.setProperty("--dot-color", question.op === "×" ? "#8b6de8" : "#4fb477");
        group.appendChild(dot);
      }
      els.visualAid.appendChild(group);
    }
  }
}

function answerQuestion(selected, button) {
  if (state.locked) return;
  state.locked = true;
  const question = state.questions[state.questionIndex];
  const isCorrect = selected === question.answer;
  const buttons = [...els.answerButtons.querySelectorAll(".answer")];

  buttons.forEach((item) => {
    const value = Number(item.dataset.answer);
    item.disabled = true;
    if (value === question.answer) item.classList.add("is-correct");
  });

  if (isCorrect) {
    state.stars += 1;
    button.classList.add("is-correct");
    els.feedbackText.textContent = pick(encouragements);
    els.helperText.innerHTML = ruby("答對了！魔法森林更亮了。", "ㄉㄚˊ ㄉㄨㄟˋ ㄌㄜ˙ ㄇㄛˊ ㄈㄚˇ ㄙㄣ ㄌㄧㄣˊ ㄍㄥˋ ㄌㄧㄤˋ ㄌㄜ˙");
    playTone("right");
    playStoryMoment();
    document.querySelector(".wizard").classList.add("is-casting");
  } else {
    button.classList.add("is-wrong");
    els.feedbackText.textContent = `沒關係，答案是 ${question.answer}。${hintByType[question.op]}`;
    els.helperText.innerHTML = ruby("星星精靈陪你再想一次。", "ㄒㄧㄥ ㄒㄧㄥ ㄐㄧㄥ ㄌㄧㄥˊ ㄆㄟˊ ㄋㄧˇ ㄗㄞˋ ㄒㄧㄤˇ ㄧˊ ㄘˋ");
    renderVisualAid(question, true);
    playTone("wrong");
  }

  els.starCount.textContent = state.stars;
  window.setTimeout(() => {
    document.querySelector(".wizard").classList.remove("is-casting");
    state.questionIndex += 1;
    if (state.questionIndex >= state.questions.length) {
      finishGame();
    } else {
      renderQuestion();
    }
  }, isCorrect ? 1500 : 1800);
}

function playStoryMoment() {
  const moment = storyMoments[(state.stars - 1) % storyMoments.length];
  const scene = document.querySelector(".scene");
  const sprite = document.querySelector(".sprite");

  scene.classList.remove("is-story-glow");
  sprite.classList.remove("is-helping");
  void scene.offsetWidth;
  scene.classList.add("is-story-glow");
  sprite.classList.add("is-helping");

  els.storyBubble.innerHTML = ruby(moment.text, moment.ruby);
  els.storyBubble.classList.add("is-showing");
  addSpellTrail(moment);
  addStoryItem(moment);
  addMagicItem(moment);
}

function addSpellTrail(moment) {
  els.spellTrail.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const spark = document.createElement("span");
    spark.className = "spell-spark";
    spark.textContent = pick(["✦", "•", "★"]);
    spark.style.setProperty("--i", i);
    spark.style.setProperty("--end-x", `${moment.left - 22 + rand(-4, 4)}vw`);
    spark.style.setProperty("--end-y", `${moment.top - 48 + rand(-4, 4)}vh`);
    els.spellTrail.appendChild(spark);
  }
}

function addStoryItem(moment) {
  const item = document.createElement("span");
  item.className = `story-item ${moment.className}`;
  item.textContent = moment.icon;
  item.style.left = `${moment.left}%`;
  item.style.top = `${moment.top}%`;
  els.storyStage.appendChild(item);
}

function addMagicItem(moment = null) {
  const item = document.createElement("span");
  item.className = "magic-item";
  item.textContent = moment?.icon || pick(["✦", "★", "✿", "◆"]);
  item.style.left = `${moment ? moment.left : rand(42, 82)}%`;
  item.style.top = `${moment ? moment.top : rand(24, 74)}%`;
  els.magicItems.appendChild(item);
}

function finishGame() {
  playTone("win");
  showScreen("result");
  const stars = state.stars;
  els.resultStars.textContent = "★".repeat(Math.max(1, Math.ceil(stars / 2)));
  const message = stars >= 9
    ? `你得到 ${stars} 顆星星，魔法森林閃閃發亮！`
    : stars >= 6
      ? `你得到 ${stars} 顆星星，城堡的燈亮起來了！`
      : `你得到 ${stars} 顆星星，每一次練習都會讓魔法更強。`;
  els.resultText.textContent = message;
}

els.modeButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  state.mode = button.dataset.mode;
  playTone("tap");
  renderSetup();
});

els.difficultyButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-difficulty]");
  if (!button) return;
  state.difficulty = button.dataset.difficulty;
  playTone("tap");
  renderSetup();
});

els.answerButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-answer]");
  if (!button) return;
  answerQuestion(Number(button.dataset.answer), button);
});

els.bopomofoToggle.addEventListener("click", () => {
  const hidden = document.body.classList.toggle("hide-bopomofo");
  els.bopomofoToggle.classList.toggle("is-on", !hidden);
  els.bopomofoToggle.setAttribute("aria-pressed", String(!hidden));
  playTone("tap");
});

els.soundToggle.addEventListener("click", () => setSound(!state.sound));
els.gameSoundToggle.addEventListener("click", () => setSound(!state.sound));
els.startButton.addEventListener("click", startGame);
els.playAgainButton.addEventListener("click", startGame);
els.homeButton.addEventListener("click", () => showScreen("home"));
els.backButton.addEventListener("click", () => {
  playTone("tap");
  showScreen("home");
});

renderSetup();
setSound(true);
