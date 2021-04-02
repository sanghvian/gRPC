const grpc = require('grpc');
const chalk = require('chalk')

const max = require('../server/protos/max_pb')
const maxService = require('../server/protos/max_grpc_pb')

const URL_ENDPOINT = `localhost:50051` 

//! Calculate max from continuous no. stream (BiDi)

const calciMaxClient=async()=>{
    //* Client setup
    const maxClient = new maxService.MaximumServiceClient(
        URL_ENDPOINT,
        grpc.credentials.createInsecure()
    )
    
    //* Helper function for client
    const sleep = async (interval) =>
    {
        return new Promise(resolve =>
        {
            setTimeout(()=>resolve(),interval)
        })
    }
    
    //* Setup the response handling
    const maxReq = new max.MaxRequest()
    const call = maxClient.calciMax(maxReq, () => { })
    call.on('data', (response) =>
    {
        const max = response.getResult()
        console.log(chalk.yellow(`Server says that uptil now, this is the max num : ${max}`))
    })
    
    call.on('error', err => console.log(chalk.yellow(err)))
    call.on('status', status => console.log(chalk.magenta(status)))
    call.on('end', ()=>{console.log(chalk.cyanBright('Server has stopped streaming from the client'))})
    
    const numArray = [1, 5, 3, 6, 2, 20, 1,23, 54, 78, 34, 545,23,54, 4,544,5,23,12,12,,35,4,55,6345214,11231231]
    for (let i = 0; i < numArray.length; i++)
    {
        maxReq.setNum(numArray[i])
        call.write(maxReq)
        await sleep(1000)
    }
    call.end()
}
calciMaxClient()