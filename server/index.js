const grpc = require("grpc")
const chalk = require('chalk')
const sums = require('./protos/sum_pb')
const sumService = require('./protos/sum_grpc_pb')

//* RESPONSE PROCESSING


//! Sum response processing
const sum = (call, callback) =>
{
    const summing = new sums.SumResponse()
    const firstNum = call.request.getSumMessage().getFirstNum();
    const secondNum = call.request.getSumMessage().getSecondNum();
    summing.setResult(firstNum + secondNum)

    callback(null,summing)
}

//* Setup a server
const server = new grpc.Server()


//* ADDING SERVICES TO SERVER

//* Add greet request to server
server.addService(sumService.SumServiceService, { sum })


//? START THE SERVER
const URL_ENDPOINT = "127.0.0.1:50051"
server.bind(URL_ENDPOINT, grpc.ServerCredentials.createInsecure())
server.start()

console.log(chalk.green(`Server running on ${URL_ENDPOINT}`))
