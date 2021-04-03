const grpc = require('grpc')
const sqr = require('../server/protos/sqroot_pb')
const sqrService = require('../server/protos/sqroot_grpc_pb')
const fs = require('fs')

const getGRPCDeadline = (rpcType) =>
{
    let timeAllowed = 5000;
    switch (rpcType)
    {
        case 1:
            timeAllowed = 1000
            break;

        case 2:
            timeAllowed = 7000
            break;
        default:
            console.log(`Invalid rpcType. Using default value of time allowed (${timeAllowed/1000}s) for deadline`)
    }
    return new Date(Date.now() + timeAllowed )
}

const URL_ENDPOINT = '127.0.0.1:50051'

const credentials = grpc.credentials.createSsl(
    fs.readFileSync('../certs/ca.crt'),
    fs.readFileSync('../certs/client.key'),
    fs.readFileSync('../certs/client.crt')
)

const unsafeCreds = grpc.credentials.createInsecure()

const sqrClient = new sqrService.SqRootServiceClient(
    URL_ENDPOINT,
    credentials
    )
    
    const number = -1
    const sqrReq = new sqr.SQRequest()
    sqrReq.setNum(number)
    
const deadline = getGRPCDeadline(1)
sqrClient.calciSqRoot(sqrReq,{deadline}, (error, response) =>
{
    if (!error)
    {
        console.log(`Square root of number is : ${response.getResult()} `)
    } else
    {
        console.log(error.message)
    }
})

