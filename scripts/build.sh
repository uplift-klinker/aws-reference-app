#!/bin/bash

function install() {
  yarn install
}

function run_tests() {
  yarn test
}

function deploy() {
  yarn build
}

function main() {
  install
  run_tests
  deploy
}

main
