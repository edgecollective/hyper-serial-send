# Hyper-serial-send

## Install Docker

https://docs.docker.com/install/linux/docker-ce/ubuntu/

## Build the Docker image 

Build the Docker image using:

> ./build.sh

## Run the Docker image

Run with:

> ./run.sh

This will auto-generate a new public key, printed out to the console

You will need this public key when swarming with 'hyper-receive'

Any data posted to the serialport will be appended to the hyperlog.

Note: The index.js code is hardwired to listen to '/dev/ttACM0' at 115200; change these settings to match your local setup.
