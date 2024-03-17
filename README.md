# Trabalho Prático 2 - Implementação de API GraphQL

Este projeto é um esboço de API GraphQL utilizando node.js com Express.

## Instalação

- Necessário a instalação de node.js;
- Necessário instalar o express: npm install express;

Após a instalação dos itens acima, execute o comando: npm init para inicializar o servidor node.

Na sequencia, executar o comando: node server.js aguardar a confirmação de que os endpoints estão disponiveis na porta 3000.

A partir deste ponto é possivel executar as operações listadas abaixo.


# Lista de todas as tarefas
{
  tasks {
    id
    title
    description
    completed
  }
}

# Detalhes de uma tarefa específica com base no seu ID
{
  task(id: "1") {
    id
    title
    description
    completed
  }
}

# Lista de tarefas concluídas
{
  completedTasks {
    id
    title
    description
    completed
  }
}

# Lista de tarefas pendentes
{
  pendingTasks {
    id
    title
    description
    completed
  }
}

# Lista de usuários
{
  users {
    id
    name
    email
  }
}


# Lista de tarefas associadas ao usuário

{
  task(id: "1") {
    id
    title
    description
    completed
    userId
    	users {
        name
      }
  }
}