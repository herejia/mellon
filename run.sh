#!/bin/sh
mkdir -p /var/log/mellon
sudo nodejs /home/pi/mellon/src/server.js >> /var/log/mellon/application.log 2>&1
