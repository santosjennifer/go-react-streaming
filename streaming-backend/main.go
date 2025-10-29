package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/rs/cors"
)

func streamLogs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming not supported", http.StatusInternalServerError)
		return
	}

	for i := 1; i <= 20; i++ {
		fmt.Fprintf(w, "Log line %d: something happened at %s\n", i, time.Now().Format(time.RFC3339))
		flusher.Flush()
		time.Sleep(1 * time.Second)
	}

	fmt.Fprintln(w, "=== END STREAMING LOGS ===")
}

func sseLogs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "SSE not supported", http.StatusInternalServerError)
		return
	}

	for i := 1; i <= 20; i++ {
		fmt.Fprintf(w, "data: Log %d - %s\n", i, time.Now().Format(time.RFC3339))
		flusher.Flush()
		time.Sleep(1 * time.Second)
	}

	fmt.Fprintln(w, "=== END SSE LOGS ===")
	flusher.Flush()
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/stream/logs", streamLogs)
	mux.HandleFunc("/sse/logs", sseLogs)

	handler := cors.Default().Handler(mux)
	log.Println("Server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
