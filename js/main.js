const ROLLS = [];
const STATUSES = ['initiative', 'life', 'freedom', 'sheep', 'revenge', 'firstborn child', 'mortal enemy', 'strength', 'midterm grade', 'next snakpass gift', 'intelligence', 'seduction', 'strength'];
const EMOJIS = ["๐","๐","๐","๐","๐","๐","๐","๐คฃ","๐ฅฒ","๐","๐","๐","๐","๐","๐","๐","๐ฅฐ","๐","๐","๐","๐","๐","๐","๐","๐","๐คช","๐คจ","๐ง","๐ค","๐","๐ฅธ","๐คฉ","๐ฅณ","๐","๐","๐","๐","๐","๐","๐","โน๏ธ","๐ฃ","๐","๐ซ","๐ฉ","๐ฅบ","๐ข","๐ญ","๐ค","๐ ","๐ก","๐คฌ","๐คฏ","๐ณ","๐ฅต","๐ฅถ","๐ฑ","๐จ","๐ฐ","๐ฅ","๐","๐ค","๐ค","๐คญ","๐คซ","๐คฅ","๐ถ","๐","๐","๐ฌ","๐","๐ฏ","๐ฆ","๐ง","๐ฎ","๐ฒ","๐ฅฑ","๐ด","๐คค","๐ช","๐ต","๐ค","๐ฅด","๐คข","๐คฎ","๐คง","๐ท","๐ค","๐ค","๐ค","๐ค ","๐","๐ฟ","๐น","๐บ","๐คก","๐ฉ","๐ป","๐","โ ๏ธ","๐ฝ","๐พ","๐ค","๐","๐บ","๐ธ","๐น","๐ป","๐ผ","๐ฝ","๐","๐ฟ","๐พ"];
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

