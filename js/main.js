import NoSleep from "./vendor/nosleep-0.12.0.min";
import { toggleTheme } from "./color-theme";

const DiceType = {
  Random2d6: 0,
  OrderedBag2d6: 1,
  Randomd12: 2,
  OrderedBagd12: 3,
};

const ROLLS = [];
const STATUSES = ["initiative","life","freedom","sheep","revenge","firstborn child","mortal enemy","strength","midterm grade","next snakpass gift","intelligence","seduction","strength"];
const EMOJIS = ["😀","😃","😄","😁","😆","😅","😂","🤣","🥲","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🥸","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾",];
const ROLL_TIME = 1500;
const UPDATE_TIME = 75;
const CK_COLORS = ["black", "black", "black", "#304ffe", "#00c853", "#ffb300"];

let mode = DiceType.OrderedBag2d6;

// True if cities and knights is enabled
let ck = document.getElementById("ck").checked;

const genRolls = () => {
  let numSides = 6;
  let bagMultiplier = 2;
  if (mode === DiceType.OrderedBagd12) {
    numSides = 12;
    bagMultiplier = 6;
  }

  for (let i = 0; i < bagMultiplier; i += 1) {
    let base = [...Array(numSides).keys()].map((i) => i + 1);
    for (let x of base) {
      if (mode === DiceType.OrderedBagd12) {
        ROLLS.push([x, 0]);
      } else {
        for (let y of base) {
          ROLLS.push([x, y]);
        }
      }
    }
    ROLLS.sort(() => 0.5 - Math.random());
  }
};
genRolls();

document.getElementById("ck").addEventListener("mouseup", () => {
  ck = !ck;
});

document.getElementById("roll-btn").addEventListener("click", () => {
  document.getElementById("roll-btn-content").innerHTML = `roll for your ${
    STATUSES[Math.floor(Math.random() * STATUSES.length)]
  }`;
  document.getElementById("roll-btn-emoji").classList.add("spinning");
  document.getElementById("roll-btn").classList.add("rainbowing");

  if (
    ROLLS.length === 0 &&
    (mode === DiceType.OrderedBag2d6 || mode === DiceType.OrderedBagd12)
  ) {
    genRolls();
  }

  let num = 0;
  switch (mode) {
    case DiceType.Random2d6:
      num = [
        Math.floor(Math.random() * 6 + 1),
        Math.floor(Math.random() * 6 + 1),
      ];
      break;
    case DiceType.OrderedBag2d6:
      num = ROLLS.pop();
      break;
    case DiceType.Randomd12:
      num = [Math.floor(Math.random() * 11 + 2), 0];
      break;
    case DiceType.OrderedBagd12:
      num = ROLLS.pop();
      break;
  }

  let refreshes = Math.floor(ROLL_TIME / UPDATE_TIME);
  let interval = setInterval(() => {
    if (refreshes > 0) {
      document.getElementById("roll-out").innerHTML = `Current roll: ${
        EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      }`;
      refreshes -= 1;
    } else {
      clearInterval(interval);

      if (!ck) {
        document.getElementById("roll-out").style.color = "";
        document.getElementById("roll-out").innerHTML = `Current roll: ${
          num[0] + num[1]
        }`;
      } else {
        document.getElementById("roll-out").innerHTML = `Current roll: ${num}`;
        CK_COLORS.sort(() => 0.5 - Math.random());
        document.getElementById("roll-out").style.color = CK_COLORS[0];
      }
      document.getElementById(
        "roll-left"
      ).innerHTML = `Rolls left in bag: ${ROLLS.length}`;
      document.getElementById("roll-btn-emoji").classList.remove("spinning");
      document.getElementById("roll-btn").classList.remove("rainbowing");
    }
  }, UPDATE_TIME);
});

const noSleep = new NoSleep();

