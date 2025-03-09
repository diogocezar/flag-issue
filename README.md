# GitHub Issue Flag Toggle

Uma extensão para o Chrome que permite adicionar ou remover flags (🚩) dos títulos das issues do GitHub com um simples clique.

## Funcionalidades

- Adiciona um botão 🚩 ao lado do botão "Edit" nas páginas de issues do GitHub
- Ao clicar no botão, adiciona ou remove uma flag (🚩) no início do título da issue
- Quando uma flag é adicionada, também insere automaticamente um comentário com um template para explicar o motivo da flag

## Como instalar

1. Clone este repositório ou baixe os arquivos
2. Abra o Chrome e navegue até `chrome://extensions/`
3. Ative o "Modo do desenvolvedor" no canto superior direito
4. Clique em "Carregar sem compactação" e selecione a pasta deste projeto
5. A extensão será instalada e estará pronta para uso

## Como usar

1. Navegue até qualquer página de issue do GitHub
2. Você verá um novo botão 🚩 ao lado do botão "Edit"
3. Clique neste botão para adicionar uma flag ao título da issue
4. Se o título já tiver uma flag, clicar no botão irá removê-la
5. Quando uma flag é adicionada, um comentário será automaticamente inserido com a data e hora, e você poderá preencher o motivo

## Método alternativo (sem instalar a extensão)

Se você preferir não instalar a extensão, pode usar o script direto:

1. Navegue até uma página de issue do GitHub
2. Abra o console do navegador (F12 ou Ctrl+Shift+J / Cmd+Option+J)
3. Copie e cole o conteúdo do arquivo `direct-script.js` no console
4. Pressione Enter para executar o script
5. O botão 🚩 será adicionado ao lado do botão "Edit"

Observe que este método precisa ser repetido cada vez que você carregar uma nova página de issue.

## Solução de problemas

Se o botão de flag não aparecer:

1. Verifique se você está em uma página de issue do GitHub
2. Abra o console do navegador (F12 ou Ctrl+Shift+J / Cmd+Option+J)
3. Verifique se há mensagens de erro
4. Execute o comando `window.GitHubFlagToggle.addFlagToggleButton()` no console para tentar adicionar o botão manualmente
5. Se o comando acima não funcionar, você pode copiar e colar o conteúdo do arquivo `debug.js` no console para obter informações de diagnóstico
6. Tente recarregar a página
7. Se necessário, reinstale a extensão
8. Como último recurso, use o método alternativo com o `direct-script.js`

### Problemas comuns

- **O botão não aparece**: Pode ser que o GitHub tenha mudado a estrutura da página. Tente usar o script direto.
- **O botão aparece mas não é visível**: Pode haver algum CSS do GitHub sobrepondo o botão. Tente usar o debug para verificar a visibilidade.
- **O botão não funciona ao clicar**: Verifique no console se há erros quando você clica no botão.
- **O campo de título não é encontrado**: O GitHub pode ter mudado o seletor do campo. Tente atualizar a extensão.

## Depuração

Para depurar a extensão:

1. Abra o console do navegador enquanto estiver em uma página de issue do GitHub
2. Você verá logs com o prefixo "GitHub Flag Toggle:" que podem ajudar a identificar problemas
3. Use o arquivo `debug.js` para obter informações detalhadas sobre os elementos da página
4. Para forçar a adição do botão, execute `window.GitHubFlagToggle.addFlagToggleButton()`
5. Para verificar se o objeto global está disponível, verifique `window.GitHubFlagToggle`

## Observações

- A extensão funciona apenas em páginas de issues do GitHub
- É necessário ter permissão para editar a issue para que a funcionalidade funcione corretamente
- A interface do GitHub pode mudar com o tempo, o que pode afetar o funcionamento da extensão
- Se você encontrar problemas, verifique se há atualizações disponíveis para a extensão 