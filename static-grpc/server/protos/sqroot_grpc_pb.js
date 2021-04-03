// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_sqroot_pb = require('../protos/sqroot_pb.js');

function serialize_SQRequest(arg) {
  if (!(arg instanceof protos_sqroot_pb.SQRequest)) {
    throw new Error('Expected argument of type SQRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SQRequest(buffer_arg) {
  return protos_sqroot_pb.SQRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SQResponse(arg) {
  if (!(arg instanceof protos_sqroot_pb.SQResponse)) {
    throw new Error('Expected argument of type SQResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SQResponse(buffer_arg) {
  return protos_sqroot_pb.SQResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SqRootServiceService = exports.SqRootServiceService = {
  calciSqRoot: {
    path: '/SqRootService/CalciSqRoot',
    requestStream: false,
    responseStream: false,
    requestType: protos_sqroot_pb.SQRequest,
    responseType: protos_sqroot_pb.SQResponse,
    requestSerialize: serialize_SQRequest,
    requestDeserialize: deserialize_SQRequest,
    responseSerialize: serialize_SQResponse,
    responseDeserialize: deserialize_SQResponse,
  },
};

exports.SqRootServiceClient = grpc.makeGenericClientConstructor(SqRootServiceService);
