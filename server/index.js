const grpc = require("grpc")
const chalk = require('chalk')
const pn = require('./protos/primenum_pb')
const pnService = require('./protos/primenum_grpc_pb')

//* RESPONSE PROCESSING

//! Prime number decomposition (server) push request processing

const calcPn = (call, callback) =>
{
    let pnReq = call.request.getPn()
    console.log(chalk.greenBright(pnReq))
    let pnTemp = pnReq
    for(let i = 2; i < pnReq; i++)
    {
        while (pnTemp % i === 0)
        {
            pnTemp = pnTemp / i
            const pnRes = new pn.PnResponse()
            pnRes.setResult(i)
            call.write(pnRes)
        }
    }
    call.end()
}


//* Setup a server
const server = new grpc.Server()


//* ADDING SERVICES TO SERVER

//* Add greet request to server

server.addService(pnService.PnServiceService, { calcPn })

//? START THE SERVER
const URL_ENDPOINT = "127.0.0.1:50051"
server.bind(URL_ENDPOINT, grpc.ServerCredentials.createInsecure())
server.start()

console.log(chalk.green(`Server running on ${URL_ENDPOINT}`))
