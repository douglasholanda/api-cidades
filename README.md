# API CIDADES

## Sobre

-   API que faz requisições a API oficial do IBGE e que retorna apenas as informações principais sobre as cidades brasileiras.
-   Informações retornadas de cada cidade: ID, NOME, ESTADO, SIGLA E REGIÃO.

## Instalação

-   Faça o download do repositório em sua máquina local, abra o terminal e digite 'npm install' para baixar todas as dependências necessárias do projeto.
-   Ainda no terminal, digite 'npm start' para iniciar o servidor localmente na porta 3000.

# Realizando Consultas

-   Podemos realizar consultas que retornarão todas as cidades do país ou filtrar por: sigla, cidade, região ou estado.
-   Também podemos fazer uma pesquisa combinando os filtros de região, sigla e nome.

## Rota que busca todas as cidades do país

-   GET /api/city

## Rota que busca todas as cidades filtradas por sigla do estado

-   GET /api/city?uf=nome-estado

## Rota que busca todas as cidades filtradas por seu nome

-   GET /api/city/?name=nome-cidade
-   Essa rota retornará todas as cidades que contém o nome passado como parâmetro, que pode ser completo ou apenas parte dele

## Rota que busca todas as cidades filtradas pelo nome da região

-   GET /api/city/?region=nome-regiao
-   Essa rota retornará todas as cidades que contém a região passada como parâmetro, que pode ser completa ou apenas parte do nome dela

## Rota que busca todas as cidades filtradas pelo nome do estado
-   GET /api/city/?state=nome-estado
-   Essa rota retornará todas as cidades que contém o estado passado como parâmetro, que pode ser completo ou apenas parte do nome dele

## Rota que busca cidade por região, sigla e nome da cidade

-   GET /api/city/?region=nome-regiao&uf=nome-sigla&name=nome-cidade
-   Essa rota retornará a cidade específica filtrada pelos parâmetros ou as cidades correspondentes caso os parâmetros de 'region e/ou 'name' não forem preenchidos completamente.
