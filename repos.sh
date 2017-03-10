#!/bin/sh

DIRECTORY="/var/repos/musicapi.git"

if [ ! -d "$DIRECTORY" ]; then
	cd /var
	mkdir repos
	cd repos
	mkdir musicapi.git
	cd musicapi.git
	git init --bare
	cd /var

	cd /var/repos/musicapi.git/hooks

	touch post-receive
	chmod +x post-receive
	FILE=post-receive
	echo "#!/bin/sh" > $FILE
	echo "GIT_WORK_TREE=/var/www/html/musicapi git checkout -f" >> $FILE

	cd /
fi