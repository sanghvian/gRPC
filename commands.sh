# Protobuf processing by gRPC
sudo protoc -I=. ./protos/sum.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`