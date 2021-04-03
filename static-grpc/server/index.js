const grpc = require('grpc');
const sqr = require('./protos/sqroot_pb')
const sqrService = require('./protos/sqroot_grpc_pb');
const chalk = require('chalk')
const fs = require('fs')

const calciSqRoot = (call, callback) =>
{
    const number = call.request.getNum()
    if (number >= 0)
    {
        const sqRoot = Math.sqrt(number)
        const response = new sqr.SQResponse()
        response.setResult(sqRoot)
        callback(null, response)
    } else
    {
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message : `The number that you have entered is less than zero and hence has no real roots. Num entered : ${number}`
        })
    }
}

const credentials = grpc.ServerCredentials.createSsl(
    fs.readFileSync('../certs/ca.crt'),
    [{
        cert_chain: fs.readFileSync('../certs/server.crt'),
        private_key:fs.readFileSync('../certs/server.key')
    }],
    true
)

const unsafeCreds = grpc.ServerCredentials.createInsecure()

const server = new grpc.Server()
const URL_ENDPOINT = "127.0.0.1:50051"

server.addService(sqrService.SqRootServiceService, { calciSqRoot })
server.bind(URL_ENDPOINT, credentials)
server.start()
console.log(chalk.yellow(`Server running on ${URL_ENDPOINT}`) )