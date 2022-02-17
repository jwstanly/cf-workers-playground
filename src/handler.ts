function generateHtmlForCFProperties(
  data:
    | IncomingRequestCfProperties
    | {
        error: string
      },
) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hello!</title>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
          }
        </style>
      </head>
      <body>
        <h1>Hey there 👋</h1>
        <h3>Here's your <code>cf</code> object:</h3>
        <pre style="background-color:#CCC; border-radius: 0.3rem; padding:10px; margin:0;">
        ${JSON.stringify(data, null, 4)
          .split('\n')
          .map((x) => `<code>${x}</code>`)
          .join('</br>')}
        </pre>
        <footer style="margin-top:2rem">
          <span style="font-size:0.7rem;">Powered by Cloudflare Workers!<span>
        </footer>
      </body>
    </html>
  `
}

export async function handleRequest(event: FetchEvent) {
  const data =
    event.request.cf !== undefined
      ? event.request.cf
      : { error: 'The `cf` object is not available inside the preview.' }

  const html = generateHtmlForCFProperties(data)

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  })
}
