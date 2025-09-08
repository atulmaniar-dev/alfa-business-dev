// lib/parseForm.ts

import formidable, { Fields, Files } from 'formidable';
import { Readable } from 'stream';
import { NextRequest } from 'next/server';
import type { IncomingMessage } from 'http';

// Convert Web ReadableStream to Node.js Readable
async function readableWebToNode(webStream: ReadableStream<Uint8Array>): Promise<Readable> {
  const reader = webStream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) this.push(null);
      else this.push(value);
    },
  });
}

// Convert NextRequest to Node.js IncomingMessage
async function toNodeRequest(req: NextRequest): Promise<IncomingMessage> {
  if (!req.body) throw new Error('No body in NextRequest');

  const nodeBody = await readableWebToNode(req.body);
  const headers = Object.fromEntries(req.headers.entries());

  const nodeReq = Object.assign(nodeBody, {
    headers,
    method: req.method,
    url: req.url,
  });

  return nodeReq as unknown as IncomingMessage;
}

export async function parseFormData(req: NextRequest): Promise<{ fields: Fields; files: Files }> {
  const nodeReq = await toNodeRequest(req);

  const form = formidable({ multiples: true });

  return new Promise((resolve, reject) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
