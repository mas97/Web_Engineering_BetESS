# FILE EXECUTED ALWAYS AS ROOT

# adding epel-release repository
yum install epel-release -y

# nginx installation
apt-get install -y nginx

# remove default configuration
# rm /etc/nginx/sites-available/default
# rm /etc/nginx/sites-enabled/default

rm /etc/nginx/sites-enabled/default
cp /home/vagrant/files/default.conf /etc/nginx/sites-enabled

#ln -s /etc/nginx/sites-available/reverse-proxy.conf /etc/nginx/sites-enabled/reverse-proxy.conf

service nginx start
service nginx configtest
service nginx restart