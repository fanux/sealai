package main

import (
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	host := envOr("HOST", "0.0.0.0")
	port := envOr("PORT", "3000")
	publicDir := envOr("PUBLIC_DIR", "/app/public")

	fileServer := http.FileServer(http.Dir(publicDir))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		cleanPath := filepath.Clean("/" + r.URL.Path)
		targetPath := filepath.Join(publicDir, cleanPath)

		if info, err := os.Stat(targetPath); err == nil && !info.IsDir() {
			w.Header().Set("Cache-Control", "no-store")
			fileServer.ServeHTTP(w, r)
			return
		}

		indexFile, err := os.Open(filepath.Join(publicDir, "index.html"))
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
		defer indexFile.Close()

		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("Cache-Control", "no-store")
		w.WriteHeader(http.StatusOK)
		_, _ = io.Copy(w, indexFile)
	})

	addr := host + ":" + port
	log.Printf("Prototype server listening on http://%s", addr)
	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatal(err)
	}
}

func envOr(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
