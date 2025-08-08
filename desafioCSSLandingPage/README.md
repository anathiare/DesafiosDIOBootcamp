# Desafio de Projeto: Construindo uma Landing Page com CSS

Projeto desenvolvido como parte da trilha de CSS da [Digital Innovation One](https://dio.me/), com o objetivo de recriar uma landing page a partir de um design fornecido no Figma, aplicando conceitos modernos de estilização com CSS.

## 🚀 Acesse o Projeto Ao Vivo

A landing page está no ar e pode ser visualizada em tempo real através do GitHub Pages.

**[Clique aqui para acessar a demonstração](https://anathiare.github.io/DesafiosDIOBootcamp/desafioCSSLandingPage/index.html)**
---

### ✨ Funcionalidades e Efeitos Implementados

Este projeto demonstra a aplicação de diversas técnicas de CSS para criar uma experiência de usuário rica e moderna:

- **Layout com Flexbox:** Todas as seções foram estruturadas e alinhadas utilizando CSS Flexbox, garantindo um layout centralizado e flexível.
- **Fontes Customizadas:** Uso da propriedade `@import` para carregar a fonte "Raleway" do Google Fonts, mantendo a consistência tipográfica do design.
- **Efeitos de Texto Avançados:**
  - **Gradiente no Texto:** O título principal utiliza `background-clip: text` para aplicar um fundo gradiente ao texto.
  - **Sombra 3D:** A chamada "Transforme o mundo com a gente" possui um `text-shadow` sólido para criar um efeito de profundidade.
- **Efeito Parallax:** A imagem de fundo principal permanece fixa (`background-attachment: fixed`) enquanto o conteúdo rola sobre ela, criando um elegante efeito de profundidade (parallax).
- **Estilização de Componentes:**
  - Botões customizados com estado `:hover`.
  - Cards de módulos com `box-shadow` interna para um acabamento sutil.
- **Design Responsivo:** Embora o foco tenha sido o design desktop do Figma, foram utilizadas unidades e propriedades (como `max-width` e `width: 100%`) que garantem que o conteúdo se adapte de forma coesa a diferentes tamanhos de tela.

---

### 🛠️ Tecnologias Utilizadas

- **HTML5:** Para a estrutura semântica do conteúdo.
- **CSS3:** Para toda a estilização, layout e efeitos visuais.

---
# Informações Originais #

## Desafio 01: Criando sua primeira Landing Page com HTML e CSS

Bem vindo(a) ao primeiro desafio da Trilha de CSS da DIO! Nela, você vai construir sua primeira Landing Page com HTML e CSS, colocando em prática os fundamentos do CSS,
as propriedades básicas da linguagem de estilização, além de trabalhar com as unidades de medidas relativas e absolutas que aprendemos ao longo da trilha.

[Clique aqui](https://micheleambrosio.github.io/dio-trilha-css-desafio-01/) para acessar o resultado final da Landing Page criada a partir do desafio!

<p align="center">
  <img alt="Demonstração da Landing Page finalizada" src="https://user-images.githubusercontent.com/55519539/183538055-6cce606c-7d1d-4d15-a4be-ffeb5b37c956.png">
</p>

Para você realizar o desafio, basta fazer um **fork** para o seu GitHub e começar a mexer no projeto.
Dentro da pasta *main*, você vai encontrar todas as imagens e o arquivo HTML, contendo a estrutura básica da sua página, faltando apenas
realizar a estilização da sua página. É necessário que você faça toda a parte responsável por interligar sua página HTML com suas folhas
de estilo para que o resultado da estilização funcione.

[Link do Figma](https://www.figma.com/file/3PiokoJj9IhGDnNiWAJbz7/DIO---Desafio-01?node-id=2%3A6) contendo o protótipo do desafio para
que você possa se basear.

*Observações: para aplicar os textos em gradiente, utilize a propriedade CSS background-clip, porém, para funcionar em alguns navegadores,
é necessário utilizar a propriedade -webkit-background-clip: text;*

Caso tenha alguma dúvida, ou queira comparar o resultado do desafio que você fez, nós temos o site finalizado na branch *final*. Basta alterar a branch do projeto
utilizando o comando `git checkout final` no seu terminal.
