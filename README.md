# Costs

Sistema web para gerenciamento de projetos e controle de orçamento.

O **Costs** permite criar e gerenciar projetos, definir um orçamento, cadastrar serviços vinculados a cada projeto e acompanhar os valores gastos e disponíveis. O sistema também possui funcionalidades para edição e exclusão de projetos e serviços.

## Funcionalidades

* Cadastro de projetos
* Definição de orçamento
* Seleção de categoria do projeto
* Visualização dos detalhes do projeto
* Cadastro de serviços
* Controle do custo total dos serviços
* Validação para impedir que os serviços ultrapassem o orçamento do projeto
* Edição de projetos
* Exclusão de projetos
* Exclusão de serviços
* Página de contato
* Página sobre a empresa
* Modais para criação, edição e exclusão
* Interface responsiva

## Tecnologias utilizadas

### Frontend

* React
* React Router DOM
* JavaScript
* CSS Modules
* HTML

### Backend

* JSON Server
* API REST

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/CostsProject.git
```

Entre na pasta do projeto:

```bash
cd CostsProject
```

Instale as dependências:

```bash
npm install
```

## Dependências principais

Caso ainda não estejam instaladas, instale o React Router DOM:

```bash
npm install react-router-dom
```

O pacote `react-dom`:

```bash
npm install react-dom
```

## Executando o projeto

O projeto possui dois ambientes: **frontend** e **backend**.

### Frontend

Para iniciar a aplicação React:

```bash
npm start
```

Depois acesse:

```text
http://localhost:3000
```

### Backend

Para iniciar o JSON Server:

```bash
npm run backend
```

O backend será disponibilizado em:

```text
http://localhost:5000
```

## Comandos principais

| Comando                        | Função                           |
| ------------------------------ | -------------------------------- |
| `npm install`                  | Instala todas as dependências    |
| `npm start`                    | Inicia o frontend React          |
| `npm run backend`              | Inicia o backend com JSON Server |
| `npm install react-dom`        | Instala o React DOM              |
| `npm install react-router-dom` | Instala o React Router DOM       |

## Estrutura do projeto

```text
src/
├── components/
│   ├── layout/
│   ├── modals/
│   ├── pages/
│   └── img/
│
├── App.js
└── index.js

db.json
package.json
README.md
```

## Principais páginas

### Home

Página inicial do sistema, onde o usuário pode iniciar o gerenciamento dos seus projetos.

### Projetos

Exibe todos os projetos cadastrados em cards organizados em uma grade.

Cada projeto permite:

* Visualizar detalhes
* Editar
* Excluir

### Detalhes do projeto

Exibe as informações completas do projeto, incluindo:

* Nome
* Categoria
* Orçamento
* Total gasto
* Orçamento disponível
* Serviços cadastrados

Também permite adicionar e excluir serviços.

### Contato

Página destinada ao envio de mensagens para a empresa.

### Empresa

Página com informações sobre a empresa e seus objetivos.

## Controle de orçamento

O sistema calcula automaticamente o valor total dos serviços de cada projeto.

Por exemplo:

```text
Orçamento do projeto: R$ 10.000,00

Serviço 1: R$ 2.000,00
Serviço 2: R$ 1.500,00
Serviço 3: R$ 500,00

Total gasto: R$ 4.000,00
Disponível: R$ 6.000,00
```

O sistema também impede que um novo serviço seja cadastrado quando seu custo fizer o total ultrapassar o orçamento definido para o projeto.

## Backend

Os dados da aplicação são armazenados utilizando o **JSON Server**.

O arquivo:

```text
db.json
```

contém as principais entidades:

```json
{
  "projects": [],
  "categories": [],
  "services": []
}
```

Os serviços possuem uma referência ao projeto através do campo `projectId`.

Exemplo:

```json
{
  "id": "1",
  "projectId": "abc123",
  "name": "Desenvolvimento do site",
  "cost": 2000,
  "description": "Desenvolvimento do frontend"
}
```

## Executando frontend e backend

Abra dois terminais.

No primeiro:

```bash
npm start
```

No segundo:

```bash
npm run backend
```

Com isso:

```text
Frontend → http://localhost:3000

Backend  → http://localhost:5000
```

## Objetivo do projeto

O Costs foi desenvolvido com o objetivo de criar uma aplicação simples e intuitiva para gerenciamento financeiro de projetos, permitindo acompanhar de forma visual os custos, serviços e orçamento disponível.

O projeto também serve como aplicação prática dos conceitos de desenvolvimento web, React, componentes, gerenciamento de estado, rotas e consumo de APIs REST.
