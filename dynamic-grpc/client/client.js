const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const greetProtoPath = path.join(__dirname, "..", "protos", "greet.proto")
const greetProtoDefinition = protoLoader.loadSync(greetProtoPath, {
    keepCase: true,
    oneofs: true,
    defaults: true,
    longs: String,
    enums:String
})

const greetPackageDefinition = grpc.loadPackageDefinition(greetProtoDefinition).greet 
const client = new greetPackageDefinition.GreetService("localhost:50051", grpc.credentials.createInsecure())

const callGreetings = () =>
{
    const request = {
        greeting :{
            first_name: "Ankit",
            last_name : "Sanghvi"
        }
    }

    client.greet(request, (error, response) =>
    {
        if (!error)
        {
            console.log(`Greeting message : ${response.result}`)
        } else
        {
            // console.log(error)
        }
    })
}

const main = () =>
{
    callGreetings()
}

main()


