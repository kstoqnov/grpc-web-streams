#!/bin/bash

PROTOC_GEN_TS_PATH="./client/node_modules/.bin/protoc-gen-ts"

IN=$PWD/server/src/main/proto
OUT=$PWD/client/src/proto
FILE=$OUT/HelloService_pb.js

rm -rf $OUT
mkdir -p $OUT
protoc \
  -I $IN \
  --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
  --js_out=import_style=commonjs,binary:$OUT \
  --ts_out="${OUT}" \
  HelloService.proto

echo -e "/* eslint-disable */\n$(cat $FILE)" > $FILE