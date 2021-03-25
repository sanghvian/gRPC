# Protobuf processing by gRPC
sudo protoc -I=. ./protos/greet.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`

# # Only Protobuf processing (no gRPC)
# sudo protoc -I=. ./protos/dummy.proto --js_out=import_style=commonjs,binary:./server

# # Alternate method 
# npm i grpc-web
# protoc -I=. ./protos/greet.proto \
#     --js_out=import_style=commonjs:./server \
#     --grpc-web_out=import_style=commonjs,mode=grpcwebtext:server