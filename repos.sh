#!/bin/sh

DIRECTORY="/var/repos/{{project}}.git"

if [ ! -d "$DIRECTORY" ]; then
	cd /var
	mkdir repos
	cd repos
	mkdir {{project}}.git
	cd {{project}}.git
	git init --bare
	cd /var

	cd /var/repos/{{project}}.git/hooks

	touch post-receive
	chmod +x post-receive
	FILE=post-receive
	echo "#!/bin/sh" > $FILE
	echo "GIT_WORK_TREE=/var/www/html/{{project}} git checkout -f" >> $FILE

	cd /
fi