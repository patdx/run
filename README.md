# @patdx/run

This is a tool to run some script/command.

The goal is to have a command runner that is easy to integrate into various
build scripts, and automatically have nice CLI output (including prefixing, line
wrapping), and automatically have nice text file output, without having to worry
about Node streams, etc.

It's inspired by some difficulties I've had using Cordova CLI, sometimes it's
hard to find or detect an install error, I'd like to improve the quality and
detail of the logging so I can recognize and highlight errors/warnings.

It's still in progress, but at the moment, it can wrap the output to the
available space and preserve colors, etc.

```bash
stderr: Debugger listening on
stderr↳ ws://localhost:50312/
stderr↳ 3213da2c-e2ee-42ca-b9
stderr↳ e1-de7aa3e7793c
stderr: Debugger listening on
stderr↳ ws://localhost:50313/
stderr↳ 3213da2c-e2ee-42ca-b9
stderr↳ e1-de7aa3e7793c
stderr: For help, see:
stderr↳ https://nodejs.org/en
stderr↳ /docs/inspector
stdout: one line
stdout: reall long reall
stdout↳ reall sldkfjsd
stdout↳ lkjsdlkj fslkfklj
stdout↳ slkdjsdf lkjdfj
stdout↳ skldjf sljd
stdout: reall long this part
stdout↳ is red this part is
stdout↳ red this part is red
stdout↳ sldkfjsd lkjsdlkj
stdout↳ fslkfklj slkdjsdf
stdout↳ lkjdfj skldjf sljd
stdout:
stdout: one line
stdout: two line
stdout: three line
stdout:
stderr: stderr line
```

# Architecture

- Written in TypeScript.
- Using execa to handle the command running, because that is a nice,
  well-supported wrapper Node's exec functionality with detailed error messages,
  etc.
- Using microbundle to bundle all dependencies together so the final package has
  no dependencies (except Node).
- A UMD build is also included, but it's up to the user to provide all of the
  required Node libraries in this case.

# some other ideas I'd like to explore:

- handle the output in node-pty to sent window width info directly to the
  command being executed
- integrate with react-ink for layout
- make it easier to output to console and file at the same time
- support prefixed and non-prefixed modes
- later: Extend this runner to wrap around the cordova cli and other deploy
  scripts
