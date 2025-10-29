# ⚡ Log Stream Frontend

Este é o **frontend React** do projeto [Go Log Streamer](https://github.com/santosjennifer/go-react-streaming/tree/main/streaming-backend).  
Ele exibe logs em tempo real consumindo dois endpoints diferentes do backend:

- `GET /stream/logs` → usa **HTTP Streaming**
- `GET /sse/logs` → usa **Server-Sent Events (SSE)**

## 🎥 Demonstração

A interface exibe dois blocos de logs lado a lado, atualizando em tempo real conforme os dados chegam do servidor.

---

## 🧩 Estrutura

```bash
src/
 ├─ LogStream.jsx       # Componente principal
 ├─ LogStream.css       # Estilos da interface
 └─ index.js            # Ponto de entrada React
```

## 🚀 Como executar

#### Pré-requisitos

- Node.js 18+
- Backend Go rodando localmente em http://localhost:8080


#### 1. Clonar o repositório
```bash
git clone https://github.com/santosjennifer/go-react-streaming.git
cd streaming-frontend
```

#### 2. Instalar dependências
```bash
npm install
```

#### 3. Rodar em modo desenvolvimento
```bash
npm start
```

O app estará disponível em:
👉 http://localhost:3000
