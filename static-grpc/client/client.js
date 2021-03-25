const grpc = require('grpc');

const greets = require('../server/protos/greet_pb')
const service = require('../server/protos/greet_grpc_pb');

const sums = require('../server/protos/sum_pb')
const sumService = require('../server/protos/sum_grpc_pb')

const URL_ENDPOINT = `localhost:50051` 

// //! Greeting client
// console.log('hello from client')
// const client = new service.GreetServiceClient(
//     URL_ENDPOINT,
//     grpc.credentials.createInsecure()
// )

// //* Greet request processing
// const request = new greets.GreetRequest()
// const greeting = new greets.Greeting()
// greeting.setFirstName("Ankit")
// greeting.setLastName("Sanghvi")
// request.setGreeting(greeting)

// //* Greet response handling
// client.greet(request, (error, response) =>
// {
//     if (!error)
//     {
//         console.log("Greeting response is :",response.getResult())
//     } else
//     {
//         console.log(error)
//     }
// })


// //! Sum client
// const sumClient = new sumService.SumServiceClient(
//     URL_ENDPOINT,
//     grpc.credentials.createInsecure()
// )

// //* Sum request processing
// const sumRequest = new sums.SumRequest()
// const sumObject = new sums.SumMessage()
// sumObject.setFirstNum(5)
// sumObject.setSecondNum(19)
// sumRequest.setSumMessage(sumObject)

// //* Sum response handling
// sumClient.sum(sumRequest, (error, response) =>
// {
//     console.log(sumRequest)
//     console.log(response)
//     if (!error)
//     {
//         console.log(`Sum result : ${response.getResult()}`)
//     } else
//     {
//         console.log('fml')
//     }
// })

//! Greet many times client creation 
const greetManyTimesClient = new service.GreetServiceClient(
    URL_ENDPOINT,
    grpc.credentials.createInsecure()
)

//* Greet many times request processing
const greetManyTimesReq = new greets.GreetManyTimesRequest()
const greetingManyTimes = new greets.Greeting()
greetingManyTimes.setFirstName('Ankit')
greetingManyTimes.setLastName('Sanghvi')
greetManyTimesReq.setGreeting(greetingManyTimes)

const call = greetManyTimesClient.greetManyTimes(greetManyTimesReq, () => {})

call.on('data', (response) =>
{
    console.log(`Greeting response : ${response}`)
})

call.on('status', (status) =>
{
    console.log(status)
})


call.on('error', (error) =>
{
    console.log(error.message)
})

call.on('end', () =>
{
    console.log('Streaming ended......')
})
