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

/*-----------*****---------
handle input onchange event
*/

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

class Typer {
  constructor(content, maxTime) {
    this.sectionEl = document.querySelector(".section-app");
    this.paragraphEl = document.querySelector(".paragraph");
    this.inputEl = document.getElementById("input");
    this.barEl = document.getElementById("bar");
    this.blurEl = document.querySelector(".blur");
    this.infoEl = document.querySelector(".info");
    // state
    this.paused = true;

    // global
    this.paragraphContent = content;
    this.barPosX = 0;
    this.paraPosTop = 0;
    this.totalTime = 0;
    this.ltrPtr = 0;
    // render first
    this.render();
    this.testTimer = new Timer();

    // for letterinspection
    this.ltrWidth = document
      .querySelector(".letter")
      .getBoundingClientRect().width;
    this.totalLetters = this.getLineLettersSize();
    this.endOfTheLine = this.totalLetters - 1;
    this.setAllEventListeners();
  }
  render() {
    for (let i = 0; i < this.paragraphContent.length; i++) {
      let attributes = [
        { name: "id", value: i },
        { name: "class", value: "letter" },
      ];
      let letter = this.paragraphContent[i];
      createElement("div", letter, attributes, this.paragraphEl);
    }

    this.inputEl.focus();
  }
  getLineLettersSize() {
    let width = this.paragraphEl.getBoundingClientRect().width;
    return Math.floor(width / this.ltrWidth);
  }

  calculateResult() {
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
  updateFocusState() {
    if (this.inputEl === document.activeElement) {
      this.paused = false;
    } else {
      this.paused = true;
    }
  }
  handleInputEvent(e) {
    if (e.data === null) {
      if (this.ltrPtr > this.endOfTheLine + 1 - this.totalLetters) {
        this.ltrPtr--;
        let el = document.getElementById(this.ltrPtr);
        el.removeAttribute("class");
        el.setAttribute("class", "letter");
        this.barPosX -= this.ltrWidth;
        this.barEl.style.left = this.barPosX + "px";
      }
    } else {
      if (this.ltrPtr >= this.paragraphContent.length) {
        // view the result
        this.calculateResult();
        return;
      }

      let el = document.getElementById(this.ltrPtr);
      this.barPosX += this.ltrWidth;
      this.barEl.style.left = this.barPosX + "px";
      if (el.textContent != e.data) {
        el.setAttribute("class", "letter wrong");
      } else {
        el.setAttribute("class", "letter right");
      }

      /* End of the line is detected */
      if (this.ltrPtr === this.endOfTheLine) {
        /* Reset Bar */
        this.barPosX = 0;
        this.barEl.style.left = this.barPosX + "px";
        this.endOfTheLine += this.totalLetters;
        if (this.endOfTheLine >= this.paragraphContent.length) {
          this.endOfTheLine -= this.totalLetters;
          this.endOfTheLine += this.paragraphContent.length % this.totalLetters;
        }

        this.paraPosTop += 29.7;
        this.paragraphEl.style.top = "-" + this.paraPosTop + "px";
      }
      this.ltrPtr++;
    }
  }
  setAllEventListeners() {
    // setting all the event listener
    this.inputEl.addEventListener("input", (e) => {
      this.handleInputEvent(e);
    });

    /* Always put Input in focus */

    window.onkeydown = (e) => {
      if (this.paused) {
        this.paused = false;
        toggleOnOff(this.paused, [this.blurEl, this.infoEl], "hidden");
        this.barEl.classList.remove("bar--animated");
        setTimeout(() => {
          this.inputEl.focus();
          this.testTimer.start();
          console.log("Timer is started");
        }, 200);
      }
    };
    window.onclick = (e) => {
      if (!this.paused) {
        console.log(this.paused);
        this.totalTime += this.testTimer.end();
        this.barEl.classList.add("bar--animated");
        console.log(this.totalTime);
        console.log("timer is ended");
      }

      this.updateFocusState();
      toggleOnOff(this.paused, [this.blurEl, this.infoEl], "hidden");
    };
    this.infoEl.addEventListener("click", (e) => {
      e.stopPropagation();
      this.inputEl.focus();
      this.updateFocusState();
      this.barEl.classList.remove("bar--animated");

      toggleOnOff(this.paused, [this.infoEl, this.blurEl], "hidden");
      this.testTimer.start();
      console.log("timer is started");
    });

    document.addEventListener("touchstart", () => {
      this.updateFocusState();
      toggleOnOff(this.paused, [this.blurEl, this.infoEl], "hidden");
    });
  }
}

let content = `Walid Regragui enjoyed an extraordinary 2022. After lifting the Moroccan top-flight title and the CAF Champions League with Wydad, he masterminded the Atlas Lions’ run to the Qatar 2022™ semi-finals. Those successes earned the 47-year-old nomination for The Best FIFA Men’s Coach award alongside Carlo Ancelotti, Didier Deschamps, Pep Guardiola and Lionel Scaloni.`;
let typer = new Typer(content);
