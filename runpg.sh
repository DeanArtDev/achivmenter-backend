ROOT_DIR=$(pwd);

docker start localhost-db ||
docker run -d --rm --name localhost-db -p 5432:5432 \
 -e POSTGRES_DB=db_achivmenter_local_dev \
 -e POSTGRES_USER=db_admin \
 -e POSTGRES_PASSWORD=local_bd \
 -v achivmenter_bd_vol:/var/lib/postgresql/data \
 postgres:13;