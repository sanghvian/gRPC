const grpc = require('grpc');
const figlet = require('figlet');
console.log(figlet.textSync('gRPC',{horizontalLayout:'full'}))
const chalk = require('chalk')

const sums = require('../server/protos/sum_pb')
const sumService = require('../server/protos/sum_grpc_pb')

const URL_ENDPOINT = `localhost:50051` 

// //! Sum client
const sumClient = new sumService.SumServiceClient(
    URL_ENDPOINT,
    grpc.credentials.createInsecure()
)

//* Sum request processing
const sumRequest = new sums.SumRequest()
const sumObject = new sums.SumMessage()
sumObject.setFirstNum(5)
sumObject.setSecondNum(19)
sumRequest.setSumMessage(sumObject)

//* Sum response handling
sumClient.sum(sumRequest, (error, response) =>
{
    console.log(sumRequest)
    console.log(response)
    if (!error)
    {
        console.log(`Sum result : ${response.getResult()}`)
    } else
    {
        console.log('fml')
    }
})
