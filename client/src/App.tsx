import React, { useEffect } from 'react';
import './App.css';
import { HelloRequest, HelloResponse } from './proto/HelloService_pb';
import GrpcWritableStream from './stream/GrpcWritableStream';

const App = () => {
  useEffect(() => {
    const req = new HelloRequest();
    req.setName('Kirsty');

    const svc = new GrpcWritableStream(document.location.origin);

    const handler = (res: HelloResponse) => {
      console.log('Received!', res.getMessage());
    }

    svc.sayHello(req, handler);
  });

  return (
    <div className="App">
      <header className="App-header">
        Hello World
      </header>
    </div>
  );
};

export default App;
