const chalk = require('chalk');

console.log('one line');
console.log(
  `reall long reall reall sldkfjsd lkjsdlkj fslkfklj slkdjsdf lkjdfj skldjf sljd `
);
console.log(
  `reall long ${chalk.red(
    'this part is red this part is red this part is red'
  )} sldkfjsd lkjsdlkj fslkfklj slkdjsdf lkjdfj skldjf sljd `
);
console.warn('stderr line');
console.log(`
  one line
  two line
  three line
`);
