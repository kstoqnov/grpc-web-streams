package systems.moellers.hello;

import io.grpc.stub.StreamObserver;
import systems.moellers.grpc.GreeterGrpc;
import systems.moellers.grpc.HelloService.HelloRequest;
import systems.moellers.grpc.HelloService.HelloResponse;

public class GreeterImpl extends GreeterGrpc.GreeterImplBase {
    @Override
    public void sayHello(HelloRequest req, StreamObserver<HelloResponse> responseObserver) {
        System.out.println("Received message from " + req.getName());
        HelloResponse reply = HelloResponse.newBuilder().setMessage("Hello " + req.getName()).build();
        responseObserver.onNext(reply);
        reply = HelloResponse.newBuilder().setMessage("Hello Adis").build();
        responseObserver.onNext(reply);
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        HelloResponse reply2 = HelloResponse.newBuilder().setMessage("Hello Konnys").build();
        responseObserver.onNext(reply2);
        responseObserver.onCompleted();
    }
}
