# About

Projeto com fins de estudos de autenticação JWT utilizando Node.js.

Contém somente a configuração de autenticação do back-end.

Pode servir de base para qualquer aplicação.

#### Secrets

Para definir sua chave Secret, utilizada para criação dos tokens e verificação dos mesmos, vá no diretório:

> src/config/auth.json

Defina seu secret em forma de MD5 Hash (forma segura).

    {
		secret: "YOUR_APP_SECRET"
	}

## Get Started

$`npm start`

Definido em package.json.

## Pacotes instalados

- $`express`
Considerado um "micro pacote", tem funcionalidades para auxiliar as rotas da API.

- $`body-parser`

- $`mongoose`
Responsável por conectar com o MongoDB.

- $`nodemon`
Atualizar durante a execução.

- $`bcryptjs`
Biblioteca para criptografar senhas.

- $`jsonwebtoken`



#### Referências de aprendizado:
- https://www.youtube.com/watch?v=BN_8bCfVp88
