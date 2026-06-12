export async function sendWelcomeEmail(toEmail: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY is not set in environment variables.');
    return { success: false, error: 'API key missing' };
  }

  const sender = {
    name: 'MOWP Work OS',
    email: 'no-reply@mowp.com',
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to MOWP</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #0b0f19;
            color: #f1f5f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .card {
            background-color: #0e1626;
            border: 1px solid #1e293b;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
          }
          .logo-container {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
          }
          .logo-box {
            height: 36px;
            width: 36px;
            border-radius: 8px;
            background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
            display: inline-block;
            margin-right: 12px;
          }
          .logo-text {
            font-size: 20px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 0.05em;
            display: inline-block;
            vertical-align: super;
            line-height: 36px;
          }
          h1 {
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            margin-top: 0;
            margin-bottom: 16px;
          }
          p {
            font-size: 16px;
            line-height: 1.6;
            color: #94a3b8;
            margin-top: 0;
            margin-bottom: 20px;
          }
          .highlight {
            color: #818cf8;
            font-weight: 600;
          }
          .button {
            display: inline-block;
            background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
            color: #ffffff !important;
            font-weight: 600;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            margin-top: 10px;
            margin-bottom: 24px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
          }
          .features {
            border-top: 1px solid #1e293b;
            padding-top: 24px;
            margin-top: 24px;
          }
          .feature-item {
            margin-bottom: 16px;
          }
          .feature-title {
            font-size: 14px;
            font-weight: 600;
            color: #e2e8f0;
            margin-bottom: 4px;
          }
          .feature-desc {
            font-size: 13px;
            color: #64748b;
            margin: 0;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #475569;
            margin-top: 32px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="logo-container">
              <div class="logo-box"></div>
              <span class="logo-text">MOWP</span>
            </div>
            <h1>Welcome to your new AI Work OS</h1>
            <p>Hello,</p>
            <p>Thank you for signing up for <span class="highlight">MOWP</span>! We've successfully set up your secure, fully isolated workspace.</p>
            <p>MOWP helps you turn scattered tasks, notes, and ideas into a clear, prioritized daily plan using advanced AI analysis. Here's what you can do next:</p>
            
            <div class="features">
              <div class="feature-item">
                <div class="feature-title">📥 Single Inbox Capture</div>
                <p class="feature-desc">Dump your tasks, notes, and ideas into a single place. The AI will automatically categorize and prioritize them.</p>
              </div>
              <div class="feature-item">
                <div class="feature-title">🗓️ Weekly Planning Board</div>
                <p class="feature-desc">Drag and drop items to organize your week and define clear next physical actions.</p>
              </div>
              <div class="feature-item">
                <div class="feature-title">⚡ Daily Focus & Reviews</div>
                <p class="feature-desc">Get automated morning digests and weekly Sunday reviews to keep your work on track.</p>
              </div>
            </div>

            <p style="margin-top: 24px; margin-bottom: 0;">Let's get started and make your planning effortless.</p>
          </div>
          <div class="footer">
            © 2026 MOWP. Built with Supabase & Gemini.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender,
        to: [{ email: toEmail }],
        subject: 'Welcome to MOWP - Your AI-Assisted Personal Work Management OS!',
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Failed to send welcome email via Brevo:', errorData);
      return { success: false, error: errorData };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    console.error('Error occurred while sending welcome email:', error);
    return { success: false, error: error.message };
  }
}
