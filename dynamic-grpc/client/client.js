const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const dynaProtoPath = path.join(__dirname, '..', 'protos', 'dynam.proto')
const dynaProtoDefinition = protoLoader.loadSync(dynaProtoPath, {
    oneofs: true,
    defaults: true,
    longs: String,
    enums: String,
    keepCase:true
})

const dynaPackageDefinition = grpc.loadPackageDefinition(dynaProtoDefinition)

const url = "127.0.0.1:5000"

const client = new dynaPackageDefinition.DynamicServices(url,grpc.credentials.createInsecure())

const callDynaProtoAPI = () =>
{
    const request = {
        dynaObj: {
            first_name: "Ankit",
            last_name:"Sanghvi"
        }
    }

    client.dynamo(request, (error, response))
    if (!error)
    {
        console.log(`Response : ${response.dynaRes}`)
    } else
    {
        
    }
}

const main = () =>
{
    callDynaProtoAPI()   
}