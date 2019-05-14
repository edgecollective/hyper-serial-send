#!/bin/bash

docker run -it --rm --name hyper-serial-send --device=/dev/ttyACM0 --network host $USER/hyper-serial-send
