#!/bin/sh

cd ./php

php index.php pipe small.csv
php index.php modify small.csv

php index.php pipe medium.csv
php index.php modify medium.csv

cd ./../nodejs

node index.js pipe small.csv
node index.js modify small.csv

node index.js pipe medium.csv
node index.js modify medium.csv