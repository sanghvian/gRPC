// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_dynam_pb = require('../protos/dynam_pb.js');

function serialize_dynamic_DynamicRequest(arg) {
  if (!(arg instanceof protos_dynam_pb.DynamicRequest)) {
    throw new Error('Expected argument of type dynamic.DynamicRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dynamic_DynamicRequest(buffer_arg) {
  return protos_dynam_pb.DynamicRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dynamic_DynamicResponse(arg) {
  if (!(arg instanceof protos_dynam_pb.DynamicResponse)) {
    throw new Error('Expected argument of type dynamic.DynamicResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dynamic_DynamicResponse(buffer_arg) {
  return protos_dynam_pb.DynamicResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DynamicServiceService = exports.DynamicServiceService = {
  dynamicFunction: {
    path: '/dynamic.DynamicService/DynamicFunction',
    requestStream: false,
    responseStream: false,
    requestType: protos_dynam_pb.DynamicRequest,
    responseType: protos_dynam_pb.DynamicResponse,
    requestSerialize: serialize_dynamic_DynamicRequest,
    requestDeserialize: deserialize_dynamic_DynamicRequest,
    responseSerialize: serialize_dynamic_DynamicResponse,
    responseDeserialize: deserialize_dynamic_DynamicResponse,
  },
};

exports.DynamicServiceClient = grpc.makeGenericClientConstructor(DynamicServiceService);
