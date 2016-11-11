#!/bin/sh

# このスクリプトを動かした後に`source ~/.bashrc`

git clone https://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh
nvm install 4.4.7

nvm alias default v4.4.7

SHRC='.bashrc'

cd ~
cat <<'EOT' >> $SHRC
if [[ -s ~/.nvm/nvm.sh ]];
 then source ~/.nvm/nvm.sh
fi
EOT

npm install --save express
npm install --save bodyParser
npm install mongoose

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install mongodb-10gen
