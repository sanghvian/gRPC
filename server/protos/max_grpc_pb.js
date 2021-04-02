// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_max_pb = require('../protos/max_pb.js');

function serialize_max_MaxRequest(arg) {
  if (!(arg instanceof protos_max_pb.MaxRequest)) {
    throw new Error('Expected argument of type max.MaxRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_max_MaxRequest(buffer_arg) {
  return protos_max_pb.MaxRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_max_MaxResponse(arg) {
  if (!(arg instanceof protos_max_pb.MaxResponse)) {
    throw new Error('Expected argument of type max.MaxResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_max_MaxResponse(buffer_arg) {
  return protos_max_pb.MaxResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var MaximumServiceService = exports.MaximumServiceService = {
  calciMax: {
    path: '/max.MaximumService/CalciMax',
    requestStream: true,
    responseStream: true,
    requestType: protos_max_pb.MaxRequest,
    responseType: protos_max_pb.MaxResponse,
    requestSerialize: serialize_max_MaxRequest,
    requestDeserialize: deserialize_max_MaxRequest,
    responseSerialize: serialize_max_MaxResponse,
    responseDeserialize: deserialize_max_MaxResponse,
  },
};

exports.MaximumServiceClient = grpc.makeGenericClientConstructor(MaximumServiceService);
