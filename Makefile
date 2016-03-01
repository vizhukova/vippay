.PHONY: refresh_db, build_static

refresh_db:
	psql -h 127.0.0.1 -U postgres -d template1 -f server/drop.sql && \
	psql -h 127.0.0.1 -U postgres -d template1 -f server/init.sql && \
	psql -h 127.0.0.1 -U postgres -d vippay -f server/extensions.sql && \
	cd server && knex migrate:latest && \
	psql -h 127.0.0.1 -U vippay -d vippay -f seed.sql && \
	knex seed:run

build_static:
	cd client && gulp build && \
	cd ../orders && gulp build && \
	cd ../partners && gulp build


