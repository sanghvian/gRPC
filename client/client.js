const grpc = require('grpc');
const chalk = require('chalk')

const avg = require('../server/protos/avg_pb')
const avgService = require('../server/protos/avg_grpc_pb')

const URL_ENDPOINT = `localhost:50051` 

//! Compute average client creation 
const avgClient = new avgService.AvgServiceClient(
    URL_ENDPOINT,
    grpc.credentials.createInsecure()
)

//* Compute average response handling
const avgReq = new avg.AvgRequest()
const call = avgClient.computeAvg(avgReq, (error, response) =>
{
    if (!error)
    {
        console.log(`Responded average is ${response}`)
    } else
    {
        console.log(error)
    }
})

//* Compute average request creation
const numArray = [1,2,3,4,5,6,7,8,9,10]
let count = 0, intervalID = setInterval(() =>
{
    console.log(chalk.magentaBright(`Sending request num ${count + 1}`))
    avgReq.setNum(numArray[count])
    call.write(avgReq)
    if (++count == numArray.length)
    {
        clearInterval(intervalID)
        call.end()
    }
},1000)
