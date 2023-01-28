let sectionEl = document.querySelector(".section-app");
let paragraphEl = document.querySelector(".paragraph");
let inputEl = document.getElementById("input");
let barEl = document.getElementById("bar");
let blurEl = document.querySelector(".blur");
let infoEl = document.querySelector(".info");
// state
let paused = true;

// global
let paragraphContent = `Walid Regragui enjoyed an extraordinary 2022. After lifting the Moroccan top-flight title and the CAF Champions League with Wydad, he masterminded the Atlas Lions’ run to the Qatar 2022™ semi-finals. Those successes earned the 47-year-old nomination for The Best FIFA Men’s Coach award alongside Carlo Ancelotti, Didier Deschamps, Pep Guardiola and Lionel Scaloni.`;
let ltrPtr = 0;
let ltrWidth;
let barPosX = 0;
let paraPosTop = 0;

let totalLetters;
let endOfTheLine;

let totalTime = 0;
// render the paragraph
class Timer {
  constructor() {
    this.startingTime;
  }
  start() {
    this.startingTime = Date.now();
  }
  end() {
    if (!this.startingTime) return 0;
    let total = (Date.now() - this.startingTime) / 1000;
    this.startingTime = 0;
    return total;
  }
}
renderView();
let testTimer = new Timer();
ltrWidth = document.querySelector(".letter").getBoundingClientRect().width;
totalLetters = getLineLettersSize();
endOfTheLine = totalLetters - 1;
function createElement(type, content, attributes = [], parent = null) {
  const element = document.createElement(type);
  element.appendChild(document.createTextNode(content));
  if (attributes.length > 0) {
    for (let attribute of attributes) {
      element.setAttribute(attribute.name, attribute.value);
    }
  }
  parent && parent.appendChild(element);
}

function renderView() {
  for (let i = 0; i < paragraphContent.length; i++) {
    let attributes = [
      { name: "id", value: i },
      { name: "class", value: "letter" },
    ];
    let letter = paragraphContent[i];
    createElement("div", letter, attributes, paragraphEl);
  }

  inputEl.focus();
}

/*-----------*****---------
handle input onchange event
*/
inputEl.addEventListener("input", (e) => {
  if (e.data === null) {
    if (ltrPtr > endOfTheLine + 1 - totalLetters) {
      ltrPtr--;
      let el = document.getElementById(ltrPtr);
      el.removeAttribute("class");
      el.setAttribute("class", "letter");
      barPosX -= ltrWidth;
      barEl.style.left = barPosX + "px";
    }
  } else {
    if (ltrPtr >= paragraphContent.length) {
      // view the result
      calculateResult();
      return;
    }

    let el = document.getElementById(ltrPtr);
    barPosX += ltrWidth;
    barEl.style.left = barPosX + "px";
    if (el.textContent != e.data) {
      el.setAttribute("class", "letter wrong");
    } else {
      el.setAttribute("class", "letter right");
    }

    /* End of the line is detected */
    if (ltrPtr === endOfTheLine) {
      /* Reset Bar */
      barPosX = 0;
      barEl.style.left = barPosX + "px";
      endOfTheLine += totalLetters;
      if (endOfTheLine >= paragraphContent.length) {
        endOfTheLine -= totalLetters;
        endOfTheLine += paragraphContent.length % totalLetters;
      }

      paraPosTop += 29.7;
      paragraphEl.style.top = "-" + paraPosTop + "px";
    }
    ltrPtr++;
  }
});

/* Always put Input in focus */

function getLineLettersSize() {
  let width = paragraphEl.getBoundingClientRect().width;
  return Math.floor(width / ltrWidth);
}

function calculateResult() {
  let letterEls = document.querySelectorAll(".letter");
  let letters = [];
  for (let i of letterEls) {
    letters.push({
      letter: i.textContent,
      status: i.getAttribute("class").slice(7),
    });
  }
  let correctWords = 0;
  let totalWords = 0;
  let wronged = false;
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].letter === " " || i === letters.length - 1) {
      !wronged && correctWords++;
      totalWords++;
      wronged = false;
      continue;
    }
    if (letters[i].status === "wrong") {
      wronged = true;
    }
  }
  // console.log("Word Per Minute:" + totalWords / totalTime);
}
function updateFocusState() {
  if (inputEl === document.activeElement) {
    paused = false;
  } else {
    paused = true;
  }
}

window.onkeydown = (e) => {
  if (paused) {
    paused = false;
    toggleOnOff(paused, [blurEl, infoEl], "hidden");
    barEl.classList.remove("bar--animated");
    setTimeout(() => {
      inputEl.focus();
      testTimer.start();
      console.log("Timer is started");
    }, 200);
  }
};
window.onclick = (e) => {
  if (!paused) {
    console.log(paused);
    totalTime += testTimer.end();
    barEl.classList.add("bar--animated");
    console.log(totalTime);
    console.log("timer is ended");
  }

  updateFocusState();
  toggleOnOff(paused, [blurEl, infoEl], "hidden");
};
infoEl.addEventListener("click", (e) => {
  e.stopPropagation();
  inputEl.focus();
  updateFocusState();
  barEl.classList.remove("bar--animated");

  toggleOnOff(paused, [infoEl, blurEl], "hidden");
  testTimer.start();
  console.log("timer is started");
});

document.addEventListener("touchstart", () => {
  updateFocusState();
  toggleOnOff(paused, [blurEl, infoEl], "hidden");
});

function toggleOnOff(condition, elements, toggleClsName) {
  if (!condition) {
    for (let el of elements) {
      el.classList.add(toggleClsName);
    }
  } else {
    for (let el of elements) {
      el.classList.remove(toggleClsName);
    }
  }
}
