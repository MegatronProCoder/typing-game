const quoteApiURL = 'http://api.quotable.io/random'
const typingContent = document.getElementById('typingContent')
const typingInput = document.getElementById('typingInput')
const timer = document.getElementById('timer')

let timerStarted = false
function getRandomQuote(){
    return fetch(quoteApiURL)
        .then( response => response.json())
        .then(response=> response.content)
}

async function renderNextQuote() {
    const quote = await getRandomQuote();
    typingInput.value = ''
    typingContent.innerHTML = ''; // Clear any previous quote

    quote.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        typingContent.append(span);
    });
    resetTimer()
}

renderNextQuote()


typingInput.addEventListener('input' , ()=>{
// when user starts typing , timer starts
    if(!timerStarted){
        timerStarted = true;
        Timer();
    }

    let allCharCorrect = false;
    [...quoteArray] = typingContent.querySelectorAll('span')
    quoteValue = typingInput.value.split('')

    quoteArray.forEach((char , index) => {
        if(index < quoteValue.length){
            const inputChar = quoteValue[index]
            if(char.innerText === inputChar){
                char.classList.add('correct')
                char.classList.remove('incorrect')
            }
            else{
                char.classList.add('incorrect')
                char.classList.remove('correct')
            }
        }else{
            char.classList.remove('correct')
            char.classList.remove('incorrect')
            
        }
        
        if (index === quoteArray.length - 1) {
            allCharCorrect = quoteArray.every(char => char.classList.contains('correct'));
        }
    })

    if (allCharCorrect) {
        renderNextQuote()
    }
})


let startTime
let timerInterval
function Timer(){
    startTime = new Date()
    timerInterval = setInterval(() => {
        timer.innerText = Math.floor((new Date() - startTime) / 1000)
    }, 1000);   
}
function resetTimer() {
    clearInterval(timerInterval);
    timer.innerText = '0';
    timerStarted = false;
}




