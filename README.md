# -Zakodix_OMS_Front

## Intro
This repository contains a Frontend services and instructions to set up a Docker environment to run the frontend.

## Installation

### 
To run this project, you'll need to have Docker and Docker Compose installed on your machine. If you don't have them, you can follow the instructions below to install them on a CentOS system:
```
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce
sudo systemctl start docker
sudo systemctl enable docker

DOCKER_CONFIG=/usr/local/lib/docker/;
mkdir -p $DOCKER_CONFIG/cli-plugins;
curl -SL https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose;
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose;
ln -s /usr/local/lib/docker/cli-plugins/docker-compose /usr/bin/docker-compose;
```

##  Install npm packages
```
npm install
```
2. Start
```
npm run dev
```

Check lint errors
```
npm run lint
```


App started on localhost:3000.

Library for video broadcast - https://github.com/k-yle/rtsp-relay


Article - https://habr.com/ru/company/flashphoner/blog/329108/
