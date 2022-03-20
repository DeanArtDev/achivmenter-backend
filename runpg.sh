ROOT_DIR=$(pwd);

docker start local-db-postgres ||
docker run -d --rm --name local-db-postgres -p 5432:5432 \
 -e POSTGRES_DB=db_achivmenter_local_dev \
 -e POSTGRES_USER=db_admin \
 -e POSTGRES_PASSWORD=local_bd \
 -v bd_vol:/var/lib/postgresql/data \
 postgres:13;