const path = require('path');

module.exports = {
  entry: './script.js',  // Votre fichier d'entrée principal
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')  // Répertoire de sortie
  },
  mode: 'production',  // Mode de construction
  module: {
    rules: [
      {
        test: /\.css$/,  // Pour traiter les fichiers CSS
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
