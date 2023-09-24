docker stop front_oms
docker rm front_oms

## Docker
#docker build -t front-oms-app .
#docker run -it --name front_oms -p 3000:3000 -d front-oms-app

## Podman
#docker build -t front-oms-app .
#docker run -it --name front_oms -p 3000:3000 -d front-oms-app

## Docker-compose
docker-compose build
docker-compose up -d
