const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
const _ = require('lodash');

// Importa os tipos e resolvers das entidades
const TaskType = require('./schema/task');
const UserType = require('./schema/user');

// Simulação de dados
const tasks = [
  { id: '1', title: 'Ler livros', description: 'Leitura para se atualizar.', completed: false, userId: '1' },
  { id: '2', title: 'Cozinhar', description: 'Preparar as marmitas da semana.', completed: true, userId: '2' },
  { id: '3', title: 'Fazer exercícios', description: 'Praticar exercícios físicos diariamente', completed: false, userId: '3' },
  { id: '4', title: 'Beber Agua', description: 'Se hidratar.', completed: false, userId: '3' }
];

// Define os resolvers
const rootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: () => tasks,
    },
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => tasks.find(task => task.id === args.id),
    },
    completedTasks: {
      type: new GraphQLList(TaskType),
      resolve: () => tasks.filter(task => task.completed),
    },
    pendingTasks: {
      type: new GraphQLList(TaskType),
      resolve: () => tasks.filter(task => !task.completed),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => users,
    },
    },
  }
);


// Definição do tipo Mutation
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    createTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args, context) => {
        // Criando uma nova tarefa com os dados fornecidos
        const newTask = {
          id: String(tasks.length + 1),
          title: args.title,
          description: args.description || null,
          completed: false,
          userId: args.userId,
        };

        // Adicionando a nova tarefa ao array de tarefas
        tasks.push(newTask);

        // Retornando a nova tarefa
        return newTask;
      },
    },

     // Mutação para atualizar informações de uma tarefa existente
     updateTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
        userId: { type: GraphQLString }, // Se desejar permitir a alteração do userId
      },
      resolve: (parent, args, context) => {
        // Encontre a tarefa pelo ID
        const taskIndex = tasks.findIndex(task => task.id === args.id);

        // Se a tarefa não for encontrada, lance um erro
        if (taskIndex === -1) {
          throw new Error('Tarefa não encontrada');
        }

        // Atualize os campos da tarefa com os dados fornecidos, se eles forem fornecidos
        if (args.title !== undefined) {
          tasks[taskIndex].title = args.title;
        }
        if (args.description !== undefined) {
          tasks[taskIndex].description = args.description;
        }
        if (args.completed !== undefined) {
          tasks[taskIndex].completed = args.completed;
        }
        if (args.userId !== undefined) {
          tasks[taskIndex].userId = args.userId;
        }

        // Retorne a tarefa atualizada
        return tasks[taskIndex];
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: rootQueryType,
});

// Inicializa o servidor GraphQL
const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));