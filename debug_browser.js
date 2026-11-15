const { spawn, execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const server = spawn('cmd.exe', ['/c', 'npm.cmd', 'start', '--', '-p', '3095'], {
  stdio: 'pipe',
  detached: false
});

server.stdout.on('data', d => console.log('NEXT:', d.toString().trim()));
server.stderr.on('data', d => console.error('NEXT ERR:', d.toString().trim()));

async function run() {
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 1000));
    try {
      const res = await fetch('http://localhost:3095/');
      if (res.ok) {
        console.log('Server ready!');
        // Run chrome headless with console logging
        const cmd = `"${chromePath}" --headless=new --enable-logging=stderr --v=1 --virtual-time-budget=10000 http://localhost:3095/`;
        try {
          const out = execSync(cmd, { stdio: 'pipe' });
          console.log('CHROME OUT:', out.toString());
        } catch(err) {
          console.log('CHROME ERR:', err.stderr ? err.stderr.toString() : err.message);
        }
        server.kill();
        process.exit(0);
      }
    } catch(e) {}
  }
  server.kill();
  process.exit(1);
}
run();
