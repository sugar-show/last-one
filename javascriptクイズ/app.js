const questions = [
    {
        question: "二人の名前は？",
        answers: [
            { text: "ひまり＆さくら", correct: false},
            { text: "ちか＆みく", correct: false},
            { text: "あんな＆なつき", correct: false},
            { text: "ゆいな＆じゅな", correct: true},
        ]
    },
    {
        question: "オープンしたのは？",
        answers: [
            { text: "2023年10月", correct: false},
            { text: "2023年6月", correct: true},
            { text: "2023年1月", correct: false},
            { text: "2023年3月", correct: false},
        ]
    },
    {
        question: "髭女の由来は？",
        answers: [
            { text: "髭生えてるから", correct: false},
            { text: "髭が生えてる男性が好きだから", correct: false},
            { text: "メニューにある髭ビールが由来", correct: true},
            { text: "特に理由はない", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }   
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    if(score === questions.length){
        questionElement.innerHTML = `あなたは${questions.length}点中、${score}点取りました！！！
    100円引きクーポンをプレゼントします！`;
    }else if(score === 2){
        questionElement.innerHTML = `あなたは${questions.length}点中、${score}点取りました！！！
    50円引きクーポンをプレゼントします！`;
    }else if(score === 1){
        questionElement.innerHTML = `あなたは${questions.length}点中、${score}点取りました！！！
    30円引きクーポンをプレゼントします！`;
    }else{
        questionElement.innerHTML = `0点ですか、、、悲しいです。次は満点取って100円引きクーポンを手に入れましょう！！！`
    }
    nextButton.innerHTML = "PLAY AGAIN";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click",  () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})


startQuiz();
