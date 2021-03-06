#!/bin/bash

set -ex

export INFRASTRUCTURE_DIRECTORY="./packages/infra"

function install() {
  yarn install
}

function run_tests() {
  yarn build
  yarn test
}

function deploy() {
  yarn deploy
}

function main() {
  install
  run_tests
  deploy
}

main
