#!/bin/bash

CONFIG=$1
CONFIG_PLACEHOLDER=">>config<<"

function alter_target_file() {
    sed -i "s@$1@$2@" dist/index.html
}

if [ $CONFIG == "restore" ]; then
    alter_target_file "'config', '.*'" "'config', '$CONFIG_PLACEHOLDER'"
else
    alter_target_file $CONFIG_PLACEHOLDER $(cat $CONFIG)
fi
