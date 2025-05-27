#!/usr/bin/env node

import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import express from 'express';
import { parseArgs } from 'node:util';
import { createLightdashClient } from 'lightdash-client-typescript-fetch';
import { zodToJsonSchema } from 'zod-to-json-schema';
import {
  ListProjectsSchema,
  GetProjectSchema,
  ListSpacesSchema,
  ListChartsSchema,
  ListDashboardsSchema,
  GetCustomMetricsSchema,
  GetCatalogSchema,
  GetMetricsCatalogSchema,
  GetChartsAsCodeSchema,
  GetDashboardsAsCodeSchema,
  GetMetadataSchema,
  GetAnalyticsSchema,
  GetUserAttributesSchema,
} from './schemas.js';

const lightdashClient = createLightdashClient(
  process.env.LIGHTDASH_API_URL || 'https://app.lightdash.cloud',
  {
    headers: {
      Authorization: `ApiKey ${process.env.LIGHTDASH_API_KEY}`,
    },
  }
);

const server = new Server(
  {
    name: 'lightdash-mcp-server',
    version: '0.0.1',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'lightdash_list_projects',
        description: 'List all projects in the Lightdash organization',
        inputSchema: zodToJsonSchema(ListProjectsSchema),
      },
      {
        name: 'lightdash_get_project',
        description: 'Get details of a specific project',
        inputSchema: zodToJsonSchema(GetProjectSchema),
      },
      {
        name: 'lightdash_list_spaces',
        description: 'List all spaces in a project',
        inputSchema: zodToJsonSchema(ListSpacesSchema),
      },
      {
        name: 'lightdash_list_charts',
        description: 'List all charts in a project',
        inputSchema: zodToJsonSchema(ListChartsSchema),
      },
      {
        name: 'lightdash_list_dashboards',
        description: 'List all dashboards in a project',
        inputSchema: zodToJsonSchema(ListDashboardsSchema),
      },
      {
        name: 'lightdash_get_custom_metrics',
        description: 'Get custom metrics for a project',
        inputSchema: zodToJsonSchema(GetCustomMetricsSchema),
      },
      {
        name: 'lightdash_get_catalog',
        description: 'Get catalog for a project',
        inputSchema: zodToJsonSchema(GetCatalogSchema),
      },
      {
        name: 'lightdash_get_metrics_catalog',
        description: 'Get metrics catalog for a project',
        inputSchema: zodToJsonSchema(GetMetricsCatalogSchema),
      },
      {
        name: 'lightdash_get_charts_as_code',
        description: 'Get charts as code for a project',
        inputSchema: zodToJsonSchema(GetChartsAsCodeSchema),
      },
      {
        name: 'lightdash_get_dashboards_as_code',
        description: 'Get dashboards as code for a project',
        inputSchema: zodToJsonSchema(GetDashboardsAsCodeSchema),
      },
      {
        name: 'lightdash_get_metadata',
        description: 'Get metadata for a specific table in the data catalog',
        inputSchema: zodToJsonSchema(GetMetadataSchema),
      },
      {
        name: 'lightdash_get_analytics',
        description: 'Get analytics for a specific table in the data catalog',
        inputSchema: zodToJsonSchema(GetAnalyticsSchema),
      },
      {
        name: 'lightdash_get_user_attributes',
        description: 'Get organization user attributes',
        inputSchema: zodToJsonSchema(GetUserAttributesSchema),
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (!request.params) {
      throw new Error('Params are required');
    }

    switch (request.params.name) {
      case 'lightdash_list_projects': {
        const { data, error } = await lightdashClient.GET(
          '/api/v1/org/projects',
          {}
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      case 'lightdash_get_project': {
        const args = GetProjectSchema.parse(request.params.arguments);
        const { data, error } = await lightdashClient.GET(
          '/api/v1/projects/{projectUuid}',
          {
            params: { path: { projectUuid: args.projectUuid } },
          }
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      case 'lightdash_list_spaces': {
        const args = ListSpacesSchema.parse(request.params.arguments);
        const { data, error } = await lightdashClient.GET(
          '/api/v1/projects/{projectUuid}/spaces',
          {
            params: { path: { projectUuid: args.projectUuid } },
          }
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      case 'lightdash_list_charts': {
        const args = ListChartsSchema.parse(request.params.arguments);
        const { data, error } = await lightdashClient.GET(
          '/api/v1/projects/{projectUuid}/charts',
          {
            params: { path: { projectUuid: args.projectUuid } },
          }
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      case 'lightdash_list_dashboards': {
        const args = ListDashboardsSchema.parse(request.params.arguments);
        const { data, error } = await lightdashClient.GET(
          '/api/v1/projects/{projectUuid}/dashboards',
          {
            params: { path: { projectUuid: args.projectUuid } },
          }
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      case 'lightdash_get_custom_metrics': {
        const args = GetCustomMetricsSchema.parse(request.params.arguments);
        const { data, error } = await lightdashClient.GET(
          '/api/v1/projects/{projectUuid}/custom-metrics',
          {
            params: { path: { projectUuid: args.projectUuid } },
          }
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      case 'lightdash_get_catalog': {
        const args = GetCatalogSchema.parse(request.params.arguments);
        const { data, error } = await lightdashClient.GET(
          '/api/v1/projects/{projectUuid}/dataCatalog',
          {
            params: { path: { projectUuid: args.projectUuid } },
          }
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      case 'lightdash_get_metrics_catalog': {
        const args = GetMetricsCatalogSchema.parse(request.params.arguments);
        const { data, error } = await lightdashClient.GET(
          '/api/v1/projects/{projectUuid}/dataCatalog/metrics',
          {
            params: { path: { projectUuid: args.projectUuid } },
          }
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      case 'lightdash_get_charts_as_code': {
        const args = GetChartsAsCodeSchema.parse(request.params.arguments);
        const { data, error } = await lightdashClient.GET(
          '/api/v1/projects/{projectUuid}/charts/code',
          {
            params: { path: { projectUuid: args.projectUuid } },
          }
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      case 'lightdash_get_dashboards_as_code': {
        const args = GetDashboardsAsCodeSchema.parse(request.params.arguments);
        const { data, error } = await lightdashClient.GET(
          '/api/v1/projects/{projectUuid}/dashboards/code',
          {
            params: { path: { projectUuid: args.projectUuid } },
          }
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      case 'lightdash_get_metadata': {
        const args = GetMetadataSchema.parse(request.params.arguments);
        const { data, error } = await lightdashClient.GET(
          '/api/v1/projects/{projectUuid}/dataCatalog/{table}/metadata',
          {
            params: {
              path: {
                projectUuid: args.projectUuid,
                table: args.table,
              },
            },
          }
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      case 'lightdash_get_analytics': {
        const args = GetAnalyticsSchema.parse(request.params.arguments);
        const { data, error } = await lightdashClient.GET(
          '/api/v1/projects/{projectUuid}/dataCatalog/{table}/analytics',
          {
            params: {
              path: {
                projectUuid: args.projectUuid,
                table: args.table,
              },
            },
          }
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      case 'lightdash_get_user_attributes': {
        const { data, error } = await lightdashClient.GET(
          '/api/v1/org/attributes',
          {}
        );
        if (error) {
          throw new Error(
            `Lightdash API error: ${error.error.name}, ${error.error.message ?? 'no message'}`
          );
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.results, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${request.params.name}`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(errorMessage);
  }
});

async function startStdioServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Lightdash MCP Server running on stdio');
}

async function startHttpServer(port: number) {
  const app = express();
  app.use(express.json({ limit: '4mb' }));

  let transport: SSEServerTransport | undefined;

  app.get('/sse', async (_req, res) => {
    transport = new SSEServerTransport('/message', res);
    await server.connect(transport);
    console.error(
      `Lightdash MCP Server new SSE connection ${transport.sessionId}`
    );
  });

  app.post('/message', async (req, res) => {
    if (!transport) {
      res.status(404).send('Session not initialized');
      return;
    }
    await transport.handlePostMessage(req, res, req.body);
  });

  app.listen(port, () => {
    console.error(
      `Lightdash MCP Server running on http://localhost:${port}/sse`
    );
  });
}

async function main() {
  const { values } = parseArgs({ options: { port: { type: 'string' } } });
  const portValue = values.port;

  if (typeof portValue === 'string') {
    const port = parseInt(portValue, 10);
    if (Number.isNaN(port)) {
      throw new Error(`Invalid port: ${portValue}`);
    }
    if (port < 1024 || port > 65535) {
      throw new Error('Port must be between 1024 and 65535');
    }
    await startHttpServer(port);
  } else {
    await startStdioServer();
  }
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
