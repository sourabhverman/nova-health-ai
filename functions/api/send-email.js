export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    
    // Cloudflare Pages Functions securely access the env variables
    const RESEND_API_KEY = env.VITE_RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing Resend API Key in Cloudflare environment variables." }), { status: 500 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(body)
    });
    
    if (res.ok) {
      const data = await res.json();
      return new Response(JSON.stringify(data), { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      });
    } else {
      const errorPayload = await res.json();
      return new Response(JSON.stringify(errorPayload), { 
        status: res.status,
        headers: { "Content-Type": "application/json" } 
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Internal Server Error" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}