# 🎬 Projeto API TMDb – Pesquisa e Listagem de Filmes
Link Netlify - https://ghmw.netlify.app/

## 📘 Descrição

Este projeto consiste numa aplicação construída com **Vue.js** que consome a API da TMDb para realizar **pesquisas de filmes**, listar resultados e exibir detalhes individuais.  
A aplicação inclui:

- Pesquisa por **título**
- Pesquisa por **ano**
- Exibição de **filmes recomendados/listagem inicial**
- Página de **detalhes** do filme

Além disso, o projeto utiliza **Docker** para garantir compatibilidade total entre ambientes de desenvolvimento, evitando problemas de configuração entre membros da equipa. O deploy é realizado via **Netlify**.

---

## 🛠️ Tecnologias Utilizadas

- **Vue.js + Vite** – Framework JavaScript para UI
- **Axios** – Requisições HTTP
- **Docker & Docker Compose** – Ambientes isolados e consistentes
- **Netlify** – Hospedagem e CI/CD automático
- **Node.js** – Ambiente JavaScript

---

## 🚀 Funcionalidades

- 🔍 Pesquisa filmes por **título**
- 📅 Pesquisa filmes por **ano**
- 🎥 Exibição de detalhes completos do filme
- 📄 Listagem inicial de filmes
- ⚡ Interface reativa e rápida

---

## 📦 Pré-requisitos

Para executar o projeto, você deve ter instalado:

- **Docker** (recomendado) → https://www.docker.com/get-started  
- **Node.js** (apenas se quiser rodar sem Docker) → https://nodejs.org/

---

# ▶️ Como Executar o Projeto

## 🔹 **1. Método Recomendado: Usando Docker**
- Executar o comando pelo CLI na pasta raíz do projecto -> docker-compose up --build
- Acessar pelo browser -> http://localhost:5173

# Conexão TMDb API – Serviços JS
Incluimos o arquivo `src/api.js` para facilitar integração com The Movie Database (TMDb).

### Exemplos de uso:
import { fetchPopularMovies, searchMovies, discoverMoviesByYear, getMovieDetails } from './api.js';

// Buscar filmes populares:
const movies = await fetchPopularMovies();

// Buscar por título e ano:
const results = await searchMovies('Batman', 2012);

// Buscar só por ano:
const byYear = await discoverMoviesByYear(2012);

// Buscar detalhes:
const details = await getMovieDetails(id);

## 👥 Autores
- Milton Timana @MKTimana
- Hamzah Braimo
- Gilson Vicente
- Wesley Tivane