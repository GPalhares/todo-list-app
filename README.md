# Todo List - Frontend 🚀

Este repositório contém o **frontend** da aplicação de To-Do List, desenvolvido para a vaga de desenvolvedor Fullstack na empresa DeMaria. A aplicação foi construída utilizando **React** e outras tecnologias modernas para criar uma interface intuitiva e performática.

## Como Rodar o Projeto 💻

1. **Clone o Repositório** 🖥️:

   Para começar, clone o repositório do GitHub com o seguinte comando:

   ```bash
   git clone https://github.com/GPalhares/todo-list-app.git
   ```

2. **Acesse a Pasta do Projeto** 📂:

   Após clonar o repositório, entre na pasta do projeto com o comando:

   ```bash
   cd todo-list-app
   ```

3. **Suba o Docker em Segundo Plano** 🐳:

   Agora, utilize o Docker para rodar a aplicação em segundo plano. Para isso, execute o seguinte comando:

   ```bash
   docker compose up -d
   ```

4. **Acesse a Aplicação** 🌐:

   Após o Docker ter subido com sucesso, você pode acessar a aplicação no seu navegador no seguinte endereço:

   http://localhost:5173/

## Funcionalidades 🔑

1. **Adicionar Tarefas** ➕: O usuário pode adicionar novas tarefas à sua lista.
2. **Marcar Tarefa como Concluída** ✅: O status da tarefa pode ser alterado para "concluída".
3. **Excluir Tarefas** 🗑️: O usuário pode excluir tarefas. Para usuários comuns, a exclusão é permanente.
4. **Edição de Tarefas** ✏️: O usuário pode editar o status e a descrição das tarefas.
5. **Autenticação de Usuário** 🔑: O sistema possui páginas de login e registro para o usuário, com validações de entradas e autenticação JWT.
6. **Sistema de Back Office para Admin** 👨‍💼: Funcionalidades como visualização de usuários, cópia de ID e soft delete são implementadas.
7. **Integração com OpenAI** 🤖: Utilização da API da **OpenAI** para gerar **tags para as tarefas** com base no texto digitado. Quando o usuário digita uma tarefa com pelo menos 5 caracteres, é exibido um botão "Gerar Tags com IA", e a IA sugere automaticamente 2 tags relacionadas à tarefa.
8. **Integração com API de Piadas Nerds** 😂: Conexão com a API pública **official-joke-api.appspot.com** para fornecer **piadas nerds aleatórias**. O usuário pode clicar em um botão para receber uma piada de forma divertida e interativa (Esse botão se encontra na página de Profile).

### ⚠️ Atenção:

