#!/bin/sh
VOLUME=/tmp/plugins
echo Replacing files at $VOLUME...
rm -rf $VOLUME/*
cp -r /usr/src/* $VOLUME/
touch $VOLUME/test.tmp
echo Done
