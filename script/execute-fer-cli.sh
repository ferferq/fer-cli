args="$@"
CALLING_DIRECTORY="$PWD"

# Carrega o nvm e inicializa
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use 21.5.0

cd /home/fmartins/documents/PROJETOS/mydreams/fer-cli/dist

node app.js $args --folder-called="$CALLING_DIRECTORY"