import decodeResponse from './decodeResponse';

function* iterateResponses(chunk: Uint8Array): Generator<Uint8Array> {
  let bytes = chunk;
  while (true) {
    const [decoded, rest] = decodeResponse(bytes);
    if (decoded === null) break;

    bytes = rest;

    yield decoded;
  }
}

export default iterateResponses;