A funcionalidade de integração com a **OpenAI** só vai funcionar se você acessar a aplicação através do deploy por causa das variáveis de ambiente.  
Acesse a versão hospedada em: [Link do Deploy](https://todo-list-fawn-psi.vercel.app/)
Somente o front-end está deployado; você ainda vai precisar rodar o backend na sua máquina!

## Ferramentas e Bibliotecas Utilizadas ⚙️

1. **React** ⚛️:

   - Utilizado para construir a interface da aplicação de maneira modular e reutilizável.

2. **React Router Dom** 🛣️:

   - Utilizado para navegação entre as páginas da aplicação.

3. **React Hook Form** 📝:

   - Utilizado para facilitar o gerenciamento de formulários, com validação simplificada e melhor desempenho.

4. **Context API** 🌐:

   - Usado para gerenciar o estado global da aplicação, como a autenticação do usuário e dados das tarefas.

5. **Bootstrap** 🎨:

   - Utilizado para construção da interface com uma biblioteca de componentes responsivos e prontos.

6. **Vite** ⚡:

   - Utilizado como ferramenta de bundling devido à sua alta performance e velocidade de inicialização no ambiente de desenvolvimento.

7. **Axios** 🌐:

   - Usado para fazer requisições HTTP à API backend, facilitando a comunicação entre frontend e backend.

8. **React DataTable** 📊:
   - Utilizado para implementar a tabela de usuários no back office.

## Decisões Técnicas 💡

1. **Gerenciamento de Estado com Context API** 🗂️:

   - Utilize o **Context API** para gerenciar o estado global da aplicação. Para garantir um estado persistente entre as navegações, usei três contextos principais:
     - **Users Context**: Para gerenciar o estado de usuários autenticados.
     - **Tasks Context**: Para gerenciar as tarefas do usuário.
     - **Auth Context**: Para gerenciar a autenticação e garantir que o estado de login não se perca entre as páginas.

   Essa abordagem evita requisições desnecessárias e recarregamentos da página, proporcionando uma experiência mais fluida.

2. **Custom Hooks** 🪝:

   - Criei **Custom Hooks** para realizar requisições pontuais de dados, como a obtenção de tarefas, dados de usuários e funcionalidades de login.
   - Isso evita o uso de **prop drilling** entre componentes e melhora a legibilidade e organização do código.

3. **Layout Mobile-First** 📱:

   - A aplicação foi desenvolvida com uma abordagem **Mobile-First** para garantir uma experiência responsiva e adaptável a diferentes tamanhos de tela, especialmente dispositivos móveis.
   - Todos os botões e menus foram inspirados em aplicativos móveis, priorizando a simplicidade e funcionalidade.

4. **Sistema Back Office para Admin** 👨‍💼:

   - Para usuários com o **userType 2 (Admin)**, implementei uma interface de **Back Office**, onde é possível:

     - Exibir todos os usuários em uma tabela utilizando o **React DataTable**.
     - Copiar o **ID de cada usuário** facilmente.
     - Realizar um **soft DELETE** no usuário, impedindo seu login no sistema, mas permitindo reverter a ação com um clique de um botão.
     - A utilização do soft DELETE foi implementada para proteger dados importantes, evitando a exclusão permanente por engano.

     **Credenciais do Admin**:

     - **Email**: `admin@demaria.com`
     - **Senha**: `demaria`

5. **Páginas para Usuários Comuns** 🧑‍💻:

   - **Listagem de Tarefas**: Usuários comuns (**userType 1**) podem visualizar, editar e criar suas próprias tarefas.
   - **Edição e Criação de Tarefas**: Funcionalidades completas para gerenciamento das tarefas.
   - **Delete Total**: Ao contrário do Admin, os usuários comuns possuem a opção de **excluir totalmente** as tarefas, já que estas são consideradas menos críticas.

6. **Página de Perfil** 👤:

   - O usuário pode editar seu **email** e **nome**, com validação de que o email seja válido e não exista no banco de dados, além de tornar o nome obrigatório.

7. **Integração com API Externa para Piadas** 😂:

   - Ao clicar em um botão, o usuário recebe uma piada aleatória do tipo **nerd** da API pública oficial [Official Joke API](https://official-joke-api.appspot.com).

8. **Integração com OpenAI API 🤖**:

   - Quando o usuário digita uma tarefa com pelo menos **5 letras**, um botão **Gerar Tags com IA** aparece.
   - A IA sugere **2 tags** para a tarefa utilizando a API do **ChatGPT** da OpenAI.

9. **Uso de Ícones SVG do FlatIcon** 🖼️:

   - Optei por utilizar **ícones SVG** do site **FlatIcon** em vez de usar os ícones padrão do **Bootstrap**. Essa decisão foi tomada para evitar impactos negativos no SEO e melhorar a performance do site. O uso de SVGs oferece ícones escaláveis e mais leves, que ajudam na otimização do tempo de carregamento.

10. **Técnica de Optimistic UI** 🚀:

- Adotei a técnica de **Optimistic UI**, onde realizo mudanças no frontend **antes** das requisições ao backend serem completadas. Isso foi inspirado em redes sociais, onde, por exemplo, ao fazer um comentário, ele é exibido imediatamente antes da resposta do servidor. Utilizei essa abordagem nas requisições de **tarefas** e **usuários** para o **admin**, tornando a aplicação mais dinâmica e fluída, melhorando a experiência do usuário.

11. **Lazy Loading e Suspense** 💤:

- Implementei **Lazy Loading** e **Suspense** nas rotas para carregar apenas as partes da aplicação que são realmente necessárias. Isso melhora o desempenho e torna o site mais leve.
- A única exceção foi para as rotas **Login** e **Register**, que são pré-carregadas, já que são geralmente as primeiras páginas acessadas pelos usuários.

12. **Autenticação com JWT 🔒**:

- Utilizei **JWT (JSON Web Tokens)** para armazenar dados do usuário de forma segura no navegador. Isso permite verificar a validade do login sem a necessidade de fazer uma requisição ao backend a cada nova interação do usuário.

13. **Uso de Docker para Facilitar o Desenvolvimento 🐳**:

- O projeto foi **dockerizado** para facilitar seu uso em qualquer máquina ou sistema operacional, garantindo que a configuração seja a mesma independentemente do ambiente de desenvolvimento.

14. **Uso de `useMemo` para Melhorar a Performance ⚡**:

- Utilize o **hook `useMemo`** nas listas de tarefas e usuários para evitar cálculos desnecessários e melhorar a performance da aplicação. O `useMemo` ajuda a memorizar o valor de variáveis ou funções de forma que não seja recalculado toda vez que o componente é renderizado, garantindo uma experiência mais rápida, especialmente em listas grandes.

---

Se você leu até aqui, muito obrigado! 🙏 Agradeço também à DeMaria pela oportunidade de desenvolver este projeto como parte do processo seletivo. Foi uma experiência incrível e enriquecedora! 🚀
