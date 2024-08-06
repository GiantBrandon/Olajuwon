.DEFAULT_GOAL := help

build:
	make build-ui
	make build-server

build-server:
	docker build --platform linux/amd64 -t git.kyojin.dev/brandon.kurtz/server ./Duncan

build-ui:
	docker build --platform linux/amd64 -t git.kyojin.dev/brandon.kurtz/client ./maravich

run:
	make -j2 run-server run-ui

run-server:
	docker run -p 0.0.0.0:8080:8080 git.kyojin.dev/brandon.kurtz/server

run-ui:
	docker run -p 0.0.0.0:3001:3001 git.kyojin.dev/brandon.kurtz/client

install: ## yarn and go install — Concurrently installs go and yarn dependencies
	cd Duncan; go install ./...
	cd maravich; yarn install

local:
	make -j2 server ui

upgrade: ## go install -u ./... — Update all direct and indirect dependencies to latest minor or patch upgrades (pre-releases are ignored)
	cd Duncan; go install -u ./...
	cd Mutombo; go install -u ./...

clean: ## clean - removes existing binaries, vendored code and code coverage results
	rm -rf ./bin Duncan/vendor coverage.out maravich/node_modules ./tmp

wasm:
	cd mutombo;\
	em++ src/game.cpp src/tower.cpp src/enemy.cpp \
	-s WASM=1 \
	-s EXPORTED_FUNCTIONS=_start \
	-s EXPORTED_RUNTIME_METHODS=ccall \
	-s USE_SDL=2 \
	-s USE_SDL_TTF=2 \
	-s MIN_SAFARI_VERSION=-1 \
	-o ../maravich/public/wasm/game.js;\
	emrun --port 8080 ../maravich/public/wasm/;

server: ## go run - runs the main server found at cmd/main.go
	cd Duncan; go run cmd/main.go local

ui:
	cd maravich; yarn dev

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
