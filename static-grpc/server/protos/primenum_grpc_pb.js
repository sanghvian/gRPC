// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_primenum_pb = require('../protos/primenum_pb.js');

function serialize_primenum_PnRequest(arg) {
  if (!(arg instanceof protos_primenum_pb.PnRequest)) {
    throw new Error('Expected argument of type primenum.PnRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_primenum_PnRequest(buffer_arg) {
  return protos_primenum_pb.PnRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_primenum_PnResponse(arg) {
  if (!(arg instanceof protos_primenum_pb.PnResponse)) {
    throw new Error('Expected argument of type primenum.PnResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_primenum_PnResponse(buffer_arg) {
  return protos_primenum_pb.PnResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PnServiceService = exports.PnServiceService = {
  calcPn: {
    path: '/primenum.PnService/CalcPn',
    requestStream: false,
    responseStream: true,
    requestType: protos_primenum_pb.PnRequest,
    responseType: protos_primenum_pb.PnResponse,
    requestSerialize: serialize_primenum_PnRequest,
    requestDeserialize: deserialize_primenum_PnRequest,
    responseSerialize: serialize_primenum_PnResponse,
    responseDeserialize: deserialize_primenum_PnResponse,
  },
};

exports.PnServiceClient = grpc.makeGenericClientConstructor(PnServiceService);
