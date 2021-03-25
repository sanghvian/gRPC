const grpc = require("grpc")

const greets = require('./protos/greet_pb')
const service = require('./protos/greet_grpc_pb')

const sums = require('./protos/sum_pb')
const sumService = require('./protos/sum_grpc_pb')
// const dotenv = require('dotenv')

//* RESPONSE PROCESSING

//* Greet response processing
// const greet = (call, callback) =>
// {
//     const greeting = new greets.GreetResponse()

//     greeting.setResult(
//         "Hello " + call.request.getGreeting().getFirstName() + " " + call.request.getGreeting().getLastName()
//     )
//     callback(null, greeting)
// }

//* Sum response processing
// const sum = (call, callback) =>
// {
//     const summing = new sums.SumResponse()
//     const firstNum = call.request.getSumMessage().getFirstNum();
//     const secondNum = call.request.getSumMessage().getSecondNum();
//     summing.setResult(firstNum + secondNum)

//     callback(null,summing)
// }

//* Greet many times response processing
const greetManyTimes = (call, callback) =>
{
    const greetManyTimesRequest = call.request
    const firstName = greetManyTimesRequest.getGreeting()
    console.log(firstName)
    let count = 0, intervalID = setInterval(() =>
    {
        const greetManyTimesResponse = new greets.GreetManyTimesResponse()
        greetManyTimesResponse.setResult(`Honorable ${firstName}`)

        // Setup streaming
        call.write(greetManyTimesResponse)
        if (++count > 9)
        {
            clearInterval(intervalID)
            call.end()
        }
    },1000)
}

//* Setup a server
const server = new grpc.Server()


//* ADDING SERVICES TO SERVER

//* Add greet request to server
// server.addService(service.GreetServiceService, { greet, greetManyTimes })
server.addService(service.GreetServiceService, { greetManyTimes })

//* Add sum request to server
// server.addService(sumService.SumServiceService, { sum })

//? START THE SERVER
const URL_ENDPOINT = "127.0.0.1:50051"
server.bind(URL_ENDPOINT, grpc.ServerCredentials.createInsecure())
server.start()

console.log(`Server running on ${URL_ENDPOINT}`)
