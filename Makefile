.PHONY: refresh_db, build_static

refresh_db:
	psql -h 127.0.0.1 -U postgres -d template1 -f server/drop.sql && \
	psql -h 127.0.0.1 -U postgres -d template1 -f server/init.sql && \
	cd server && knex migrate:latest && cd ../ \
	psql -h 127.0.0.1 -U vippay -d vippay -f server/seed.sql

build_static:
	cd client && gulp build && \
	cd ../orders && gulp build && \
	cd ../partners && gulp build


