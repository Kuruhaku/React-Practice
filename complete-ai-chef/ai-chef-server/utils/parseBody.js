export async function parseBody(req) {
  let body = "";

  for await (const chunk of req) {
    body += chunk
  }

  try {
    const parseChunk = JSON.parse(body);
    return parseChunk;
  }

  catch (error) {
    console.log(error)
  }
}