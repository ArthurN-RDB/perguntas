/**
 * Lógica do Quiz Interativo: Técnicas Computacionais e IA na Escola
 */

// Banco de perguntas
const quizData = [
  {
    question: "O que caracteriza o 'Pensamento Computacional' no ambiente educacional?",
    options: [
      "Apenas aprender a programar em linguagens de computador avançadas.",
      "Um conjunto de táticas e estratégias para formular e resolver problemas criticamente.",
      "Substituir todos os livros físicos por computadores e tablets.",
      "Usar calculadoras e planilhas eletrônicas durante as aulas de matemática."
    ],
    correct: 1,
    explanation: "O Pensamento Computacional é uma habilidade de resolução de problemas que engloba decomposição, reconhecimento de padrões, abstração e algoritmos, indo além do uso simples de programas."
  },
  {
    question: "Qual é o pilar do Pensamento Computacional focado em dividir um problema grande em partes menores?",
    options: [
      "Abstração",
      "Reconhecimento de Padrões",
      "Decomposição",
      "Algoritmos"
    ],
    correct: 2,
    explanation: "A Decomposição consiste em quebrar um problema complexo em partes menores e mais fáceis de analisar e resolver."
  },
  {
    question: "Ao utilizar ferramentas de IA Generativa nos estudos, qual deve ser o papel principal do estudante?",
    options: [
      "Copiar e colar as respostas diretamente nas tarefas escolares.",
      "Adotar uma postura crítica, auditando as informações e utilizando a IA como apoio pedagógico.",
      "Aceitar que a IA sempre fornece informações 100% corretas e isentas de erros.",
      "Deixar que a IA redija todas as redações e trabalhos acadêmicos."
    ],
    correct: 1,
    explanation: "A IA é um assistente pedagógico. O estudante deve exercer o pensamento crítico para checar fontes, evitar plágio e validar se a resposta gerada é verdadeira e sem alucinações."
  },
  {
    question: "O que são os 'vieses algorítmicos' nos sistemas de Inteligência Artificial?",
    options: [
      "Aumentos de velocidade na gravação de dados.",
      "Vírus que danificam o código de programas educacionais.",
      "Preconceitos e distorções reproduzidos pela IA decorrentes dos dados históricos usados no seu treinamento.",
      "Sistemas de segurança que impedem o uso de alunos em sala de aula."
    ],
    correct: 2,
    explanation: "Como a IA é treinada com dados gerados por humanos, ela pode herdar e amplificar preconceitos e estereótipos presentes nesses conjuntos de dados se não for devidamente auditada."
  },
  {
    question: "Como os professores podem se beneficiar das técnicas de IA em sala de aula?",
    options: [
      "Personalizando trilhas de aprendizagem e automatizando diagnósticos pedagógicos de rotina.",
      "Delegando a responsabilidade de lecionar inteiramente para os robôs.",
      "Eliminando a necessidade de planejar aulas e interagir com os estudantes.",
      "Proibindo completamente o uso de tecnologia na escola."
    ],
    correct: 0,
    explanation: "A IA apoia o professor ao automatizar tarefas administrativas e diagnósticas, permitindo personalizar materiais para as necessidades específicas de cada estudante."
  }
];

// Estado do quiz
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// Elemento do DOM
const quizContainer = document.getElementById("quiz-container");

/**
 * Renderiza a pergunta atual ou a tela final
 */
function renderQuiz() {
  if (currentQuestionIndex >= quizData.length) {
    renderResults();
    return;
  }

  const currentQuiz = quizData[currentQuestionIndex];
  const progressPercent = (currentQuestionIndex / quizData.length) * 100;

  quizContainer.innerHTML = `
    <div class="quiz-progress">
      <span>Questão ${currentQuestionIndex + 1} de ${quizData.length}</span>
      <span>Pontuação: ${score}</span>
    </div>
    
    <div class="progress-bar-bg">
      <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
    </div>

    <h3 class="quiz-question">${currentQuiz.question}</h3>

    <div class="options-list">
      ${currentQuiz.options
        .map(
          (optionText, index) => `
        <button class="option-btn" data-index="${index}">
          <span>${optionText}</span>
        </button>
      `
        )
        .join("")}
    </div>

    <div id="explanation-container"></div>

    <div class="quiz-footer">
      <button id="next-btn" class="btn btn-primary" style="display: none;">
        ${currentQuestionIndex === quizData.length - 1 ? "Ver Resultado" : "Próxima Questão"}
      </button>
    </div>
  `;

  // Adiciona eventos aos botões de opção
  const optionButtons = quizContainer.querySelectorAll(".option-btn");
  optionButtons.forEach((btn) => {
    btn.addEventListener("click", () => handleSelectOption(btn, optionButtons));
  });

  // Evento do botão "Próxima Questão"
  const nextBtn = quizContainer.querySelector("#next-btn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentQuestionIndex++;
      selectedOption = null;
      renderQuiz();
    });
  }
}

/**
 * Trata o clique na opção do usuário
 */
function handleSelectOption(selectedBtn, allButtons) {
  if (selectedOption !== null) return; // Trava após escolher

  const selectedIndex = parseInt(selectedBtn.getAttribute("data-index"));
  const currentQuiz = quizData[currentQuestionIndex];
  selectedOption = selectedIndex;

  // Desabilita opções
  allButtons.forEach((btn) => (btn.disabled = true));

  // Validação da resposta
  if (selectedIndex === currentQuiz.correct) {
    selectedBtn.classList.add("correct");
    selectedBtn.innerHTML += ` <span>✓</span>`;
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    selectedBtn.innerHTML += ` <span>✗</span>`;
    
    // Destaca a correta
    const correctBtn = allButtons[currentQuiz.correct];
    correctBtn.classList.add("correct");
  }

  // Explicação pedagógica
  const explanationContainer = document.getElementById("explanation-container");
  explanationContainer.innerHTML = `
    <div class="quiz-explanation">
      <strong>Explicação:</strong> ${currentQuiz.explanation}
    </div>
  `;

  // Exibe botão de continuar
  const nextBtn = document.getElementById("next-btn");
  nextBtn.style.display = "inline-block";
}

/**
 * Renderiza o resultado final
 */
function renderResults() {
  const percentage = Math.round((score / quizData.length) * 100);
  let feedbackMessage = "";

  if (percentage === 100) {
    feedbackMessage = "Excelente! Você domina os conceitos de IA e Técnicas Computacionais na Educação!";
  } else if (percentage >= 60) {
    feedbackMessage = "Muito bem! Você compreende o papel crítico da IA e do Pensamento Computacional.";
  } else {
    feedbackMessage = "Bom esforço! Recomendamos revisar as seções do site para aprofundar seu aprendizado.";
  }

  quizContainer.innerHTML = `
    <div class="results-container">
      <div class="results-icon">🎯</div>
      <h3>Quiz Concluído!</h3>
      <div class="results-score">${score} de ${quizData.length} acertos (${percentage}%)</div>
      <p class="results-text">${feedbackMessage}</p>
      <button id="restart-btn" class="btn btn-primary">Refazer Quiz</button>
    </div>
  `;

  document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    renderQuiz();
  });
}

// Inicializa quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  renderQuiz();
});
