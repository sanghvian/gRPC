// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_avg_pb = require('../protos/avg_pb.js');

function serialize_avg_AvgRequest(arg) {
  if (!(arg instanceof protos_avg_pb.AvgRequest)) {
    throw new Error('Expected argument of type avg.AvgRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_avg_AvgRequest(buffer_arg) {
  return protos_avg_pb.AvgRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_avg_AvgResponse(arg) {
  if (!(arg instanceof protos_avg_pb.AvgResponse)) {
    throw new Error('Expected argument of type avg.AvgResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_avg_AvgResponse(buffer_arg) {
  return protos_avg_pb.AvgResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AvgServiceService = exports.AvgServiceService = {
  computeAvg: {
    path: '/avg.AvgService/ComputeAvg',
    requestStream: true,
    responseStream: false,
    requestType: protos_avg_pb.AvgRequest,
    responseType: protos_avg_pb.AvgResponse,
    requestSerialize: serialize_avg_AvgRequest,
    requestDeserialize: deserialize_avg_AvgRequest,
    responseSerialize: serialize_avg_AvgResponse,
    responseDeserialize: deserialize_avg_AvgResponse,
  },
};

exports.AvgServiceClient = grpc.makeGenericClientConstructor(AvgServiceService);
