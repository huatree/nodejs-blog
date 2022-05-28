#!/bin/sh 

cd /home/workspace/blog-native/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log

# linux crontab 
# 需linux平台运行
# * 0 * * * sh /home/workspace/blog-native/src/utils/copy.sh