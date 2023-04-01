# Projeto Full-stack - Back-end.

Parte back-end do projeto com CRUD de usuarios e contatos.

## Tecnologias utilizadas.

- [NodeJS](https://nodejs.org/en)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://www.npmjs.com/package/zod)

URL base da aplicação: http://localhost:3000/

## Instalação

Faça um clone do projeto na sua máquina

### Instalando as dependencias do projeto

instale as dependências com o comando:

```shell
yarn
```

### Variáveis de Ambiente

Em seguida, crie um arquivo .env, copiando o formato do arquivo .env.example:

```shell
cp .env.example .env
```

### Migrations

Execute as migrations com o comando:

```shell
yarn typeorm migration:run -d src/data-source.ts
```

### Rodando o projeto em ambiente de desenvolvimento

```shell
yarn dev
```

## Documentação da API

### endpoints

### User:

#### GET de todos os usuarios

```http
  GET /users
  Authorization: Bearer token
```

##### Exemplo de Response:

```
200
```

```
[
    {
		"name": "test",
		"email": "test@gmail.com",
		"phone": "0159299999997",
		"id": "dcf5624c-8206-4739-a619-f848e310cc0d",
		"createdAt": "2023-03-25T16:18:22.436Z",
		"updatedAt": "2023-03-25T16:18:22.436Z",
		"deletedAt": null,
		"contacts": []
	},
	{
		"name": "Felipe Nogueira 2",
		"email": "felipetest@gmail.com",
		"phone": "0159299999998",
		"id": "cf8b7869-336e-45a8-a48a-7038e5e91771",
		"createdAt": "2023-03-25T16:15:43.929Z",
		"updatedAt": "2023-03-25T19:44:53.600Z",
		"deletedAt": null,
		"contacts": []
	}
]
```

#### GET de um usuario

```http
  GET /users/${userId}
  Authorization: Bearer token
```

| Parâmetro | Tipo     | Descrição                                      |
| :-------- | :------- | :--------------------------------------------- |
| `userId`  | `string` | **Obrigatório**. O ID do usuario que você quer |

##### Exemplo de Response:

```
200
```

```
{
	"name": "test",
	"email": "test@gmail.com",
	"phone": "0159299999997",
	"id": "dcf5624c-8206-4739-a619-f848e310cc0d",
	"createdAt": "2023-03-25T16:18:22.436Z",
	"updatedAt": "2023-03-25T16:18:22.436Z",
	"deletedAt": null,
	"contacts": []
}
```

#### POST de um novo usuario

```http
  POST /users
  Authorization: none
```

##### Corpo da Requisição:

```JSON
{
	"name": "new User",
	"email": "new@gmail.com",
	"password": "123456",
	"phone": "0159299999996"
}
```

##### Exemplo de Response:

```
201
```

```
{
	"name": "new User",
	"email": "new@gmail.com",
	"phone": "0159299999996",
	"id": "dcf5624c-8206-4739-a619-f848e310cc0d",
	"createdAt": "2023-03-25T16:18:22.436Z",
	"updatedAt": "2023-03-25T16:18:22.436Z",
	"deletedAt": null,
	"contacts": []
}
```

#### PATCH do usuario

```http
  PATCH /users/${userId}
  Authorization: Bearer token
```

| Parâmetro | Tipo     | Descrição                                             |
| :-------- | :------- | :---------------------------------------------------- |
| `userId`  | `string` | **Obrigatório**. O ID do usuario que você quer editar |

##### Corpo da Requisição:

```JSON
{
	"name": "new name",

}
```

##### Exemplo de Response:

```
200
```

```
{
	"name": "new User",
	"email": "new@gmail.com",
	"phone": "0159299999996",
	"id": "dcf5624c-8206-4739-a619-f848e310cc0d",
	"createdAt": "2023-03-25T16:18:22.436Z",
	"updatedAt": "2023-03-25T16:18:22.436Z",
	"deletedAt": null,
	"contacts": []
}
```

#### DELETE de um usuario

```http
  DELETE /users/${userId}
  Authorization: Bearer token
```

| Parâmetro | Tipo     | Descrição                                      |
| :-------- | :------- | :--------------------------------------------- |
| `userId`  | `string` | **Obrigatório**. O ID do usuario que você quer |

##### Exemplo de Response:

```
204
```

```
{
    Corpo vazio
}
```

### Login:

#### POST Realizar o login

```http
  POST /login
  Authorization: none
```

##### Corpo da Requisição:

```JSON
{
	"email": "new@gmail.com",
	"password": "123456"
}
```

##### Exemplo de Response:

```
200
```

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzk5MjgzMzMsImV4cCI6MTY4MDAxNDczMywic3ViIjoiNWM1YmE4NTItYzEzNS00MjQyLWIyMDgtMjczNDAwNzg1MDMyIn0.LjsySasnS6eP0uL56KuwABF-lyPZDEQyAZgpFAb1p4I"
}
```

### Contact:

#### GET de todos os contatos do usuario logado

```http
  GET /contacts
  Authorization: Bearer token
