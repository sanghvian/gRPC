const grpc = require("grpc")
const chalk = require('chalk')
const _ = require('lodash')

const max = require('./protos/max_pb')
const maxService = require('./protos/max_grpc_pb')

//* RESPONSE PROCESSING

//* HELPER FUNCTION
const sleep = async (interval) =>
{
    return new Promise(resolve =>
    {
        setTimeout(()=>resolve(),interval)
    })
}

//* MAIN FUNCTION
const calciMax = async(call, callback) =>
{
    const noOfTimesYouWannaComputeMaximum = 15
    const numArray = []
    call.on('data', request =>
    {
        const num = request.getNum()
        console.log(chalk.green(`Client just pushed this number to me : ${num}`))
        numArray.push(num)
    })

    call.on('status', status => console.log(chalk.magenta(status)))

    call.on('end', ()=>{console.log(chalk.cyanBright('Client has stopped streaming from the server'))})

    for (let i = 0; i < noOfTimesYouWannaComputeMaximum; i++)
    {
        const maxResponse = new max.MaxResponse()
        const maximum = _.max(numArray)
        console.log(maximum)
        maxResponse.setResult(maximum)
        call.write(maxResponse)
        await sleep(3000)
    }
    call.end()
}

//* Setup a server
const server = new grpc.Server()


//* ADDING SERVICES TO SERVER

server.addService(maxService.MaximumServiceService, { calciMax })


//? START THE SERVER
const URL_ENDPOINT = "127.0.0.1:50051"
server.bind(URL_ENDPOINT, grpc.ServerCredentials.createInsecure())
server.start()

console.log(chalk.green(`Server running on ${URL_ENDPOINT}`))
