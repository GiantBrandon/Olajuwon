.DEFAULT_GOAL := help

build: ## yarn and go build
	make build-server
	make build-ui

deploy:
	make deploy-server
	make deploy-ui

build-server:
	cd Duncan; cd cmd; GOOS=linux GOARCH=amd64 go build -o server .

deploy-server:
	scp -i "keyPair.pem" Duncan/cmd/server ec2-user@ec2-3-143-226-28.us-east-2.compute.amazonaws.com:~/server; rm -rf Duncan/cmd/server

build-ui:
	cd maravich; yarn build

deploy-ui:
	scp -i "keyPair.pem" -r maravich/dist  ec2-user@ec2-3-143-226-28.us-east-2.compute.amazonaws.com:~/ui; rm -rf maravich/build

install: ## yarn and go install — Concurrently installs go and yarn dependencies
	cd Duncan; go get ./...
	cd maravich; yarn install

tidy: ## go mod tidy — Prune any no-longer-needed dependencies from go.mod and add any dependencies needed for other combinations of OS, architecture, and build tags
	cd Duncan; go mod tidy

upgrade: ## go get -u ./... — Update all direct and indirect dependencies to latest minor or patch upgrades (pre-releases are ignored)
	cd Duncan; go get -u ./...

clean: ## clean - removes existing binaries, vendored code and code coverage results
	rm -rf ./bin Duncan/vendor coverage.out maravich/node_modules ./tmp

server: ## go run - runs the main server found at cmd/main.go
	cd Duncan; go run cmd/main.go local

ui: ## yarn start
	cd maravich; yarn start

test: ## go test ./... -race -cover - runs the full test suite with code coverage and data race detection
	@go test ./... -race -cover

coverage: ## go test ./... - runs the full test suite with code coverage and data race detection and outputs a coverprofile to ./coverage.out
	@go test ./... -race -coverprofile=coverage.out -covermode=atomic

report: ## go tool cover - reads the current coverprofile found at ./coverage.out as an html report
	@go tool cover -html=coverage.out

vet: ## go vet ./... - report likely mistakes in packages
	@go vet ./...

lint: ## golangci-lint run ./... - run an aggregated linter on all go files, requires https://github.com/golangci/golangci-lint
	cd Duncan; golangci-lint run ./...
	cd maravich; yarn lint --fix

refresh: ## refresh - runs the main hack server found at cmd/hack/main.go and auto refreshes on code changes, requires https://github.com/markbates/refresh
	@refresh run Duncan/cmd/main.go

gosec: ## gosec ./... - inspects source code for security problems by scanning the Go AST, requires https://github.com/securego/gosec
	@gosec ./...

.PHONY: help
help: Makefile
	@grep --no-filename -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
