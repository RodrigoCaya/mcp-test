import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Crear un servidor MCP
const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});

// Definir una herramienta
server.tool(
  "fetch-weather", // titulo de la herramienta
  "Tool to fetch the weather for a given city", // descripcion de la herramienta
  {
    city: z.string().describe("The name of the city to fetch the weather for"),
  },
  async ({ city }) => {
    return {
      content: [
        {
          type: "text",
          text: `El clima en ${city} es soleado con 25 grados Celsius.`,
        },
      ],
    };
  }
);

// Escuchar las conexiones del cliente
const transport = new StdioServerTransport();
await server.connect(transport);
