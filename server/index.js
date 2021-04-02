const grpc = require("grpc")
const chalk = require('chalk')
const _ = require('lodash')

const avg = require('./protos/avg_pb')
const avgService = require('./protos/avg_grpc_pb')

//* RESPONSE PROCESSING
//! Compute average (client push) request processing

const computeAvg = (call, callback) =>
{
    const numArray = []
    call.on('error', (error =>
    {
        console.log(error)
    }))

    call.on('end', () =>
    {
        console.log('Average has been computed !')
        const result = new avg.AvgResponse()
        const calc = (numArray.reduce((i, acc)=> i + acc, 0))/numArray.length
        result.setAverage(calc)

        console.log(chalk.blue.bold(`Average : ${result.getAverage()}`))
    })

    call.on('data', request =>
    {
        const num = request.getNum()
        console.log(chalk.blueBright(num))
        numArray.push(num)
    })
}


//* Setup a server
const server = new grpc.Server()


//* ADDING SERVICES TO SERVER

//* Add greet request to server
server.addService(avgService.AvgServiceService, { computeAvg })


//? START THE SERVER
const URL_ENDPOINT = "127.0.0.1:50051"
server.bind(URL_ENDPOINT, grpc.ServerCredentials.createInsecure())
server.start()

console.log(chalk.green(`Server running on ${URL_ENDPOINT}`))
