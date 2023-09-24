# Version Nodejs
ARG NODE_VERSION=20
# Use the official Ubuntu 20.04 LTS image as the base
FROM ubuntu:22.10

# Update the package lists and upgrade installed packages
RUN apt update 
RUN apt upgrade -y

# Install any necessary packages or dependencies
RUN apt install -y vim bash-completion
RUN curl -sL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
RUN apt install -y nodejs 
RUN apt install -y npm

# Set the working directory inside the container
WORKDIR /app

# Copy any files or directories from the host into the container
COPY . /app

# Expose any necessary ports
EXPOSE 3000

# Specify any environment variables
#ENV VARIABLE_NAME value
RUN npm install

# Check source code with linter. 
RUN npm run lint

# Build project
RUN npm run build

# Define the command to run when the container starts
#CMD [ "npm", "run", "dev" ]
