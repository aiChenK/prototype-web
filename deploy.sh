#!/bin/bash
echo "building..."
npm run build

echo "syncing..."
rsync -av --delete ./dist/ root@192.168.5.5:/aichenk/xhweb/prototype

echo "cleaning..."
rm -rf ./dist/

echo "done!"