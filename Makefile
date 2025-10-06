SHELL := /usr/bin/bash

.PHONY: dev build start lint test test-ci docker-pg

dev:
	npm run start:dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint

test:
	npm test

test-ci:
	npm test -- --ci --runInBand

docker-pg:
	docker run --name cloudsec-pg -e POSTGRES_PASSWORD=pass -e POSTGRES_USER=user -e POSTGRES_DB=cloudsec -p 5432:5432 -d postgres:15 || true

