const net = require('net');
const { spawn } = require('child_process');
const path = require('path');

const apiPort = Number(process.env.PORT || 5000);
let apiProcess;

function isPortInUse(port) {
  return new Promise(resolve => {
    const socket = net.createConnection({ port, host: '127.0.0.1' });
    socket.once('connect', () => { socket.end(); resolve(true); });
    socket.once('error', () => resolve(false));
  });
}

async function start() {
  if (await isPortInUse(apiPort)) {
    console.log(`API already listens on http://localhost:${apiPort}; using the existing process.`);
  } else {
    apiProcess = spawn(process.execPath, [path.join(__dirname, '..', 'server.js')], { stdio: 'inherit' });
  }
  const webProcess = spawn(process.execPath, [require.resolve('react-scripts/scripts/start')], { stdio: 'inherit' });
  const stop = () => { if (apiProcess) apiProcess.kill('SIGTERM'); webProcess.kill('SIGTERM'); };
  process.on('SIGINT', stop); process.on('SIGTERM', stop);
  webProcess.on('exit', code => { if (apiProcess) apiProcess.kill('SIGTERM'); process.exit(code || 0); });
}

start();
