.PHONY: refresh_db, build_static

refresh_db:
	psql -h 192.168.1.48 -U postgres -d template1 -f server/drop.sql && \
	psql -h 192.168.1.48 -U postgres -d template1 -f server/init.sql && \
	cd server && knex migrate:latest

build_static:
	cd client && gulp build && \
	cd ../orders && gulp build && \
	cd ../partners && gulp build


