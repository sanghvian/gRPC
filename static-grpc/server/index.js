const grpc = require("grpc")
const service = require('./protos/greet_grpc_pb')
const sumService = require('./protos/sum_grpc_pb')
const sums = require('./protos/sum_pb')
const greets = require('./protos/greet_pb')
// const dotenv = require('dotenv')

//* Response processing

//* Greet response processing
const greet = (call, callback) =>
{
    const greeting = new greets.GreetResponse()

    greeting.setResult(
        "Hello " + call.request.getGreeting().getFirstName() + " " + call.request.getGreeting().getLastName()
    )
    callback(null, greeting)
}

//* Sum response processing
const sum = (call, callback) =>
{
    const summing = new sums.SumResponse()
    summing.setResult(call.request.getSumMessage().getFirstNum() + call.request.getSumMessage().getSecondNum())

    callback(null,summing)
}

//* Setup a server
const server = new grpc.Server()


//* Adding services to server

//* Add greet request to server
server.addService(service.GreetServiceService, { greet })

//* Add greet request to server
server.addService(sumService.SumServiceService, { sum })

const url = "127.0.0.1:50051"
server.bind(url, grpc.ServerCredentials.createInsecure())
server.start()

console.log(`Server running on ${url}`)
