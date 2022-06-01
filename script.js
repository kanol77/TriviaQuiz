const answers = document.querySelectorAll(".answer")
const category = document.querySelector('.category')
const difficulty = document.querySelector('.difficulty')
const question = document.querySelector('.question')
const next = document.querySelector('.next')
const butt = document.querySelector('.check')
const ref = document.querySelector('.ref')
const select = document.querySelector('.selectCat')
let userAnswer = document.querySelector('.field')
let formControl = document.querySelector('.form-control')
let url = ''

select.addEventListener("click", () => {
    if (formControl.value == 'any') url = 'https://opentdb.com/api.php?amount=1'
    else if (formControl.value == '9') url = 'https://opentdb.com/api.php?amount=1&category=9'
    else if (formControl.value == '10') url = 'https://opentdb.com/api.php?amount=1&category=10'
    else if (formControl.value == '11') url = 'https://opentdb.com/api.php?amount=1&category=11'
    else if (formControl.value == '12') url = 'https://opentdb.com/api.php?amount=1&category=12'
    else if (formControl.value == '13') url = 'https://opentdb.com/api.php?amount=1&category=13'
    else if (formControl.value == '14') url = 'https://opentdb.com/api.php?amount=1&category=14'
    else if (formControl.value == '15') url = 'https://opentdb.com/api.php?amount=1&category=15'
    else if (formControl.value == '16') url = 'https://opentdb.com/api.php?amount=1&category=16'
    else if (formControl.value == '17') url = 'https://opentdb.com/api.php?amount=1&category=17'
    else if (formControl.value == '18') url = 'https://opentdb.com/api.php?amount=1&category=18'
    else if (formControl.value == '19') url = 'https://opentdb.com/api.php?amount=1&category=19'
    else if (formControl.value == '20') url = 'https://opentdb.com/api.php?amount=1&category=20'
    else if (formControl.value == '21') url = 'https://opentdb.com/api.php?amount=1&category=21'
    else if (formControl.value == '22') url = 'https://opentdb.com/api.php?amount=1&category=22'
    else if (formControl.value == '23') url = 'https://opentdb.com/api.php?amount=1&category=23'
    else if (formControl.value == '24') url = 'https://opentdb.com/api.php?amount=1&category=24'
    else if (formControl.value == '25') url = 'https://opentdb.com/api.php?amount=1&category=25'
    else if (formControl.value == '26') url = 'https://opentdb.com/api.php?amount=1&category=26'
    else if (formControl.value == '27') url = 'https://opentdb.com/api.php?amount=1&category=27'
    else if (formControl.value == '28') url = 'https://opentdb.com/api.php?amount=1&category=28'
    else if (formControl.value == '29') url = 'https://opentdb.com/api.php?amount=1&category=29'
    else if (formControl.value == '30') url = 'https://opentdb.com/api.php?amount=1&category=30'
    else if (formControl.value == '31') url = 'https://opentdb.com/api.php?amount=1&category=31'
    else if (formControl.value == '32') url = 'https://opentdb.com/api.php?amount=1&category=32'

    fetchData()
})

async function fetchData() {
    let response = await fetch(url)
    let data = await response.json()
    useData(data)
}

function useData(data) {
    category.innerText = 'Category:\n ' + data.results[0].category
    difficulty.innerText = '\nDifficulty:\n ' + data.results[0].difficulty
    question.innerHTML = '\n\n\n\n\n<br><br><br>Question:\n <br><br>' + data.results[0].question + '<br><br>'

    let merArr = data.results[0].incorrect_answers.concat(data.results[0].correct_answer)
    shuffleArray(merArr)
    merArr[4] = data.results[0].correct_answer

    if (merArr[0] !== undefined) answers[0].innerHTML = '\n\nAnswer 1: ' + merArr[0] + '<br><br><br>'
    if (merArr[1] !== undefined) answers[1].innerHTML = '\n\nAnswer 2: ' + merArr[1] + '<br><br><br>'
    if (merArr[2] !== undefined && data.results[0].type == 'multiple') answers[2].innerHTML = '\n\nAnswer 3: ' + merArr[2] + '<br><br><br>'
    else answers[2].innerHTML = ''
    if (merArr[3] !== undefined && data.results[0].type == 'multiple') answers[3].innerHTML = '\n\nAnswer 4: ' + merArr[3] + '<br><br><br>'
    else answers[3].innerHTML = ''

    for (let i = 0; i < merArr.length; i++) {
        if (merArr[i] == data.results[0].correct_answer) {
            i++;
            localStorage.setItem('correct', i)
            break;
        }
    }

    butt.addEventListener('click', () => {
        if (userAnswer.value == localStorage.getItem('correct')) {
            let newDiv = document.createElement('div')
            newDiv.classList.add('info')
            newDiv.textContent = "That's a correct answer!"
            question.appendChild(newDiv)
            butt.disabled = true
            userAnswer.disabled = true
            localStorage.clear()

            $(".info2").remove();

        }
        else if (localStorage.getItem('correct') == null) return
        else {
            $("div").filter(":contains('That's an incorrect answer!')").remove()
            $(".info2").remove();
            let newDiv2 = document.createElement('div')
            newDiv2.classList.add('info2')
            newDiv2.textContent = "That's an incorrect answer!"
            question.appendChild(newDiv2)
        }

    })
}

next.addEventListener("click", () => {
    if (url == '') return
    question.innerHTML = ''
    fetchData()
    butt.disabled = false
    userAnswer.disabled = false
    userAnswer.value = ""
    userAnswer.focus()
})

ref.addEventListener("click", () => {
    window.location.reload()
})

userAnswer.addEventListener('keyup', e => {
    if(e.keyCode == 8){
        e.preventDefault()
        userAnswer.value = ""
    } 
    if(e.keyCode == 13) butt.click()
})

window.addEventListener("keyup", e => {
    if(e.keyCode == 190) next.click()
    if(e.keyCode == 78) ref.click()
})


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}