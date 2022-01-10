# set default shell
SHELL = bash -e -o pipefail

# Variables
.PHONY: build

help:
	@grep -E '^.*: *# *@HELP' $(MAKEFILE_LIST) \
    | sort \
    | awk ' \
        BEGIN {FS = ": *# *@HELP"}; \
        {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}; \
    '

build: # @HELP build the Web GUI and run all validations (on the host machine)
build:
	npm run build:prod

test: # @HELP run the unit tests and source code validation
test: deps build lint
	npm test

deps: # @HELP ensure that the required dependencies are in place
	NG_CLI_ANALYTICS=false npm install

lint: deps
	npm run lint

# For running make openapi-gen in Mac run the below command and change sed to gsed\
brew install gsed

openapi-gen: # @HELP compile the OpenAPI files in to Typescript
	node_modules/.bin/ng-openapi-gen --input ~/go/src/github.com/onosproject/chronos-exporter/api/config-openapi3.yaml --output src/openapi3/config
	for f in src/openapi3/*/*/*.ts src/openapi3/**/*.ts; do \
		sed -i '1i// GENERATED CODE -- DO NOT EDIT!' $$f; \
	done

clean: # @HELP remove all the build artifacts
	rm -rf ./dist ./node-modules
