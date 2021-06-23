#!/bin/sh
VOLUME=/tmp/plugins
echo Replacing files at $VOLUME...
rm -rf $VOLUME/*
cp /usr/src/* $VOLUME/
touch $VOLUME/test.tmp
echo Done
