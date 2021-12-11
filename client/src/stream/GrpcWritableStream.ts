import { HelloRequest, HelloResponse } from '../proto/HelloService_pb';
import encodeRequest from './encodeRequest';
import iterateReader from './iterateReader';
import iterateResponses from './iterateResponses';

class GrpcWritableStream {
  constructor(private readonly endpoint: string) {
  }

  async sayHello(request: HelloRequest, handler: (res: HelloResponse) => any): Promise<void> {
    const method = 'POST';
    const headers = { 'content-type': 'application/grpc-web+proto' };
    const message = request.serializeBinary();
    const body = encodeRequest(message);

    const response = await fetch(`${this.endpoint}/systems.moellers.grpc.Greeter/SayHello`, {
      method,
      headers,
      body,
    });

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Reader is missing');

    for await (const chunk of iterateReader(reader)) {
      console.log('Next Stream Chunk', chunk);

      for (const decoded of iterateResponses(chunk)) {
        const response = HelloResponse.deserializeBinary(decoded);

        handler(response);
      }
    }

    console.log('Stream finished.');
  }
}

export default GrpcWritableStream;
