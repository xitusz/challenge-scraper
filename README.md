# challenge-scraper

---

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Projeto](#projeto)
- [Clonando Repositório](#clonando-repositório)
- [Instalando Dependências](#instalando-dependências)
- [Executando Aplicação](#executando-aplicação)
- [Executando Testes](#executando-testes)

---

## Tecnologias Utilizadas

- JavaScript
- Node
- Express
- Axios
- Cheerio
- Jest
- Supertest

---

## Projeto

Desafio técnico de Node.js para buscar laptops de uma página utilizando web scraping.
O objetivo é retornar informações sobre laptops que correspondam a um termo de pesquisa específico.

---

## Clonando Repositório

- Clone o repositório

  ```sh
    git clone git@github.com:xitusz/challenge-scraper.git
  ```

---

## Instalando Dependências

- Entre na pasta do repositório que você clonou:

  ```sh
    cd challenge-scraper
  ```

- Instale as dependências

  ```sh
    npm install
  ```

---

## Executando Aplicação

- Entre na pasta do repositório que você clonou:

  ```sh
    cd challenge-scraper
  ```

- Inicie o projeto:

  ```sh
    npm start
  ```

- Acesse o endereço em seu navegador:
  O termo de busca padrão é laptops "Lenovo"

  ```sh
    http://localhost:3000/laptops
  ```

- Para buscar outros laptops:
  Por exemplo, para buscar laptops da "Asus"

  ```sh
    http://localhost:3000/laptops?term=Asus
  ```

---

## Executando Testes

- Entre na pasta do repositório que você clonou:

  ```sh
    cd challenge-scraper
  ```

- Execute os testes:

  ```sh
    npm test
  ```

---
