#!/bin/bash
# This script adapted from an older post on StackOverflow by user fieldju
# https://stackoverflow.com/questions/36478741/installing-oracle-jdk-on-windows-subsystem-for-linux
# The script was for JDK 8. 
# Due to major changes with JDK 11 (no JRE, no Derby, Unlimited Strength included), it was necessary to update the entire script.
set -ex

# UPDATE THESE URLs (this one updated as of 2019-03-06)
# export JDK_URL=http://download.oracle.com/otn-pub/java/jdk/11.0.2+9/f51449fcd52f4d52b93a989c5c56ed3c/jdk-11.0.2_linux-x64_bin.tar.gz

export JDK_URL=https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz

# Download Oracle Java 11 accepting the license
wget --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" \
${JDK_URL}
# Extract the archive
tar -xzvf jdk-*.tar.gz
# clean up the tar
rm -fr jdk-*.tar.gz
# mk the jvm dir
sudo mkdir -p /usr/lib/jvm
# move the server jre
sudo mv jdk-17.* /usr/lib/jvm/oracle_jdk17

sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/oracle_jdk17/bin/java 2000
sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/oracle_jdk17/bin/javac 2000

sudo echo "export J2SDKDIR=/usr/lib/jvm/oracle_jdk17
export J2REDIR=/usr/lib/jvm/oracle_jdk17/
export PATH=$PATH:/usr/lib/jvm/oracle_jdk17/bin
export JAVA_HOME=/usr/lib/jvm/oracle_jdk17" | sudo tee -a /etc/profile.d/oraclejdk.sh

echo "valitse oikein"
sudo update-alternatives --config java
