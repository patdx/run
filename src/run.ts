import { execaNode } from 'execa';
import windowSize from 'window-size';
import { Transform } from 'stream';
import split2 from 'split2';
import os from 'os';
import wrapAnsi from 'wrap-ansi';

const prefix = (prefix: string) => {
  return new Transform({
    transform(chunk, _encoding, callback) {
      const fullWidth = windowSize?.width;

      // if window size is available, prepare into multiple lines

      const content = chunk.toString();

      const contentLines = (() => {
        if (fullWidth) {
          const prefixWidth = prefix.length + 2;
          const contentMaxWidth = fullWidth - prefixWidth;

          return wrapAnsi(content, contentMaxWidth, {
            hard: true,
          }).split('\n');
          // joined by /n so we just undo it
          // https://github.com/chalk/wrap-ansi/blob/master/index.js#L215
        } else {
          // if it does not exist, we may be in a no-shell environment like Now builder
          return [content];
        }
      })();

      contentLines.forEach((line, index) => {
        this.push(`${prefix}${index === 0 ? ': ' : '↳ '}${line}${os.EOL}`);
      });

      callback();
    },
  });
};

export async function node(scriptPath: string) {
  const myProcess = execaNode(scriptPath, {
    buffer: false,
    env: { FORCE_COLOR: '2' },
  });

  // assert(myProcess.stdout);

  myProcess?.stdout?.pipe(split2()).pipe(prefix('stdout')).pipe(process.stdout);

  myProcess?.stderr?.pipe(split2()).pipe(prefix('stderr')).pipe(process.stderr);

  await myProcess;

  console.log('DONE');
}
