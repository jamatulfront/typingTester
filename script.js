class ParagraphDataApi {
  constructor() {
    this.paragraph =
      "As technology continues to advance, algorithms have become an integral part of our everyday lives. From the moment we wake up and check our phones to the moment we go to bed, algorithms are working behind the scenes to make our lives easier and more efficient. But what exactly are these algorithms, and how do they affect us? In this article, we’ll explore the different types of algorithms we use in our day-to-day lives and examine some of the most common examples. One of the most widespread algorithms that we use on a daily basis is the search of algorithm.";
    this.paragraph1 =
      "A lifetime of close study of military campaigns and the dynamics of strategy have convinced me that Russia is about to unleash a new offensive that corrects many of the mistakes that plagued the assaults last February. I strongly suspect that Russia will strike with all its remaining power well before Spring. Based on the time it takes to build out the training and logistics infrastructure Ukraine will have to establish to support all the new gear it is slated to get, it will be June before Ukraine can mount a major push. Likewise every moment they try to servive.";
    this.paragraph2 =
      "Fast forward to the present, and we never climb. If an adult did so with the same glee as a child, the police might be called. He must be on drugs, people would say, or off his medication. But maybe we are wrong not to climb. Maybe we can learn about ourselves by asking a question. Why do all children, separated by continent and culture, feel compelled to climb? The answer is simple. Far back in our murky prehistory, our ancestors lived in trees. As differently as we see our modern selves, our minds and bodies still carry this evolutionary baggage.";
    this.numeric =
      "The population of the city was approximately 4.5 million people, with 2.7 million in the metropolitan area. The city's GDP was $80 billion in 2020, and it was ranked among the top 20 most livable cities in the world. The average temperature in the summer was 30°C, and in the winter it was -10°C. The city had over 500 parks, with a total area of 3,000 acres. The city's transportation system included 12 subway lines, with a total length of 250 miles, and a bus system with over 7,000 buses. The city was also home to 5 major universities students.";
    this.alpha =
      "The new product launch was set for Q3, 2022 and it was expected to generate '$45M' in revenue by the end of the year. The project was code-named Project X#YZ and had been in development for over 20% years. It featured a unique! blend of cutting-edge technology, such as *AI-powered analytics and IoT integration. The team had been working hard!, and had put in over 12,000$ worthwork. The product is a [game-changer] in the industry, A1Corp and B2Biz. The /marketing campaign/ will be kick off in 2 months, with a budget of $1.5M and targeting a reach of 5M people.";

    this.time =
      "Hero Alom is a Bangladeshi actor and model who has made a name for himself in the entertainment industry. He made his acting debut in the film industry with the film. Born in Rangpur, Bangladesh, Alom grew up in a small village. Despite the lack of opportunities, he always had a passion for acting. He moved to Dhaka to pursue his dream and began his career as a model. He quickly gained popularity and caught the attention of film directors and producers. In 2011, Alom made his acting debut in the film 'Onnorokom Bhalobasha' directed by Zakir Hossain Raju. The film was a success and Alom's performance was well-received by audiences and critics alike. He then went on to star in a number of films, including me. Alom's performances in these films have been praised for their naturalness and emotional depth. He is known for bringing a sense of realism to his roles and for his ability to connect with audiences. His performances have earned him several awards, including the Meril Prothom Alo Awards for Best Actor in a Leading Role. In addition to acting, Alom is also a successful model and has appeared in several advertisements and music videos. He is also known for his philanthropy, and regularly participates in charity events and campaigns.";
    this.paragraphs = {
      forWord: [this.paragraph, this.paragraph1, this.paragraph2],
      forTime: [this.time],
      forNumeric: [this.numeric],
      forAlpha: [this.alpha],
    };
  }
  countWords(paragraph) {
    let count = 0;
    for (let i = 0; i < paragraph.length; i++) {
      if (paragraph[i] === " ") count++;
    }
    return count + 1;
  }

  getParaWithPunc(wordSize) {
    return this.getParagraph(wordSize, this.alpha);
  }
  getParaWithNum(wordSize) {
    return this.getParagraph(wordSize, this.numeric);
  }
  getTimePara() {
    return this.time;
  }
  getParagraph(wordsSize, specific = null) {
    let wordParagraphs = this.paragraphs.forWord;
    if (wordsSize === 100) {
      return specific
        ? specific
        : wordParagraphs[Math.floor(Math.random() * wordParagraphs.length)];
    }

    let selectedParagraph = specific
      ? specific
      : wordParagraphs[Math.floor(Math.random() * wordParagraphs.length)];
    let startingPos = this.getStartingPosition(wordsSize, selectedParagraph);
    let count = 0;
    for (let i = startingPos; i < selectedParagraph.length; i++) {
      if (selectedParagraph[i] === " ") {
        count++;
      }

      if (count == wordsSize) return selectedParagraph.slice(startingPos, i);
    }
    return selectedParagraph.slice(startingPos);
  }
  getStartingPosition(wordsSize, paragraph) {
    let points = Math.floor(100 / wordsSize);
    let startingPoint = Math.floor(Math.random() * points);
    let nthWord = this.getNthWord(startingPoint * wordsSize, paragraph);
    console.log(wordsSize);
    return nthWord;
  }
  getNthWord(n, paragraph) {
    let count = 0;
    let i = 0;
    while (i < paragraph.length) {
      if (paragraph[i] === " ") count++;
      if (count === n) return i + 1;
      i++;
    }
    return i + 1;
  }
}

