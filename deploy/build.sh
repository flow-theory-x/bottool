#!/bin/bash
dir=$(cd $(dirname $0); pwd)
cd ${dir}

rm -r ../dist
mkdir ../dist

if [ $1 = 'stg' ]; then
exit;
elif [ $1 = 'flow' ]; then
	cp bottool_flow.env ../dist/.env
	LAMBDA_FUNCTION_NAME=flow-api
	filename="flow_upload.zip"
	rm ${dir}/../${filename}
	echo 'Zip for FLOW'
elif [ $1 = 'local' ]; then
	cp api_local.env ../dist/.env
elif [ $1 = 'test' ]; then
	cp api_local.env ../dist/.env
else
	echo 'input error'
	exit
fi

date +'VERSION=%Y%m%d%H%M%S' >> ../dist/.env

echo "DIR:" $dir
echo "MODE:" $1
echo "NAME:" $LAMBDA_FUNCTION_NAME

cd ../src
tsc
cp ../package.json ../dist
cp ../package-lock.json ../dist
cp -r ../node_modules ../dist

cd ../dist
if [ $1 = 'local' ]; then
	echo "start express run";
	NODE_ENV=develop node index.js
elif [ $1 = 'test' ]; then
	NODE_ENV=develop node develop.js
else
	zip -r ${dir}/../${filename} ./*
	zip ${dir}/../${filename} .env
	zip --delete ${dir}/../${filename} develop.js
	zip --delete ${dir}/../${filename} test/*
	cd ${dir}/../
	ls -lahrt
	aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_NAME} --zip-file fileb://${filename}
fi
