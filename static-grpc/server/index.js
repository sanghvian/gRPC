const grpc = require("grpc")
const chalk = require('chalk')
const _ = require('lodash')
const kebabcase = require('lodash.kebabcase')

const greets = require('./protos/greet_pb')
const service = require('./protos/greet_grpc_pb')

const sums = require('./protos/sum_pb')
const sumService = require('./protos/sum_grpc_pb')

const pn = require('./protos/primenum_pb')
const pnService = require('./protos/primenum_grpc_pb')

const avg = require('./protos/avg_pb')
const avgService = require('./protos/avg_grpc_pb')

const max = require('./protos/max_pb')
const maxService = require('./protos/max_grpc_pb')

// const dotenv = require('dotenv')

//* RESPONSE PROCESSING

//! Greet response processing
// const greet = (call, callback) =>
// {
//     const greeting = new greets.GreetResponse()

//     greeting.setResult(
//         "Hello " + call.request.getGreeting().getFirstName() + " " + call.request.getGreeting().getLastName()
//     )
//     callback(null, greeting)
// }

//* Sum response processing
// const sum = (call, callback) =>
// {
//     const summing = new sums.SumResponse()
//     const firstNum = call.request.getSumMessage().getFirstNum();
//     const secondNum = call.request.getSumMessage().getSecondNum();
//     summing.setResult(firstNum + secondNum)

//     callback(null,summing)
// }

//! Greet many times response processing
// const greetManyTimes = (call, callback) =>
// {
//     const greetManyTimesRequest = call.request
//     const firstName = greetManyTimesRequest.getGreeting().getFirstName()
//     console.log(firstName)
//     let count = 0, intervalID = setInterval(() =>
//     {
//         const greetManyTimesResponse = new greets.GreetManyTimesResponse()
//         greetManyTimesResponse.setResult(`Honorable ${firstName}`)

//         // Setup streaming
//         call.write(greetManyTimesResponse)
//         if (++count > 9)
//         {
//             clearInterval(intervalID)
//             call.end()
//         }
//     },1000)
// }

//! Prime number decomposition (server) push request processing

// const calcPn = (call, callback) =>
// {
//     let pnReq = call.request.getPn()
//     console.log(chalk.greenBright(pnReq))
//     let pnTemp = pnReq
//     for(let i = 2; i < pnReq; i++)
//     {
//         while (pnTemp % i === 0)
//         {
//             pnTemp = pnTemp / i
//             const pnRes = new pn.PnResponse()
//             pnRes.setResult(i)
//             call.write(pnRes)
//         }
//     }
//     call.end()
// }

//! Long greeting (client push) request processing
// const longGreet = (call, callback) =>
// {
//     call.on('error', (error) =>
//     {
//         console.log(error)
//     })
//     call.on('data', (request) =>
//     {
//         console.log(chalk.yellowBright(request))
//         const firstName = request.getLgreeting().getFirstName();
//         const lastName = request.getLgreeting().getLastName();
//         console.log(chalk.green.bold(`Hello ${firstName.toUpperCase()} ${lastName.toLowerCase()} `))
//     })
//     call.on('end', () =>
//     {
//         console.log('Client push server stream has ended')
//     })

// }

//! Compute average (client push) request processing
// const computeAvg = (call, callback) =>
// {
//     const numArray = []
//     call.on('error', (error =>
//     {
//         console.log(error)
//     }))

//     call.on('end', () =>
//     {
//         console.log('Average has been computed !')
//         const result = new avg.AvgResponse()
//         const calc = (numArray.reduce((i, acc)=> i + acc, 0))/numArray.length
//         result.setAverage(calc)

//         console.log(chalk.blue.bold(`Average : ${result.getAverage()}`))
//     })

//     call.on('data', request =>
//     {
//         const num = request.getNum()
//         console.log(chalk.blueBright(num))
//         numArray.push(num)
//     })
// }

//! Greet everyone (BiDi stream) request processing
// const sleep = async (interval) => { 
//     return new Promise((resolve =>
//     {
//         setTimeout(()=> resolve(), interval)
//     }))
// }

// const greetEveryone = async (call, callback) =>
// {
//     // FILLERs had to be added else resultArray length would be 0 and for loop would never run
//     const resultArray = ['FILLER','FILLER',]
//     call.on('error', (error) =>
//     {
//         console.log(error)
//     })

//     call.on('end', () =>
//     {
//         console.log('Server has stopped streaming from the client....')
//     })
    
//     call.on('data', (request) =>
//     {
//         const firstName = request.getGreeting().getFirstName()
//         const lastName = request.getGreeting().getLastName()
//         resultArray.push(kebabcase(`${firstName} ${lastName}`))
//         console.log(chalk.green(`Client just pushed this to me ! : ${firstName} ${lastName}`))
//     })
    
//     for (let i = 0; i < resultArray.length; i++)
//     {
//         const result = new greets.GEResponse()
//         result.setResult(resultArray[i])
//         call.write(result)
//         await sleep(4000)
//     }
//     call.end()
// }

const sleep = async (interval) =>
{
    return new Promise(resolve =>
    {
        setTimeout(()=>resolve(),interval)
    })
}


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
    
    
    // let count = 0; intervalID = setInterval(() =>
    // {
    //     if (++count == noOfTimesYouWannaComputeMaximum)
    //     {
    //         clearInterval(intervalID)
    //         call.end()
    //         return
    //     }
    //     return numArray.reduce((elem, acc) => acc = max(elem, acc), -Infinity)
    // }, 3000)

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

//* Add greet request to server
// server.addService(service.GreetServiceService, { greet, greetManyTimes })
// server.addService(sumService.SumServiceService, { sum })
// server.addService(service.GreetServiceService, { greetManyTimes })
// server.addService(pnService.PnServiceService, { calcPn })
// server.addService(service.GreetServiceService, { longGreet })
// server.addService(avgService.AvgServiceService, { computeAvg })
// server.addService(service.GreetServiceService, { greetEveryone })
server.addService(maxService.MaximumServiceService, { calciMax })


//? START THE SERVER
const URL_ENDPOINT = "127.0.0.1:50051"
server.bind(URL_ENDPOINT, grpc.ServerCredentials.createInsecure())
server.start()

console.log(chalk.green(`Server running on ${URL_ENDPOINT}`))
