const ROLLS = [];
const STATUSES = ['initiative', 'life', 'freedom', 'sheep', 'revenge', 'firstborn child', 'mortal enemy', 'strength', 'midterm grade', 'next snakpass gift', 'intelligence', 'seduction', 'strength'];
const EMOJIS = ["😀","😃","😄","😁","😆","😅","😂","🤣","🥲","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🥸","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾"];
const ROLL_TIME = 1500;
const UPDATE_TIME = 75;
/**
 * 0: completely random 2d6
 * 1: ordered bag of 2d6 rolls
 * 2: d12
 */
let mode = 0;

const genRolls = (mode) => {
    let base = [...Array(6).keys()].map(i => i + 1);
    for (let x of base) {
        for (let y of base) {
            ROLLS.push(x + y);
        }
    }
    ROLLS.sort(() => .5 - Math.random())
}
genRolls();

document.getElementById('roll-btn').addEventListener('click', () => {
    document.getElementById('roll-btn-content').innerHTML = `roll for your ${STATUSES[Math.floor(Math.random() * STATUSES.length)]}`;
    document.getElementById('roll-btn-emoji').classList.add('spinning');
    if (ROLLS.length === 0) {
        genRolls();
    }
    let num = ROLLS.pop();
    let refreshes = Math.floor(ROLL_TIME / UPDATE_TIME);
    let interval = setInterval(() => {
      if (refreshes > 0) {
        document.getElementById('roll-out').innerHTML = `Current roll: ${EMOJIS[Math.floor(Math.random() * EMOJIS.length)]}`;
        refreshes -= 1;
      } else {
        clearInterval(interval);
        console.log(ROLLS);
        document.getElementById('roll-out').innerHTML = `Current roll: ${num}`;
        document.getElementById('roll-left').innerHTML = `Rolls left in bag: ${ROLLS.length}`;
        document.getElementById('roll-btn-emoji').classList.remove('spinning');
      }
    }, UPDATE_TIME);
})

