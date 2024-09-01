<h1 style="text-align:center;">UNICHAMADA-BACK-END</h1>

## Sumário
1. **[Sumário](#sumário)**
2. **[Setup](#setup)**
3. **[Contribuição](#contribuição)**
    - **[Estrutura do Git Flow](#estrutura-do-git-flow)**
      - **[Fluxo de Trabalho](#fluxo-de-trabalho)**
        - **[Fluxo Básico de Trabalho com Git Flow](#4-fluxo-básico-de-trabalho-com-git-flow)**
      - **[Guia de Commits](#guia-de-commits)**

## Setup
### Instalação de depedências

```bash
$ npm i
```

### Rodar migrations
```bash
# development
$ npx prisma migrate dev
```

### Setup Banco de Dados
#### Requisitos
- Docker

#### Rodar banco
```bash
# pull postgres image, build container, run database & frees the CLI
$ docker-compose up -d
```

#### Desligar banco
```bash
# drop container
$ docker-compose down
```

### Rodar a api

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
---

## Contribuição
Estratégia: Git Flow

O Git Flow é um modelo de ramificação para o Git que facilita o gerenciamento de versões em projetos de desenvolvimento de software. Ele foi popularizado por Vincent Driessen em 2010 e se tornou uma abordagem amplamente adotada para organizar e gerenciar o trabalho em equipes de desenvolvimento.

### Estrutura do Git Flow

#### Branches Principais

- **`main` (ou `master`)**: A branch principal que contém o código de produção. Sempre deve estar em um estado estável.
- **`develop`**: A branch principal de desenvolvimento, onde o código é integrado e preparado para ser lançado.

#### Branches de Suporte

- **`feature/*`**: Usadas para desenvolver novas funcionalidades. Cada nova funcionalidade é desenvolvida em uma branch separada, derivada de `develop`.
- **`release/*`**: Usadas para preparar uma nova versão de produção. Uma vez que todas as funcionalidades para uma nova versão estão completas, uma branch de release é criada a partir de `develop`.
- **`hotfix/*`**: Usadas para corrigir rapidamente bugs em produção. Essas branches são criadas a partir de `main` e, uma vez corrigido o problema, o código é integrado tanto em `main` quanto em `develop`.
- **`support/*`**: Embora menos comum, essas branches podem ser usadas para manutenção de versões antigas.

### Fluxo de Trabalho

1. **Desenvolvimento de Funcionalidades**:
   - Crie uma nova branch `feature` a partir de `develop`.
   - Desenvolva a funcionalidade na branch `feature`.
   - Quando a funcionalidade estiver pronta, faça o merge da branch `feature` de volta para `develop`.

2. **Preparação para Lançamento**:
   - Quando estiver pronto para lançar uma nova versão, crie uma branch `release` a partir de `develop`.
   - Realize os ajustes finais na branch `release`.
   - Quando tudo estiver pronto, faça o merge da branch `release` em `main` e em `develop`.

3. **Correção de Bugs em Produção**:
   - Se um bug for encontrado em produção, crie uma branch `hotfix` a partir de `main`.
   - Corrija o bug na branch `hotfix`.
   - Faça o merge da branch `hotfix` em `main` e `develop`.


#### 4. Fluxo Básico de Trabalho com Git Flow
Aqui estão os comandos básicos para usar o Git Flow:
- **Criar uma nova feature**:
  ```bash
  git flow feature start nome-da-feature
  ```
  Isso cria uma nova branch a partir de `develop`.
- **Finalizar uma feature**:
  ```bash
  git flow feature finish nome-da-feature
  ```
  Isso faz o merge da feature na branch `develop` e a deleta.
- **Criar uma release**:
  ```bash
  git flow release start numero-da-versao
  ```
  Isso cria uma branch de release a partir de `develop`.
- **Finalizar uma release**:
  ```bash
  git flow release finish numero-da-versao
  ```
  Isso faz o merge da release em `main` e `develop`, e cria uma tag para a versão.
- **Criar um hotfix**:
  ```bash
  git flow hotfix start nome-do-hotfix
  ```
  Isso cria uma branch de hotfix a partir de `main`.
- **Finalizar um hotfix**:
  ```bash
  git flow hotfix finish nome-do-hotfix
  ```
  Isso faz o merge do hotfix em `main` e `develop`.

  Claro! Aqui está uma versão mais simplificada da documentação para o seu repositório:

---

### Guia de Commits

#### Estrutura dos Commits

Os commits devem seguir este formato:

```
<tipo>[escopo opcional]: <descrição>

[coração opcional]

[rodapé(s) opcional(is)]
```

##### Tipos Comuns

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Atualização de documentação
- **style**: Alterações no estilo (espaçamento, formatação, etc.)
- **refactor**: Alteração no código sem modificar funcionalidades
- **perf**: Melhoria de desempenho
- **test**: Testes
- **build**: Mudanças no sistema de build
- **ci**: Configurações de integração contínua
- **chore**: Outras mudanças

##### Exemplos

1. **Adicionar nova funcionalidade**

   ```
   feat(auth): adicionar login com Google
   ```

2. **Corrigir um bug**

   ```
   fix(api): corrigir erro ao buscar dados
   ```

3. **Atualizar documentação**

   ```
   docs: atualizar guia de instalação
   ```

4. **Melhorar desempenho**

   ```
   perf: otimizar tempo de resposta
   ```

#### Dicas

- Use uma frase curta e clara.
- Comece com letra minúscula.
- Não use ponto final na descrição.

---


<!-- 

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p> -->
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

<!-- ## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. -->

<!-- ## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework) -->

<!-- ## License

Nest is [MIT licensed](LICENSE). -->
