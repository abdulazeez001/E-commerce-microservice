#!/usr/bin/env node
/**
 * @file Manages the run configuration for the whole application, defines the port used,
 * creates the http server and defines some listeners for the server.
 * @author Abdulazeez Shittu <oluwatobiadbulazeez@gmail.com> <07/05/2022 03:04pm>
 */

import http from 'http';
import config from '../config';
import App from '../app';

const app = App(config);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): number {
  const parsedPort = parseInt(val, 10);

  if (Number.isNaN(parsedPort)) {
    return Number(val);
  }

  // port number
  return parsedPort;
}

/**
 * Get port from environment and store in Express.
 */
const port: number = normalizePort(process.env.PORT || config.port);
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind: string = `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      config.debugger(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      config.debugger(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Create HTTP server.
 */
const server: http.Server = http.createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()!;
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  config.debugger(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
