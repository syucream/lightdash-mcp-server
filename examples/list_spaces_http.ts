import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Get and validate required environment variables
const apiKey = process.env.EXAMPLES_CLIENT_LIGHTDASH_API_KEY;
const apiUrl =
  process.env.EXAMPLES_CLIENT_LIGHTDASH_API_URL ??
  'https://app.lightdash.cloud';

if (!apiKey) {
  throw new Error(
    'EXAMPLES_CLIENT_LIGHTDASH_API_KEY environment variable is required'
  );
}

// Set environment variables for the HTTP server
process.env.LIGHTDASH_API_KEY = apiKey;
process.env.LIGHTDASH_API_URL = apiUrl;

async function main() {
  // Initialize MCP client
  const client = new Client(
    {
      name: 'lightdash-mcp-http-example-client',
      version: '1.0.0',
    },
    {
      capabilities: {},
    }
  );

  // Create HTTP transport to connect to the server
  const transport = new StreamableHTTPClientTransport(
    new URL('http://localhost:8080/mcp')
  );

  try {
    // Connect to the server
    await client.connect(transport);

    // List available tools
    await client.listTools();

    // Call list_spaces with a project UUID
    const projectUuid = process.env.EXAMPLES_CLIENT_LIGHTDASH_PROJECT_UUID;
    if (!projectUuid) {
      throw new Error(
        'EXAMPLES_CLIENT_LIGHTDASH_PROJECT_UUID environment variable is required'
      );
    }

    await client.callTool({
      name: 'lightdash_list_spaces',
      arguments: {
        projectUuid,
      },
    });
  } finally {
    // Close the connection
    await transport.close();
  }
}

main();
