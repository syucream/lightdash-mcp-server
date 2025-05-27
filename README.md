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

1. Start the MCP server.

Directly:
```bash
npx lightdash-mcp-server
```
Specify a port with `--port` to expose a streamable HTTP endpoint instead of
stdio. Ports must be between 1024 and 65535:

```bash
npx lightdash-mcp-server --port 3000
```
Or, run the installed module with node.

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

## Development

### Available Scripts

- `npm run dev` - Start the server in development mode with hot reloading
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
