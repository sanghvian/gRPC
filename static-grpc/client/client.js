const grpc = require('grpc');
const service = require('../server/protos/greet_grpc_pb');
const sumService = require('../server/protos/sum_grpc_pb')
const sums = require('../server/protos/sum_pb')
const greets = require('../server/protos/greet_pb')

//* Greeting client
console.log('hello from client')
const client = new service.GreetServiceClient(
    `localhost:50051`,
    grpc.credentials.createInsecure()
)

//* Sum Client
const sumClient = new sumService.SumServiceClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
)


//* Request processing

//* Greet request processing
const request = new greets.GreetRequest()
const greeting = new greets.Greeting()
greeting.setFirstName("Ankit")
greeting.setLastName("Sanghvi")
request.setGreeting(greeting)

//* Sum request processing
const sumRequest = new sums.SumRequest()
const sumObject = new sums.SumMessage()
sumObject.setFirstNum(3)
sumObject.setSecondNum(14)
sumRequest.setSumMessage(sumObject)

//* Response handling

//* Greet response handling
client.greet(request, (error, response) =>
{
    if (!error)
    {
        console.log("Greeting response",response.getResult())
    } else
    {
        console.log(error)
    }
})

//* Sum response handling
sumClient.sum(sumRequest, (error, response) =>
{
    if (!error)
    {
        console.log(`Sum result : ${response.getResult()}`)
    } else
    {
        console.log(error)
    }
})
