.PHONY: all run-model run-app stop-model stop-app run-all stop-all model-status

# if having truble with git credentials, install git-credential-manager
# brew install --cask git-credential-manager

get-packages:
	git clone https://github.com/Parsa-Mir/lmorbits.git slm --verbose


run-model:
	cp -r ./secrets/serve/secrets ./slm/packages/serve/secrets
	cd slm/packages/serve && ${MAKE} init
	cd slm/packages/serve && ${MAKE} run

stop-model:
	cd slm/packages/serve && ${MAKE} stop


model-status:
	cd slm/packages/serve && ${MAKE} status

model-update: run-model 

run-app:
	cp -r ./secrets/backend/.env ./backend/
	cd backend && ${MAKE} run


stop-app:
	cd backend && ${MAKE} stop


run-all: run-model run-app 

stop-all:
	cd backend && ${MAKE} stop
	cd slm/packages/serve && ${MAKE} stop