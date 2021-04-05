import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '..');

moduleAlias.addAliases({
  '@entities': path.join(files, 'entities'),
  '@usecases': path.join(files, 'usecases'),
  '@shared': path.join(files, 'shared'),
  '@external': path.join(files, 'external'),
  '@presentation': path.join(files, 'presentation'),
  '@main': path.join(files, 'main'),
  '@config': path.join(files, 'config')
});