```

##### Exemplo de Response:

```
200
```

```
{
	"name": "new User",
	"email": "new@gmail.com",
	"phone": "0159299999999",
	"id": "5c5ba852-c135-4242-b208-273400785032",
	"createdAt": "2023-03-25T16:13:41.047Z",
	"updatedAt": "2023-03-25T16:13:41.047Z",
	"deletedAt": null,
	"contacts": [
		{
			"name": "testContact3",
			"email": "testContact3@gmail.com",
			"phone": "0159299999789",
			"id": "25f524e0-46c6-489a-9475-a8ba6ca34487",
			"createdAt": "2023-03-25T21:36:57.054Z",
			"updatedAt": "2023-03-25T21:36:57.054Z",
			"deletedAt": null
		},
		{
			"name": "testContact4",
			"email": "testContact4@gmail.com",
			"phone": "0159299999759",
			"id": "26940be1-b052-4c07-93a6-2e11e113b0de",
			"createdAt": "2023-03-25T23:40:40.893Z",
			"updatedAt": "2023-03-25T23:40:40.893Z",
			"deletedAt": null
		}
```

#### POST de um novo contato para o usuario logado

```http
  POST /contacts
  Authorization: Bearer token
```

##### Corpo da Requisição:

```JSON
{
	"name": "testContact5",
	"email": "testContact8@gmail.com",
	"phone": "0159299559649"
}
```

##### Exemplo de Response:

```
201
```

```
{
	"name": "testContact5",
	"email": "testContact8@gmail.com",
	"phone": "0159299559649",
	"id": "f4e39315-36d1-48dd-b168-e77265655e62",
	"createdAt": "2023-03-25T23:52:33.449Z",
	"updatedAt": "2023-03-25T23:52:33.449Z",
	"deletedAt": null
}
```

#### PATCH de um contato do usuario logado

```http
  PATCH /contacts/${contactId}
  Authorization: Bearer token
```

| Parâmetro   | Tipo     | Descrição                                                                  |
| :---------- | :------- | :------------------------------------------------------------------------- |
| `conatctId` | `string` | **Obrigatório**. O ID de um contato do usuario logado que você quer editar |

##### Corpo da Requisição:

```JSON
{
	"name": "new name",

}
```

##### Exemplo de Response:

```
200
```

```
{
	{
	"name": "new name",
	"email": "testContact2@gmail.com",
	"phone": "0159299999989",
	"id": "20dddc92-63a8-4120-b148-49ec4701d009",
	"createdAt": "2023-03-25T21:32:47.235Z",
	"updatedAt": "2023-03-27T17:51:43.882Z",
	"deletedAt": null
}
}
```

#### DELETE de um contato do usuario logado

```http
  DELETE /contacts/${contactId}
  Authorization: Bearer token
```

| Parâmetro   | Tipo     | Descrição                                                                   |
| :---------- | :------- | :-------------------------------------------------------------------------- |
| `contactId` | `string` | **Obrigatório**. O ID de um contato do usuario logado que você quer deletar |

##### Exemplo de Response:

```
204
```

```
{
    Corpo vazio
}
```
