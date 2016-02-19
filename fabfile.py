from fabric.api import *

env.roledefs['production'] = ['root@78.109.24.70']
env.roledefs['stage'] = ['root@188.166.116.177']

project_root = '/var/www/vippay'

def prepare_branch():
    local('git checkout master')
    local('git push -u origin master')


def update_code():
    with(cd(project_root)):
	run('git stash')
        run('git checkout master')
        run('git pull')


def build_static():
    with(cd(project_root)):
        run('make build_static')


def run_migration():
    with(cd(project_root + '/server')):
        run('knex migrate:latest')

    with(cd(project_root + '/server/payment_systems')):
        run('node change_systems.js')


def install_dependencies():
    with(cd(project_root)):
        run('npm install')


def restart_server():
    run('pm2 restart app')


@roles('production')
def show_logs():
    run('pm2 logs')


@roles('production')
def deploy_production():
    prepare_branch()
    update_code()
    install_dependencies()
    run_migration()
    build_static()
    restart_server()


@roles('stage')
def deploy_stage():
    prepare_branch()
    update_code()
    install_dependencies()
    run_migration()
    build_static()
    restart_server()
