const execa = require('execa');
const {readFileSync} = require('fs');
const stripAnsi = require('strip-ansi');

const kcommand = readFileSync('../k.sh', 'utf-8');

function k() {

  const args = [kcommand, 'k'];

  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  return execa('eval', args, {shell: '/bin/zsh'}).then(({stdout}) => stdout);
}

k.stripColors = function () {
  return k.apply(undefined, arguments)
    .then(stdout => stripAnsi(stdout));
}

k.split = function splitToArray(stdout) {
  return stdout.split(/\s?\n/);
}

module.exports = k;
