# -*- mode: ruby -*-
# vi: set ft=ruby :

# Ensure a minimum Vagrant version
Vagrant.require_version ">= 1.6.0"

# Provision script
$rethinkdbScript = <<SCRIPT
#!/usr/bin/env bash

# Force Locale
echo "LC_ALL=en_US.UTF-8" >> /etc/default/locale
locale-gen en_US.UTF-8

# Add RethinkDB repository
source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
wget -qO- http://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -

# Update packages list
sudo apt-get update

# Install RethinkDB package
sudo apt-get -y install rethinkdb

# Copy the config file
sudo cp /vagrant/rethinkdb.conf /etc/rethinkdb/instances.d/default.conf
chown rethinkdb:rethinkdb -R /var/lib/rethinkdb
sudo /etc/init.d/rethinkdb restart
SCRIPT
$redisScript = <<SCRIPT
sudoa apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install -y redis-server
sudo cp /vagrant/redis.conf /etc/redis/redis.conf
sudo service redis-server restart
SCRIPT

Vagrant.configure(2) do |config|
  config.vm.define "rethinkdb" do |rethinkdb|
    # Configure the box
    rethinkdb.vm.box = "ubuntu/trusty64"
    rethinkdb.vm.box_version = "~> 14.04"
    rethinkdb.vm.hostname = hostname = "rethinkdb"

    # Configure Virtualbox settings
    rethinkdb.vm.provider :virtualbox do |vb|
      vb.name = hostname
      vb.customize ["modifyvm", :id, "--memory", "512"]
      vb.customize ["modifyvm", :id, "--ioapic", "on"]
      vb.customize ["modifyvm", :id, "--cpus", "2"]
      vb.customize ["modifyvm", :id, "--ostype", "Ubuntu_64"]
    end

    # Define synced folder
    rethinkdb.vm.synced_folder "./", "/vagrant"

    # Configure port forwarding
    rethinkdb.vm.network :forwarded_port, guest: 8080, host: 8080 # RethinkDB Web UI
    rethinkdb.vm.network :forwarded_port, guest: 28015, host: 28015 # Client driver
    rethinkdb.vm.network :forwarded_port, guest: 29015, host: 29015 # Intracluster traffic
    # Execute provision script
    rethinkdb.vm.provision "shell", inline: $rethinkdbScript
  end
  config.vm.define "redis" do |redis|
    redis.vm.box = "ubuntu/trusty64"
    redis.vm.box_version = "~> 14.04"
    redis.vm.hostname = hostname = "redis"
    redis.vm.provider :virtualbox do |vb|
      vb.name = hostname
      vb.customize ["modifyvm", :id, "--memory", "512"]
      vb.customize ["modifyvm", :id, "--ioapic", "on"]
      vb.customize ["modifyvm", :id, "--cpus", "1"]
      vb.customize ["modifyvm", :id, "--ostype", "Ubuntu_64"]
    end
    redis.vm.synced_folder "./", "/vagrant"
    redis.vm.network :forwarded_port, guest: 6379, host: 6379
    config.vm.provision "shell", inline: $redisScript
  end
end
