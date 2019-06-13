# FILE EXECUTED ALWAYS AS ROOT

# Update packages
apt-get update

# Upgrade packages
apt-get upgrade

apt-get install npm -y
apt-get install nodejs -y

curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential

apt install -y mongodb

service mongod start

npm install

npm install forever -g

cd files

forever start -e error.log -l logs.log -o out.log src/index.js

echo '---------- CHECKING PORTS ----------'
sleep 3
netstat -anp