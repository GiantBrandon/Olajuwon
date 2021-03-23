.DEFAULT_GOAL := help

install: ## yarn and go install — Concurrently installs go and yarn dependencies
	@go get ./... & yarn --cwd ./maravich install

tidy: ## go mod tidy — Prune any no-longer-needed dependencies from go.mod and add any dependencies needed for other combinations of OS, architecture, and build tags
	@go mod tidy

upgrade: ## go get -u ./... — Update all direct and indirect dependencies to latest minor or patch upgrades (pre-releases are ignored)
	@go get -u ./... & yarn --cwd ./maravich upgrade

clean: ## clean - removes existing binaries, vendored code and code coverage results
	@rm -rf ./bin Duncan/vendor coverage.out Maravich/node_modules ./tmp

local: ## go run - runs the main hack server found at cmd/hack/main.go
	@go run Duncan/cmd/main.go

test: ## go test ./... -race -cover - runs the full test suite with code coverage and data race detection
	@go test ./... -race -cover

coverage: ## go test ./... - runs the full test suite with code coverage and data race detection and outputs a coverprofile to ./coverage.out
	@go test ./... -race -coverprofile=coverage.out -covermode=atomic

report: ## go tool cover - reads the current coverprofile found at ./coverage.out as an html report
	@go tool cover -html=coverage.out

vet: ## go vet ./... - report likely mistakes in packages
	@go vet ./...

lint: ## golangci-lint run ./... - run an aggregated linter on all go files, requires https://github.com/golangci/golangci-lint
	@golangci-lint run ./... & yarn --cwd ./maravich lint

refresh: ## refresh - runs the main hack server found at cmd/hack/main.go and auto refreshes on code changes, requires https://github.com/markbates/refresh
	@refresh run Duncan/cmd/main.go

gosec: ## gosec ./... - inspects source code for security problems by scanning the Go AST, requires https://github.com/securego/gosec
	@gosec ./...

.PHONY: help
help: Makefile
	@grep --no-filename -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
