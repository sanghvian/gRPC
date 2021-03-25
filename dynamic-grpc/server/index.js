const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')
const fs = require('fs')

const greetProtoPath = path.join(__dirname, "..", "protos", "greet.proto")
const greetProtoDefinition = protoLoader.loadSync(greetProtoPath, {
    keepCase:true,
    longs: String,
    enums: String,
    oneofs: true,
    defaults: true,
})

const greet = (call, callback) =>
{
    const firstName = call.request.greeting.first_name;
    const lastName = call.request.greeting.last_name;
    callback(null, {result : `Hello ${firstName} ${lastName}`})
}

// const dynaPackageDefinition = grpc.loadPackageDefinition(dynaProtoDefinition).dynamo

const greetPackageDefinition = grpc.loadPackageDefinition(greetProtoDefinition).greet

const main = () =>
{
    const server = new grpc.Server()
    server.addService(greetPackageDefinition.GreetService.service, {greet})
    server.bind('localhost:50051', grpc.ServerCredentials.createInsecure())
    server.start()
    console.log('Listening on localhost:50051')
}

main()