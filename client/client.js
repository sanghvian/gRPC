const grpc = require('grpc');
const chalk = require('chalk')

const pn = require('../server/protos/primenum_pb')
const pnService = require('../server/protos/primenum_grpc_pb')

const URL_ENDPOINT = `localhost:50051` 


//! Prime number decomposition client creation 
// const pnServiceClient = new pnService.PnServiceClient(
//     URL_ENDPOINT,
//     grpc.credentials.createInsecure()
// )

// //* Prime number decomposition request processing
// const pnServiceReq = new pn.PnRequest()
// pnServiceReq.setPn(20)
// const call = pnServiceClient.calcPn(pnServiceReq, () => {})

// call.on('status', (status) =>
// {
//     console.log(status)
// })

// call.on('data', (response) =>
// {
//     console.log(`Factor : ${response}`)
// })

// call.on('error', (error) =>
// {
//     console.log(error)
// })

// call.on('end', () =>
// {
//     console.log('Streaming has ended ........')
// })

//! Long greet decomposition client creation 
// const longServiceClient = new service.GreetServiceClient(
//     URL_ENDPOINT,
//     grpc.credentials.createInsecure()
// )


// //* Long greet request creation
// const lgReq = new greets.LongGreetRequest()
// const call = longServiceClient.longGreet(lgReq, (error, response) =>
// {
//     if (!error)
//     {
//         console.log(`Client push res => ${response.getResult()}`)
//     } else
//     {
//         console.log(error)
//     }
// })

// // //* Long greet response handling
// let count = 0, intervalID = setInterval(() =>
// {
//     console.log(chalk.blue('Sending message : '+count))
//     const lggreet = new greets.Greeting()
//     lggreet.setFirstName('Ankit')
//     lggreet.setLastName('Sanghvi')
//     lgReq.setLgreeting(lggreet)
//     call.write(lgReq)
//     if (++count > 5)
//     {
//         clearInterval(intervalID)
//         call.end()
//     }
    
// },1000)

//! Compute average client creation 
// const avgClient = new avgService.AvgServiceClient(
//     URL_ENDPOINT,
//     grpc.credentials.createInsecure()
// )

//* Compute average response handling
// const avgReq = new avg.AvgRequest()
// const call = avgClient.computeAvg(avgReq, (error, response) =>
// {
//     if (!error)
//     {
//         console.log(`Responded average is ${response}`)
//     } else
//     {
//         console.log(error)
//     }
// })

// //* Compute average request creation
// const numArray = [1,2,3,4,5,6,7,8,9,10]
// let count = 0, intervalID = setInterval(() =>
// {
//     console.log(chalk.magentaBright(`Sending request num ${count + 1}`))
//     avgReq.setNum(numArray[count])
//     call.write(avgReq)
//     if (++count == numArray.length)
//     {
//         clearInterval(intervalID)
//         call.end()
//     }
// },1000)

//! Greet everyone (BiDi) client creation 
// const greetEveryoneClient = async () =>
// {
//     const geClient = new service.GreetServiceClient(
//         URL_ENDPOINT,
//         grpc.credentials.createInsecure()
//     )
    
//     //* Greet everyone (BiDi) helper func
//     const sleep = async (interval) =>
//     {
//         return new Promise(resolve =>
//         {
//             setTimeout(()=>resolve(), interval)
//         })
//     }
    
//     //* Greet everyone (BiDi) response handling
//     const geReq = new greets.GERequest()
//     const call = geClient.greetEveryone(geReq, () =>{})
    
//     call.on('error', (error) =>
//     {
//         console.log(error)
//     })
//     call.on('status', (status) =>
//     {
//         console.log(status)
//     })
//     call.on('data', (response) =>
//     {
//         console.log(chalk.yellow(`Server just pushed this to me : ${response.getResult().toUpperCase()} `))
//     })
//     call.on('end', () =>
//     {
//         console.log('Client has stopped streaming from the server')
//     })
    
//     //* Greet everyone (BiDi) request creation
//     const namesArray = [
//         {
//             firstName: 'Ankit',
//             lastName:'Sanghvi'
//         },
//         {
//             firstName: 'Pratik',
//             lastName:'Sanghavi'
//         },
//         {
//             firstName: 'Neelam',
//             lastName:'Shanghavi'
//         },
//         {
//             firstName: 'Ravi',
//             lastName:'Sanghavi'
//         },
//     ]
    
//     for (let i = 0; i < namesArray.length; i++)
//     {
//         const { firstName, lastName } = namesArray[i]
//         const greeting = new greets.Greeting
//         greeting.setFirstName(firstName)
//         greeting.setLastName(lastName)
//         geReq.setGreeting(greeting)
//         call.write(geReq)
//         await sleep(1500)
//     }
    // call.end()
// }
// greetEveryoneClient()

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