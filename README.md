[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/syucream-lightdash-mcp-server-badge.png)](https://mseep.ai/app/syucream-lightdash-mcp-server)

# lightdash-mcp-server
[![smithery badge](https://smithery.ai/badge/@syucream/lightdash-mcp-server)](https://smithery.ai/server/@syucream/lightdash-mcp-server)
[![npm version](https://badge.fury.io/js/lightdash-mcp-server.svg)](https://badge.fury.io/js/lightdash-mcp-server)

A [MCP(Model Context Protocol)](https://www.anthropic.com/news/model-context-protocol) server that accesses to [Lightdash](https://www.lightdash.com/).

This server provides MCP-compatible access to Lightdash's API, allowing AI assistants to interact with your Lightdash data through a standardized interface.

<a href="https://glama.ai/mcp/servers/e1gbb6sflq">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/e1gbb6sflq/badge" alt="Lightdash Server MCP server" />
</a>

## Features

Available tools:

- `list_projects` - List all projects in the Lightdash organization
- `get_project` - Get details of a specific project
- `list_spaces` - List all spaces in a project
- `list_charts` - List all charts in a project
- `list_dashboards` - List all dashboards in a project
- `get_custom_metrics` - Get custom metrics for a project
- `get_catalog` - Get catalog for a project
- `get_metrics_catalog` - Get metrics catalog for a project
- `get_charts_as_code` - Get charts as code for a project
- `get_dashboards_as_code` - Get dashboards as code for a project

## Quick Start

### Installation

#### Installing via Smithery

To install Lightdash MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@syucream/lightdash-mcp-server):

```bash
npx -y @smithery/cli install lightdash-mcp-server --client claude
```

#### Manual Installation
```bash
npm install lightdash-mcp-server
```

### Configuration

- `LIGHTDASH_API_KEY`: Your Lightdash PAT
- `LIGHTDASH_API_URL`: The API base URL

### Usage

The lightdash-mcp-server supports two transport modes: **Stdio** (default) and **HTTP**.

#### Stdio Transport (Default)

1. Start the MCP server:

```bash
npx lightdash-mcp-server
```

2. Edit your MCP configuration json:
```json
...
    "lightdash": {
      "command": "npx",
      "args": [
        "-y",
        "lightdash-mcp-server"
      ],
      "env": {
        "LIGHTDASH_API_KEY": "<your PAT>",
        "LIGHTDASH_API_URL": "https://<your base url>"
      }
    },
...
```

#### HTTP Transport (Streamable HTTP)

1. Start the MCP server in HTTP mode:

```bash
npx lightdash-mcp-server -port 8080
```

This starts the server using StreamableHTTPServerTransport, making it accessible via HTTP at `http://localhost:8080/mcp`.

2. Configure your MCP client to connect via HTTP:

**For Claude Desktop and other MCP clients:**

Edit your MCP configuration json to use the `url` field instead of `command` and `args`:

```json
...
    "lightdash": {
      "url": "http://localhost:8080/mcp"
    },
...
```

**For programmatic access:**

Use the streamable HTTP client transport:
```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const client = new Client({
  name: 'my-client',
  version: '1.0.0'
}, {
  capabilities: {}
});

const transport = new StreamableHTTPClientTransport(
  new URL('http://localhost:8080/mcp')
);

await client.connect(transport);
```

**Note:** When using HTTP mode, ensure the environment variables `LIGHTDASH_API_KEY` and `LIGHTDASH_API_URL` are set in the environment where the server is running, as they cannot be passed through MCP client configuration.

See `examples/list_spaces_http.ts` for a complete example of connecting to the HTTP server programmatically.

## Development

### Available Scripts

- `npm run dev` - Start the server in development mode with hot reloading (stdio transport)
- `npm run dev:http` - Start the server in development mode with HTTP transport on port 8080
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run linting checks (ESLint and Prettier)
- `npm run fix` - Automatically fix linting issues
- `npm run examples` - Run the example scripts

### Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests and linting: `npm run lint`
4. Commit your changes
5. Push to the branch
6. Create a Pull Request
