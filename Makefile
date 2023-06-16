.DEFAULT_GOAL := help

build:
	make build-ui
	make build-server

build-server:
	docker build -t server ./Duncan

build-ui:
	docker build -t client ./maravich-next

run:
	make -j2 run-server run-ui

run-server:
	docker run --name SERVER_CONTAINER -p 0.0.0.0:8080:8080 server

run-ui:
	docker run --name CLIENT_CONTAINER -p 0.0.0.0:3000:3000 client

install: ## yarn and go install — Concurrently installs go and yarn dependencies
	cd Duncan; go install ./...
	cd maravich-next; yarn install

local:
	make -j2 server ui

upgrade: ## go install -u ./... — Update all direct and indirect dependencies to latest minor or patch upgrades (pre-releases are ignored)
	cd Duncan; go install -u ./...
	cd Mutombo; go install -u ./...

clean: ## clean - removes existing binaries, vendored code and code coverage results
	rm -rf ./bin Duncan/vendor coverage.out maravich-next/node_modules ./tmp

wasm:
	cd mutombo; wasm-pack build --target web

server: ## go run - runs the main server found at cmd/main.go
	cd Duncan; go run cmd/main.go local

ui:
	cd maravich-next; yarn dev

lint: ## golangci-lint run ./... - run an aggregated linter on all go files, requires https://github.com/golangci/golangci-lint
	cd Duncan; golangci-lint run ./...
	cd maravich-next; yarn lint --fix

refresh: ## refresh - runs the main hack server found at cmd/hack/main.go and auto refreshes on code changes, requires https://github.com/markbates/refresh
	@refresh run Duncan/cmd/main.go

gosec: ## gosec ./... - inspects source code for security problems by scanning the Go AST, requires https://github.com/securego/gosec
	@gosec ./...

.PHONY: help
help: Makefile
	@grep --no-filename -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
