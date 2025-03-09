function addFlagToggleButton() {
  if (document.querySelector(".flag-toggle-button")) return;

  const flagButton = document.createElement("button");
  flagButton.type = "button";
  flagButton.className = "flag-toggle-button";
  flagButton.innerHTML = "🚩";
  flagButton.addEventListener("click", handleFlagToggle);

  // Encontrar o botão de edição
  const container = document.querySelector(".kcuWpx");

  if (container) {
    container.appendChild(flagButton);
  }
}

async function handleFlagToggle() {
  console.log("GitHub Flag Toggle: Botão de flag clicado");

  // Clicar no botão de edição para abrir o campo de edição
  const editButton = document.querySelector(
    'button[data-testid="edit-issue-title-button"], button[aria-label="Rename issue"]'
  );
  if (editButton) {
    editButton.click();
    console.log("GitHub Flag Toggle: Botão de edição clicado");

    // Esperar um pouco para o campo de edição aparecer
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Encontrar o campo de input do título
    const titleInput = document.querySelector(
      'input[data-testid="issue-title-input"]'
    );
    if (titleInput) {
      console.log("GitHub Flag Toggle: Campo de título encontrado");

      // Verificar se o título já tem a flag
      const currentTitle = titleInput.value;
      const hasFlag = currentTitle.trim().startsWith("🚩");

      if (hasFlag) {
        // Remover a flag se já existir
        titleInput.value = currentTitle.replace(/^🚩\s*/, "");
        console.log("GitHub Flag Toggle: Flag removida do título");
      } else {
        // Adicionar a flag se não existir
        titleInput.value = `🚩 ${currentTitle}`;
        console.log("GitHub Flag Toggle: Flag adicionada ao título");
      }

      // Simular evento de input para garantir que o GitHub reconheça a mudança
      titleInput.dispatchEvent(new Event("input", { bubbles: true }));

      // Pressionar Enter para salvar a edição
      titleInput.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          bubbles: true,
        })
      );

      // Se adicionamos a flag, adicionar um comentário
      if (!hasFlag) {
        await addFlagComment();
      }
    } else {
      console.log("GitHub Flag Toggle: Campo de título não encontrado");
    }
  } else {
    console.log(
      "GitHub Flag Toggle: Botão de edição não encontrado para clicar"
    );
  }
}

async function addFlagComment() {
  // Esperar um pouco para garantir que a edição do título foi concluída
  await new Promise((resolve) => setTimeout(resolve, 1200));

  console.log("GitHub Flag Toggle: Tentando adicionar comentário");

  // Encontrar o textarea de comentário usando múltiplos seletores
  const commentTextarea = document.querySelector(
    'textarea.MarkdownInput-module__textArea--QjIwG, textarea[aria-labelledby="comment-composer-heading"]'
  );
  if (commentTextarea) {
    console.log("GitHub Flag Toggle: Textarea de comentário encontrado");

    // Obter a data e hora atual formatada
    const now = new Date();
    const dateTimeStr = now.toLocaleString();

    // Criar o template do comentário
    const commentTemplate = `## 🚩 Flag Adicionada
*Data*: ${dateTimeStr}
*Motivo*: `;

    // Definir o valor do textarea
    commentTextarea.value = commentTemplate;

    // Simular evento de input para garantir que o GitHub reconheça a mudança
    commentTextarea.dispatchEvent(new Event("input", { bubbles: true }));

    // Focar no textarea para que o usuário possa preencher o motivo
    commentTextarea.focus();

    // Posicionar o cursor após "Motivo: "
    const cursorPosition = commentTemplate.length;
    commentTextarea.setSelectionRange(cursorPosition, cursorPosition);

    console.log("GitHub Flag Toggle: Comentário adicionado com sucesso");
  } else {
    console.log("GitHub Flag Toggle: Textarea de comentário não encontrado");
  }
}

// Função para observar mudanças no DOM e adicionar o botão quando necessário
function observeDOMChanges() {
  console.log("GitHub Flag Toggle: Iniciando observação do DOM");

  // Tentar adicionar o botão imediatamente
  setTimeout(() => {
    addFlagToggleButton();
  }, 1000);

  // Criar um observador de mutação
  const observer = new MutationObserver((mutations) => {
    // Verificar se o botão de edição existe e adicionar o botão de flag se necessário
    addFlagToggleButton();
  });

  // Configurar o observador para observar todo o documento
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style", "data-testid"],
  });
}

// Iniciar a observação do DOM quando a página estiver carregada
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("GitHub Flag Toggle: DOM carregado, iniciando observação");
    observeDOMChanges();
  });
} else {
  console.log(
    "GitHub Flag Toggle: DOM já carregado, iniciando observação imediatamente"
  );
  observeDOMChanges();
}

// Adicionar um listener para quando a URL mudar (navegação SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    console.log("GitHub Flag Toggle: URL mudou, verificando botão de flag");
    setTimeout(() => {
      addFlagToggleButton();
    }, 1500);
  }
}).observe(document, { subtree: true, childList: true });

// Expor funções globalmente para depuração
window.GitHubFlagToggle = {
  addFlagToggleButton,
  handleFlagToggle,
  addFlagComment,
};