const preferences = [
  {
    id: "dark-mode",
    name: "Enable Dark Mode",
    type: "checkbox",
    default: localStorage.getItem("theme") === "dark",
    explanation:
      "Toggles the website between light and dark mode. Enable to choose dark mode, disable to choose light mode. Defaults to the system theme.",
    onChange: (newValue) => {
      if(newValue) toggleTheme("dark");
      else toggleTheme("light");
    },
  },
  {
    id: "prevent-sleep",
    name: "Prevent Device Sleep",
    type: "checkbox",
    default: false,
    explanation:
      "Prevents the device from sleeping while the page is open. This is useful if you want to pass this device around and avoid having to login again when the device sleeps.",
    onChange: (newValue) => {
      if (newValue) {
        noSleep.enable();
      } else {
        noSleep.disable();
      }
    },
  },
  {
    id: "dice-type",
    name: "Dice Type",
    type: "select",
    options: [
      {
        name: "Random 2d6",
        value: DiceType.Random2d6,
      },

      {
        name: "Ordered bag of 2d6 rolls",
        value: DiceType.OrderedBag2d6,
      },
      {
        name: "Random d12",
        value: DiceType.Randomd12,
      },
      {
        name: "Ordered bag of d12 rolls",
        value: DiceType.OrderedBagd12,
      },
    ],
    default: DiceType.OrderedBag2d6,
    explanation:
      "Changes the type of dice used for rolling.<br /><br />Random 2d6 is the default and is equivalent to rolling a pair of 6-sided dice.<br /><br />Ordered bag of 2d6 rolls uses a 2x binomial distribution of dice (72 possible rolls) that ensures each number shows up proportionally to its frequency in the game, reducing the effects of RNG.<br /><br />Random d12 is a single 12-sided die with 1 removed and makes rolling a uniform distribution, effectively making a 2 roll as likely as a 7 roll.<br /><br /> Ordered bag of d12 rolls uses the same method as the ordered bag of 2d6 rolls, but with a 12 sided die.",
    onChange: (newValue) => {
      mode = parseInt(newValue);
      ROLLS.length = 0;

      if (mode === DiceType.Randomd12 || mode === DiceType.OrderedBagd12) {
        document.getElementById("ck-d12-warning").style.visibility = "";
        document.getElementById("ck-d12-warning").style.opacity = "";
        document.getElementById("ck").checked = false;
        ck = false;
        document.getElementById("ck").setAttribute("disabled", "disabled");
        document.getElementById("ck-d12-warning").style.display = "block";
      } else {
        document.getElementById("ck").removeAttribute("disabled");
        document.getElementById("ck-d12-warning").style.display = "none";
      }

      if (mode === DiceType.OrderedBag2d6 || mode === DiceType.OrderedBagd12) {
        document.getElementById("roll-left").style.textDecoration = "none";
        document.getElementById("roll-left").innerHTML =
          "Rolls left in bag: 72";
        document.getElementById("roll-left").style.opacity = "1";
        genRolls();
      } else {
        document.getElementById("roll-left").style.textDecoration =
          "line-through";
        document.getElementById("roll-left").innerHTML = "Rolls left in bag: 0";
        document.getElementById("roll-left").style.opacity = "0.5";
      }
    },
  },
];

const buildPreferences = () => {
  const preferencesContainer = document.getElementById("preferences");
  preferencesContainer.innerHTML = "";
  preferences.forEach((preference) => {
    const preferenceContainer = document.createElement("div");
    preferenceContainer.classList.add("preference-container");

    let preferenceInput = document.createElement("input");
    switch (preference.type) {
      case "select":
        preferenceInput = document.createElement("select");
        preferenceInput.innerHTML = preference.options
          .map((option) => {
            return `<option id="${option.name
              .toLowerCase()
              .split(" ")
              .join("-")}" value="${option.value}" ${
              preference.default === option.value ? 'selected="selected"' : ""
            }>${option.name}</option>`;
          })
          .join("");
        preferenceInput.addEventListener("change", () =>
          preference.onChange(preferenceInput.value)
        );
        break;
      case "checkbox":
        preferenceInput.type = "checkbox";
        preferenceInput.checked = preference.default;
        preferenceInput.addEventListener("change", () =>
          preference.onChange(preferenceInput.checked)
        );
        break;
      default:
        console.warn(`Unknown preference type selected: ${preference.type}`);
        break;
    }

    preferenceInput.id = preference.id;

    const preferenceName = document.createElement("span");
    preferenceName.classList.add("preference-name");
    preferenceName.innerHTML = preference.name;

    const preferenceQuestionMarkContainer = document.createElement("div");
    preferenceQuestionMarkContainer.classList.add(
      "preference-question-mark-container"
    );
    preferenceQuestionMarkContainer.classList.add("tooltip");

    const preferenceExplanation = document.createElement("span");
    preferenceExplanation.classList.add("tooltiptext");
    preferenceExplanation.innerHTML = preference.explanation;
    preferenceExplanation.style.width = "300px";
    preferenceExplanation.style.marginLeft = "-250px";
    preferenceExplanation.style.fontSize = "0.75rem";

    const preferenceQuestionMark = document.createElement("span");
    preferenceQuestionMark.classList.add("preference-question-mark");
    preferenceQuestionMark.innerHTML = "?";

    preferenceQuestionMarkContainer.appendChild(preferenceExplanation);
    preferenceQuestionMarkContainer.appendChild(preferenceQuestionMark);

    preferenceContainer.appendChild(preferenceInput);
    preferenceContainer.appendChild(preferenceName);
    preferenceContainer.appendChild(preferenceQuestionMarkContainer);
    preferencesContainer.appendChild(preferenceContainer);
  });
};
buildPreferences();
