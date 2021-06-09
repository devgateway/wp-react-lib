#!/bin/sh
VOLUME=/var/www/ui
echo Replacing files at $VOLUME...
rm -rf $VOLUME/*
tar -C $VOLUME -xf /usr/src/ui.tgz
echo Done
