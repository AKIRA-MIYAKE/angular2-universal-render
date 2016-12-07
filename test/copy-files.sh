dir=$(cd $(dirname $0) && pwd)

if [ -e ${dir}/../client ]; then
    rm -rf ${dir}/../client
fi

mkdir ${dir}/../client

if [ -e ${dir}/http ]; then
    rm -rf ${dir}/http
fi

mkdir ${dir}/http

cd ${dir}/../ng-project
node_modules/.bin/ng build
cd ${dir}

cp -r ${dir}/../ng-project/src ${dir}/../client
cp -r ${dir}/../ng-project/dist ${dir}/../client

cp ${dir}/../ng-project/dist/* ${dir}/http