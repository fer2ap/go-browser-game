package main

import (
	"log"
	"net/http"
)

func main() {
	staticHandler := http.FileServer(http.Dir("./"))
	http.Handle("/", staticHandler)
	app := http.StripPrefix("/three/", http.FileServer(http.Dir("./three")))
	http.Handle("/three/", app)

	log.Print("Listening on :3000...")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
