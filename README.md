# Exemplo de Deploy de API Node no HEROKU

Repositório de exemplo de Deploy de API Node no Heroku

# O que é o Heroku?

Heroku é uma plataforma de nuvem como serviço (PaaS) que suporta várias linguagens de programação . Uma das primeiras plataformas em nuvem , o Heroku está em desenvolvimento desde junho de 2007, quando era compatível apenas com a linguagem de programação Ruby , mas agora é compatível com Java , Node.js , Scala , Clojure , Python , PHP e Go . Por esse motivo, o Heroku é considerado uma plataforma poliglota , pois possui recursos para um desenvolvedorpara construir, executar e dimensionar aplicativos de maneira semelhante na maioria dos idiomas.

# Pré-Requisitos

1. Certifique-se de ter uma versáo do NODE superior a 10

```
PS E:\workspace\exemplo-heroku> node --version
v14.7.0
```

2. Certifique-se de ter o NPM instalado (Normalmente vem junto com o NODE)

```
PS E:\workspace\exemplo-heroku> npm --version
6.14.7
```

3. Certifique-se de que você tem o Git instalado

```
PS E:\workspace\exemplo-heroku> git --version
git version 2.32.0.windows.2
```

# Criando o repositório da sua API

1. Crie uma pasta para armazenar sua API 

```
md e:\workspace\exemplo-heroku

Diretório: E:\workspace\exemplo-heroku


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        02/08/2021     20:16                exemplo-heroku

```

2. Associe a ela um Repositório do Git

```
PS E:\workspace\exemplo-heroku> git init
Initialized empty Git repository in E:/workspace/exemplo-heroku/.git/
```

3. Inicie o projeto com o NPM

```
PS E:\workspace\exemplo-heroku> npm init
```
4. Instale o Express no seu repositório

```
PS E:\workspace\exemplo-heroku> npm install express
```
5. Crie o index.js para iniciar a codificação

```
const express = require('express')

const path = require('path')
const PORT = process.env.PORT || 5000

const app = express()

/**Iniciando a API */

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/**Métodos da API */

app.get('/', (req, res) => { res.send('Hello World!')})

/**Start da API */

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
```

## Criando o Aplicativo no Heroku

Para fazer o deploy da aplicação direto para o Heroku, é necessário a instaácão do Heroku CLI. A Interface de linha de comando (CLI) do Heroku facilita a criação e o gerenciamento de seus aplicativos Heroku pois pode ser acionada diretamente do terminal.

A instalação e um tutorial passo a passo para a mesma encontra-se disponível para Windows, Linux e IOS no link abaixo:

Link:

* [Página Oficial da Plataforma Heroku](https://www.heroku.com/)
* [Página de Download do Heroku Command Line Interface (CLI)](https://devcenter.heroku.com/articles/heroku-cli)

Crie um aplicativo no Heroku, que prepara o Heroku para receber seu código-fonte.

Obs: No primceiro acesso será necessário realizar o LOGIN no Heroku CLI, este irá solicitar que você entre no browser e autorize a conexão.

```
Windows PowerShell
Copyright (C) Microsoft Corporation. Todos os direitos reservados.

Experimente a nova plataforma cruzada PowerShell https://aka.ms/pscore6

PS E:\workspace\exemplo-heroku> heroku create

Exemplo de Retorno
****************************

Creating <NOME_DA_APLICACAO>... done, stack is heroku-18
http://<NOME_DA_APLICACAO>.herokuapp.com/ | https://git.heroku.com/<NOME_DA_APLICACAO>.git
Git remote heroku added

```

Quando você cria um aplicativo, um Git Remoto (chamado heroku) também é criado e associado ao seu repositório git local.

## Alterar nome do Aplicativo Gerado Pelo Heroku

O Heroku gera um nome aleatório para o seu aplicativo, caso desejado você pode passar um parâmetro para especificar o nome do seu próprio aplicativo.

```
Windows PowerShell
Copyright (C) Microsoft Corporation. Todos os direitos reservados.

Experimente a nova plataforma cruzada PowerShell https://aka.ms/pscore6

PS E:\workspace\exemplo-heroku> heroku apps:rename <NOVO_NOME>

Exemplo de Retorno
****************************

 »   Warning: heroku update available from 7.53.0 to 7.56.1.
Renaming <NOVO_NOME> to <NOVO_NOME>... done
https://<NOVO_NOME>.herokuapp.com/ | https://git.heroku.com/<NOVO_NOME>.git
 !    Don't forget to update git remotes for all other local checkouts of the app.
Git remote heroku updated

```
## Como Fazer o Deploy da API no Heroku direto do Github

Via Heroku CLI é possível fazer o deploy da aplicação dereto do Github para o Heroku com o comando abaixo.

```
Windows PowerShell
Copyright (C) Microsoft Corporation. Todos os direitos reservados.

Experimente a nova plataforma cruzada PowerShell https://aka.ms/pscore6

PS E:\workspace\exemplo-heroku> git push heroku <BRANCH>
```

## Abrir a API no Browser

```
Windows PowerShell
Copyright (C) Microsoft Corporation. Todos os direitos reservados.

Experimente a nova plataforma cruzada PowerShell https://aka.ms/pscore6

PS E:\workspace\exemplo-heroku> heroku open
```

## Ver os Logs do Heroku

```
Windows PowerShell
Copyright (C) Microsoft Corporation. Todos os direitos reservados.

Experimente a nova plataforma cruzada PowerShell https://aka.ms/pscore6

PS E:\workspace\exemplo-heroku> heroku logs --tail
```

## Reiniciar a API

```
Windows PowerShell
Copyright (C) Microsoft Corporation. Todos os direitos reservados.

Experimente a nova plataforma cruzada PowerShell https://aka.ms/pscore6

PS E:\workspace\exemplo-heroku> heroku restart
```
