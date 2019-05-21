# FILE EXECUTED ALWAYS AS ROOT

# Update packages
apt-get update

# Upgrade packages
apt-get upgrade

# git installation
apt-get install -y git

# nginx installation
apt-get install -y nginx

# remove default configuration
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default

cp /home/vagrant/files/reverse-proxy.conf /etc/nginx/sites-available

ln -s /etc/nginx/sites-available/reverse-proxy.conf /etc/nginx/sites-enabled/reverse-proxy.conf

service nginx configtest
service nginx restart