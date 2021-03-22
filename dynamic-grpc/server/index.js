const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')
const path = require('path')

// grpc service definition for guest

const dynaProtoPath = path.join(__dirname, "..", "protos", "dynam.proto")
const dynaProtoDefinition = protoLoader.loadSync(dynaProtoPath, {
    keepCase: true,
    oneofs: true,
    defaults: true,
    longs: String,
    enums:String
})

const dynaPackageDefinition = grpc.loadPackageDefinition(dynaProtoDefinition).dynamo

const dynamo = (call, callback) =>
{
    const firstName = call.request.dynaObj.firstName;
    const lastName = call.request.dynaObj.lastName;

    callback(null,{dynaRes : `Hello ${firstName} ${lastName} `})
}

function main()
{
    const server = new grpc.Server()
    server.addService(dynaPackageDefinition.DynamicService.service , {
        dynamo
    })
    const url = "127.0.0.1:5000"
    server.bind(url, grpc.credentials.createInsecure())
    server.start()
    console.log(`Server running on ${url} `)
}
main()