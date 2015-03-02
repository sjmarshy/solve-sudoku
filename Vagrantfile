# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    version = "1.4.2"
    hostname = "iojs.box"
    locale = "en_GB.UTF.8"
    path = "iojs-v#{version}-linux-x64"

    # Box
    config.vm.box = "ubuntu/trusty64"

    # Shared folders
    config.vm.synced_folder ".", "/srv"

    # Setup
    config.vm.provision :shell, :inline => "touch .hushlogin"
    config.vm.provision :shell, :inline => "hostname #{hostname} && locale-gen #{locale}"
    config.vm.provision :shell, :inline => "apt-get update --fix-missing"
    config.vm.provision :shell, :inline => "apt-get install -q -y g++ make git curl vim"

    # Lang
    config.vm.provision :shell, :inline => "echo 'fetching #{path}' && wget -q https://iojs.org/dist/v#{version}/#{path}.tar.xz"
    config.vm.provision :shell, :inline => "tar -C /usr/local -xpvf #{path}.tar.xz"
    config.vm.provision :shell, :inline => "echo 'export PATH=$PATH:/usr/local/#{path}/bin' > .bash_profile"

end