const TIME = "time";
const WORD = "word";

function createElement(
  type,
  content,
  attributes = [],
  parent = null,
  eventListener = null
) {
  const element = document.createElement(type);
  element.appendChild(document.createTextNode(content));
  if (attributes.length > 0) {
    for (let attribute of attributes) {
      element.setAttribute(attribute.name, attribute.value);
    }
  }
  if (eventListener !== null)
    element.addEventListener(eventListener.type, eventListener.listener);
  parent && parent.appendChild(element);
}

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

function removeAllChilds(el) {
  while (el.firstChild) {
    el.removeChild(el.lastChild);
  }
}
class Timer {
  constructor() {
    this.startingTime;
  }
  start() {
    this.startingTime = Date.now();
    console.log("Starting time:", this.startingTime);
  }
  end() {
    if (!this.startingTime) return 0;
    let total = (Date.now() - this.startingTime) / 1000;
    console.log("Ending time:", this.startingTime);
    this.startingTime = 0;
    return total;
  }
}
class Typer {
  constructor(content, isTimed = false) {
    this.sectionEl = document.querySelector(".section-app");
    this.paragraphEl = document.querySelector(".paragraph");
    this.inputEl = document.getElementById("input");
    this.barEl = document.getElementById("bar");
    this.blurEl = document.querySelector(".blur");
    this.infoEl = document.querySelector(".info");
    this.restartBtnEl = document.querySelector(".restart-btn");
    this.popUpEl = document.querySelector(".result-popup");
    this.popRBtn = document.querySelector(".popup-restart-btn");
    this.wpmValueEl = document.getElementById("wpm-value");
    this.accValueEl = document.getElementById("acc-value");
    this.wordCountEl = document.querySelector("word-count");
    this.wordCompletedEl = document.querySelector(".word-completed");
    this.wordTotalEl = document.querySelector(".word-total");
    // state
    this.paused = true;
    this.isTimed = isTimed;
    // global
    this.paragraphContent = content;
    this.barPosX = 0;
    this.paraPosTop = 0;
    this.totalTime = 0;
    this.ltrPtr = 0;

    this.completedWords = 0;
    this.totalWords = this.countWords(this.paragraphContent);
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
    this.wordTotalEl.textContent = this.totalWords;
    this.inputEl.focus();
  }
  getLineLettersSize() {
    let width = this.paragraphEl.getBoundingClientRect().width;
    return Math.floor(width / this.ltrWidth);
  }
  countWords(paragraph) {
    let count = 0;
    for (let i = 0; i < paragraph.length; i++) {
      if (paragraph[i] === " ") count++;
    }
    return count + 1;
  }
  calculateResult() {
    this.totalTime += this.totalTime + this.testTimer.end();
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

    console.log("Word Per Minute:" + totalWords / (this.totalTime / 60));
    console.log("Accurary", correctWords / totalWords);
    this.accValueEl.textContent = (correctWords / totalWords) * 100 + "" + "%";
    this.wpmValueEl.textContent = Math.round(
      totalWords / (this.totalTime / 60)
    );
    this.popUpEl.classList.add("show-popup");
    this.popRBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("what happend");
      this.popUpEl.classList.remove("show-popup");
      this.restart();
      console.log(this);
    });
  }
  updateFocusState() {
    if (this.inputEl === document.activeElement) {
      this.paused = false;
    } else {
      this.paused = true;
    }
  }
  handleInputEvent(e) {
    if (this.ltrPtr >= this.paragraphContent.length) return;
    if (e.data === null) {
      console.log(this.ltrPtr, this.endOfTheLine);
      if (this.ltrPtr > this.endOfTheLine + 1 - this.totalLetters) {
        console.log("What happen");
        this.ltrPtr--;
        let el = document.getElementById(this.ltrPtr);
        el.removeAttribute("class");
        el.setAttribute("class", "letter");
        this.barPosX -= this.ltrWidth;
        this.barEl.style.left = this.barPosX + "px";
        if (el.textContent === " ") this.completedWords--;
        this.wordCompletedEl.textContent = this.completedWords;
      }
    } else {
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
      if (el.textContent === " ") this.completedWords++;

      this.wordCompletedEl.textContent = this.completedWords;
      this.ltrPtr++;
      if (this.ltrPtr >= this.paragraphContent.length) {
        // view the result
        this.calculateResult();
        return;
      }
    }
  }
  restart(content = null) {
    this.render();
    if (content) {
      this.reset();
      this.paragraphContent = content;
      this.totalWords = this.countWords(content);
    } else {
      this.reset();
      this.totalWords = getSubsState();
      console.log(this.totalWords);
      this.paragraphContent = new ParagraphDataApi().getParagraph(
        this.totalWords
      );
    }
    this.wordTotalEl.textContent = this.totalWords;
    this.render();
    console.log("seting timer at restart");
    setTimeout(() => {
      this.testTimer.start();
    }, 700);
    this.totalLetters = this.getLineLettersSize();
    this.endOfTheLine = this.totalLetters - 1;
  }
  setTotalWords(words) {
    this.totalWords = words;
    console.log("inside", this.totalWords);
  }
  getTotalWords() {
    return this.totalWords;
  }
  reset() {
    removeAllChilds(this.paragraphEl);
    this.barPosX = 0;
    this.paraPosTop = 0;
    this.totalTime = 0;
    this.ltrPtr = 0;

    this.barEl.style.left = 0;
    this.paragraphEl.style.top = 0;
    this.paused = true;
    this.barEl.classList.remove("bar--animated");
    this.popUpEl.classList.remove("show-popup");
    this.completedWords = 0;
    this.totalWords = 0;
    this.wordCompletedEl.textContent = 0;
    this.wordTotalEl.textContent = 0;

    // render first
  }
  setAllEventListeners() {
    // setting all the event listener
    this.inputEl.addEventListener("input", (e) => {
      this.handleInputEvent(e);
    });

    /* Always put Input in focus */

    window.onkeydown = (e) => {
      console.log(this.paused);
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
    document.addEventListener("mouseover", (e) => {
      // if (this.paused) {
      //   toggleOnOff(this.paused, [this.blurEl, this.infoEl], "hidden");
      // }
    });
    window.onclick = (e) => {
      if (!this.paused) {
        this.totalTime += this.testTimer.end();
        this.barEl.classList.add("bar--animated");
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
    this.restartBtnEl.addEventListener("click", (e) => {
      e.stopPropagation();
      this.restart();
    });

    document.addEventListener("touchstart", () => {
      this.inputEl.focus();
      this.updateFocusState();
      toggleOnOff(this.paused, [this.blurEl, this.infoEl], "hidden");
    });
  }
}
class UserPreference {
  constructor() {
    // State can be 'word' or 'time'
    this.words = [10, 25, 50, 100];
    this.times = [15, 30, 60, 120];
    // preference
    this.includePunc = false;
    this.includeNum = false;

    this.middleBtnsState = WORD;
    this.subMiddleBtnState = 10;

    // elements
    this.puncBtnEl = document.getElementById("punc-btn");
    this.numberBtnEl = document.getElementById("number-btn");
    this.timeBtnEl = document.getElementById("time-btn");
    this.wordBtnEl = document.getElementById("word-btn");

    this.userPreRight = document.querySelector(".user-preference-right");
    this.renderBtns();
    this.setAllEventListener();
    this.own = this;
  }
  renderBtns() {
    if (this.middleBtnsState === WORD) {
      this.words.forEach((i, index) => {
        this.createSubMiddleBtn(i, index);
      });
    } else if (this.middleBtnsState === TIME) {
      this.times.forEach((i, index) => {
        this.createSubMiddleBtn(i, index);
      });
    }
  }
  setSubMiddleState() {
    let allActiveEl = document.querySelectorAll(".active");
    this.subMiddleBtnState = allActiveEl[allActiveEl.length - 1].textContent;
  }
  getGlobalPreference() {
    return {
      includeNum: this.includeNum,
      includePunc: this.includePunc,
      middleBtnsState: this.middleBtnsState,
      subMiddleBtnState: this.subMiddleBtnState,
    };
  }
  createSubMiddleBtn(content, id, own) {
    createElement(
      "button",
      content,
      [
        { name: "class", value: id !== 0 ? "up-btn" : "up-btn active" },
        // {
        //   name: "id",
        //   value: id,
        // },
      ],

      this.userPreRight,
      {
        type: "click",
        listener: function (e) {
          // this.own.subMiddleBtnState = Number(this.textContent);
          this.classList.add("active");
          this.parentNode.childNodes.forEach((node) => {
            if (node !== this) node.classList.remove("active");
          });
        },
      }
    );
  }
  setAllEventListener() {
    this.puncBtnEl.addEventListener("click", (e) => {
      this.includePunc = !this.includePunc;
      console.log(this.includePunc);
      toggleOnOff(!this.includePunc, [this.puncBtnEl], "active");
    });
    this.numberBtnEl.addEventListener("click", (e) => {
      this.includeNum = !this.includeNum;
      toggleOnOff(!this.includeNum, [this.numberBtnEl], "active");
    });
    this.timeBtnEl.addEventListener("click", (e) => {
      // if (this.middleBtnsState !== TIME) {
      //   removeAllChilds(this.userPreRight);
      //   this.middleBtnsState = TIME;
      //   this.subMiddleBtnState = 15;
      //   toggleOnOff(false, [this.timeBtnEl], "active");
      //   toggleOnOff(true, [this.wordBtnEl], "active");
      //   this.renderBtns();
      // }
      console.log("In future");
    });
    this.wordBtnEl.addEventListener("click", (e) => {
      if (this.middleBtnsState !== WORD) {
        toggleOnOff(false, [this.wordBtnEl], "active");
        toggleOnOff(true, [this.timeBtnEl], "active");
        removeAllChilds(this.userPreRight);
        this.middleBtnsState = WORD;
        this.subMiddleBtnState = 15;
        this.renderBtns();
      }
    });
    this.userPreRight.addEventListener("click", () => {
      this.setSubMiddleState();
    });
  }
  showAllState() {
    console.log("num", this.includeNum);
    console.log("alph", this.includePunc);
    console.log("state", this.middleBtnsState);
    console.log("sub", this.subMiddleBtnState);
  }
}

let dataApi = new ParagraphDataApi();
let typer = new Typer(dataApi.getParagraph(10));
let userPreference = new UserPreference();
let uPWrapperEl = document.querySelector(".user-preference-wrapper");
let globalState = userPreference.getGlobalPreference();
uPWrapperEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("up-btn")) {
    globalState = userPreference.getGlobalPreference();
    if (globalState.includeNum && globalState.includePunc) {
      typer.setTotalWords(globalState.subMiddleBtnState);
      typer.restart(dataApi.getParaWithNum(globalState.subMiddleBtnState));
    } else if (globalState.includeNum) {
      typer.setTotalWords(globalState.subMiddleBtnState);
      typer.restart(dataApi.getParaWithNum(globalState.subMiddleBtnState));
    } else if (globalState.includePunc) {
      typer.setTotalWords(globalState.subMiddleBtnState);
      typer.restart(dataApi.getParaWithPunc(globalState.subMiddleBtnState));
    } else if (globalState.middleBtnsState === TIME) {
    } else {
      typer.setTotalWords(globalState.subMiddleBtnState);
      let txt = dataApi.getParagraph(globalState.subMiddleBtnState);
      typer.restart(txt);
    }
  }
});

function getSubsState() {
  return globalState.subMiddleBtnState;
}
