const fs = require('fs');
const path = './node_modules/.bin/tsc';

fs.chmod(path, 0o755, (err) => {
  if (err) {
    console.error('Erro ao ajustar permissões:', err);
  } else {
    console.log('Permissões ajustadas com sucesso!');
  }
});
