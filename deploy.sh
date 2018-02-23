#!/usr/bin/env bash

echo "//registry.npmjs.org/:_authToken=${NPM_AUTH}" >> ~/.npmrc

if [[ "$TRAVIS_BRANCH" = "master" ]] && [[ "$TRAVIS_PULL_REQUEST" = "false" ]]; then
    if [[ "$TRAVIS_TAG" = "$TRAVIS_BRANCH" ]]; then
        echo "SKIPPING BUILDING TAG ON MASTER";
    else
        echo "DEPLOYING A NEXT RELEASE";
        npm run release -- --next --yes
    fi
fi

if [[ "${TRAVIS_TAG}" != "" ]]; then
    echo "DEPLOYING A LATEST RELEASE $TRAVIS_TAG";
    npm run release -- --latest --yes
fi

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
    echo "DEPLOYING A CANARY, NUMBER $TRAVIS_PULL_REQUEST";
    npm run release -- --pull-request=$TRAVIS_PULL_REQUEST --yes
fi
