const grpc = require("grpc")

const server = new grpc.Server()
server.bind("http://127.0.0.1:4000", grpc.ServerCredentials.createInsecure())
server.start
console.log("Server started on port 4000")