.PHONY: refresh_db, build_static

refresh_db:
	psql -h 127.0.0.1 -U postgres -d template1 -f server/drop.sql && \
	psql -h 127.0.0.1 -U postgres -d template1 -f server/init.sql && \
	cd server && knex migrate:latest && cd ..

build_static:
	cd client && gulp build && \
	cd ../orders && gulp build && \127.0.0.1
	cd ../partners && gulp build


