# 🪵 Go Log Streamer

Este projeto é um pequeno servidor HTTP em Go que demonstra duas técnicas diferentes para enviar logs em tempo real para o cliente:

- **/stream/logs** → Streaming HTTP tradicional (usando `text/plain`)
- **/sse/logs** → Server-Sent Events (SSE), usando `text/event-stream`

## 🚀 Funcionalidades

- Envio contínuo de logs simulados a cada segundo.
- Suporte a **CORS** (para permitir acesso a partir de qualquer origem).
- Dois modos de streaming:
  - **HTTP Streaming**: dados são enviados diretamente como texto bruto.
  - **SSE (Server-Sent Events)**: formato padronizado para eventos contínuos em navegadores.

## 🧩 Endpoints

### 1. `/stream/logs`

Retorna linhas de log contínuas em formato texto simples:

```bash
curl http://localhost:8080/stream/logs
```

Exemplo de saída:

```bash
Log line 1: something happened at 2025-10-29T22:00:00Z
Log line 2: something happened at 2025-10-29T22:00:01Z
...
=== END STREAMING LOGS ===
```

### 2. `/sse/logs`

Retorna logs no formato de Server-Sent Events, ideal para uso com JavaScript no navegador:

```bash
curl http://localhost:8080/sse/logs
```

Exemplo de saída:

```bash
data: Log 1 - 2025-10-29T22:00:00Z
data: Log 2 - 2025-10-29T22:00:01Z
...
=== END SSE LOGS ===
```

## 🛠️ Como executar

#### Pré-requisitos

* Go 1.20+

#### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/go-log-streamer.git
cd go-log-streamer
```

#### 2. Executar o servidor
```bash
go run main.go
```

O servidor será iniciado em http://localhost:8080.

## 📚 Tecnologias utilizadas

* Go (net/http)

* github.com/rs/cors — para permitir requisições de qualquer origem (CORS)

* SSE e HTTP Streaming — padrões para comunicação em tempo real