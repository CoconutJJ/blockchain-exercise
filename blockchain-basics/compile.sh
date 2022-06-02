#!/bin/sh

yarn hardhat compile
rm -rf src/abis/*
mv artifacts/contracts/**/*.json src/abis

yarn hardhat run --network ropsten scripts/deploy.js
yarn harhdat run --network ropsten scripts/deployLottery.js