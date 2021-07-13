
      const scoreBoard = document.querySelector(".score");
      const moles = [...document.querySelectorAll(".mole")];
      const status = moles.reduce((prev, current, index) => {
        prev[index] = false;
        return prev;
      }, {});
      const clickHandler = function() {
        if (molesProxy[moles.indexOf(this)]) {
          setScore(score + 1);
          molesProxy[moles.indexOf(this)] = false;
        }
      };
      const molesProxy = new Proxy(status, {
        get(target, key) {
          return target[key];
        },
        set(target, key, value) {
          target[key] = value;
          moles[key].removeEventListener("click", clickHandler);
          if (value) {
            moles[key].addEventListener("click", clickHandler);
            moles[key].classList.add("up");
          } else {
            moles[key].classList.remove("up");
          }
        }
      });
      let score = 0;
      let timeUp = true;
      const setScore = function(s) {
        score = s;
        scoreBoard.textContent = score;
      };
      const setMole = function(mole, time) {
        molesProxy[mole] = true;
        setTimeout(() => {
          if (!timeUp) showRandomMole();
        }, 500);
        setTimeout(() => {
          molesProxy[mole] = false;
        }, time);
      };
      const showRandomMole = function() {
        const mole = Math.floor(Math.random() * moles.length);
        const time = Math.random() * (1500 - 1000) + 1000; // 1000~1500
        if (molesProxy[mole]) return showRandomMole();
        setMole(mole, time);
      };
      const startGame = function() {
        if (!timeUp) return;
        setScore(0);
        timeUp = false;
        showRandomMole();
        setTimeout(() => {
          (timeUp = true), alert("Time's Up");
        }, 10000);
      };

      document.querySelector("button").addEventListener("click", startGame);