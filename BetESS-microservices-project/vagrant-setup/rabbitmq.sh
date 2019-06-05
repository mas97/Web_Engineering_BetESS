yum -y install epel-release

yum -y update

yum -y install erlang socat

erl -version

yum -y install wget

wget https://www.rabbitmq.com/releases/rabbitmq-server/v3.6.10/rabbitmq-server-3.6.10-1.el7.noarch.rpm

rpm --import https://www.rabbitmq.com/rabbitmq-release-signing-key.asc

rpm -Uvh rabbitmq-server-3.6.10-1.el7.noarch.rpm

systemctl start rabbitmq-server

systemctl enable rabbitmq-server

systemctl status rabbitmq-server

rabbitmq-plugins enable rabbitmq_management

chown -R rabbitmq:rabbitmq /var/lib/rabbitmq/

rabbitmqctl add_user admin StrongPassword

rabbitmqctl set_user_tags admin administrator

rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
