#!/bin/sh

certs_dir=$(dirname $0)/certs
mkdir -p $certs_dir

ca_key=$certs_dir/ca.key
ca_cert=$certs_dir/ca.crt
keycloak_key=$certs_dir/keycloak.key
keycloak_cert=$certs_dir/keycloak.crt
keycloak_pub=$certs_dir/keycloak.pub

openssl genrsa -out $ca_key
openssl req -out $ca_cert -nodes -key $ca_key -new -x509 -subj '/O=UNSAFE-Testing' -days 3650

openssl genrsa -out $keycloak_key
openssl req -nodes -key $keycloak_key -new -config $certs_dir/openssl.cnf | openssl x509 -req -CA $ca_cert -CAkey $ca_key -CAcreateserial -extfile $certs_dir/openssl.cnf -extensions v3_req -days 3650 -out $keycloak_cert
openssl x509 -in $keycloak_cert -pubkey -noout -out $keycloak_pub

rm $certs_dir/ca.srl
