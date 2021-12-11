async function* iterateReader<R>(reader: ReadableStreamDefaultReader<R>): AsyncGenerator<R> {
  const { done, value } = await reader.read();
  if (done) return;

  yield value;
  yield* iterateReader(reader);
}

export default iterateReader;
