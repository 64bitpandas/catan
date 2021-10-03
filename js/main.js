const ROLLS = [];
const STATUSES = ['initiative', 'life', 'freedom', 'sheep', 'revenge', 'firstborn child', 'mortal enemy', 'strength', 'midterm grade', 'next snakpass gift'];

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
    document.getElementById('roll-btn').innerHTML = `roll for your ${STATUSES[Math.floor(Math.random() * STATUSES.length)]}`
    if (ROLLS.length === 0) {
        genRolls();
    }
    let num = ROLLS.pop();
    let interval = setInterval(() => {
        document.getElementById('roll-out').innerHTML = `Current roll: ${Math.ceil(Math.random() * 12)}`;
    }, 100);
    setTimeout(() => {
        clearInterval(interval); 
    }, 1000);
    setTimeout(() => {
        document.getElementById('roll-out').innerHTML = `Current roll: ${num}`;
        document.getElementById('roll-left').innerHTML = `Rolls left in bag: ${ROLLS.length}`;
    }, 1200);

})

