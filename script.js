// Selecionando os elementos do HTML
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

// Array contendo as perguntas, alternativas e as respostas corretas
const myQuestions = [
    {
        question: "1. Qual é um dos principais benefícios do uso da IA na escola?",
        answers: {
            a: "Substituir completamente o trabalho do professor em sala de aula.",
            b: "Personalizar o aprendizado para se adequar ao ritmo de cada aluno.",
            c: "Garantir que os alunos não precisem mais estudar."
        },
        correctAnswer: "b"
    },
    {
        question: "2. O que significa promover o uso ético da IA na educação?",
        answers: {
            a: "Utilizar a IA para fazer trabalhos escolares e entregar como se fosse seu (plágio).",
            b: "Proibir qualquer tecnologia inteligente dentro da escola.",
            c: "Usar a IA como ferramenta de apoio, enquanto se desenvolve o pensamento crítico."
        },
        correctAnswer: "c"
    },
    {
        question: "3. Qual técnica computacional é a base da maioria das IAs generativas de texto (como o ChatGPT)?",
        answers: {
            a: "Processamento de Linguagem Natural (PLN) e Aprendizado de Máquina (Machine Learning).",
            b: "Formatação visual de páginas web (HTML e CSS).",
            c: "Sistemas de gerenciamento de banco de dados relacionais."
        },
        correctAnswer: "a"
    }
];

// Função que constrói o quiz e coloca no HTML
function buildQuiz() {
    const output = [];

    // Para cada pergunta...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        // Para cada resposta possível...
        for (letter in currentQuestion.answers) {
            // Criação do botão de rádio (radio button) para seleção
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    <strong>${letter.toUpperCase()}</strong>: ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        // Adiciona a pergunta e suas respostas à saída (output)
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });

    // Combina nossa lista de saída em uma string de HTML e a coloca na página
    quizContainer.innerHTML = output.join('');
}

// Função para mostrar os resultados
function showResults() {
    // Reúne todos os containers de respostas do quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    // Para cada pergunta, verifica a resposta do usuário
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // Se a resposta estiver correta
        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            // Pinta as respostas corretas de verde
            answerContainers[questionNumber].style.color = 'green';
        } else {
            // Se a resposta estiver errada ou em branco, pinta de vermelho
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    // Mostra o número de respostas corretas na página
    resultsContainer.innerHTML = `Você acertou ${numCorrect} de ${myQuestions.length} perguntas!`;
    
    // Altera a cor de fundo do resultado baseado na pontuação
    if (numCorrect === myQuestions.length) {
        resultsContainer.style.backgroundColor = '#d4edda'; // Verde claro
        resultsContainer.style.color = '#155724';
    } else {
        resultsContainer.style.backgroundColor = '#f8d7da'; // Vermelho claro
        resultsContainer.style.color = '#721c24';
    }
}

// Inicializa o quiz ao carregar a página
buildQuiz();

// Escuta o clique no botão "Enviar Respostas" e chama a função de resultados
submitButton.addEventListener('click', showResults);