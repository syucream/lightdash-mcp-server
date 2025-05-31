#!/usr/bin/env node

import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import crypto from 'crypto';
import { startHttpServer } from './server.js';
import { server } from './mcp.js';

let httpPort: number | null = null;
const args = process.argv.slice(2);
const portIndex = args.indexOf('-port');

if (portIndex !== -1 && args.length > portIndex + 1) {
  const portValue = args[portIndex + 1];
  const parsedPort = parseInt(portValue, 10);
  if (isNaN(parsedPort)) {
    console.error(
      `Invalid port number provided for -port: "${portValue}". Must be a valid number. Exiting.`
    );
    process.exit(1);
  } else {
    httpPort = parsedPort;
  }
} else if (portIndex !== -1 && args.length <= portIndex + 1) {
  console.error(
    'Error: -port option requires a subsequent port number. Exiting.'
  );
  process.exit(1);
}

if (httpPort !== null) {
  const httpTransport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => crypto.randomUUID(),
    enableJsonResponse: true,
  });
  server.connect(httpTransport);
  startHttpServer(httpTransport, httpPort);

  console.log(
    `[INFO] MCP Server is listening on http://localhost:${httpPort}/mcp`
  );
  await new Promise<void>(() => {}); // Keep process alive
} else {
  const stdioTransport = new StdioServerTransport();
  server.connect(stdioTransport);
}
