export const WHATSAPP_NUMBER = "918079086274";
export const PHONE_DISPLAY  = "+91 80790 86274";
export const CONTACT_EMAIL  = "parthkhowal222@gmail.com";

// Optional WhatsApp Gateway API keys (e.g. UltraMsg.com) for 100% silent background WhatsApp sending
export const ULTRAMSG_INSTANCE_ID = ""; // e.g. "instance12345"
export const ULTRAMSG_TOKEN = "";       // e.g. "abcdef123456"

export interface WhatsAppData {
  [key: string]: string | undefined;
}

export function formatFormMessage(title: string, data: WhatsAppData): string {
  const formattedLines = Object.entries(data)
    .filter(([_, value]) => value && value.trim() !== "")
    .map(([key, value]) => `${key}: ${value?.trim()}`);

  return `${title}\n\n${formattedLines.join("\n")}`;
}

export function getWhatsAppUrl(title: string, data: WhatsAppData): string {
  const formattedLines = Object.entries(data)
    .filter(([_, value]) => value && value.trim() !== "")
    .map(([key, value]) => `*${key}:* ${value?.trim()}`);

  const message = `*${title}*\n\n${formattedLines.join("\n")}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function sendWhatsAppMessage(title: string, data: WhatsAppData): void {
  const encodedUrl = getWhatsAppUrl(title, data);
  window.open(encodedUrl, "_blank", "noopener,noreferrer");
}

export async function sendAutomatedForm(title: string, data: WhatsAppData): Promise<{ success: boolean; waUrl: string }> {
  const waUrl = getWhatsAppUrl(title, data);
  const formattedMessage = formatFormMessage(title, data);

  // 1. Silent Background Email Dispatch (FormSubmit.co + Web3Forms API)
  let emailSuccess = false;
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        _subject: title,
        _template: "table",
        _captcha: "false",
        "Form Type": title,
        "Details": formattedMessage,
        ...data,
      }),
    });

    const resData = await response.json();
    emailSuccess = resData.success === "true" || response.ok;
  } catch (error) {
    console.error("Automated email form error:", error);
  }

  // 2. Silent Background WhatsApp API Dispatch (if UltraMsg API key provided)
  if (ULTRAMSG_INSTANCE_ID && ULTRAMSG_TOKEN) {
    try {
      const params = new URLSearchParams();
      params.append("token", ULTRAMSG_TOKEN);
      params.append("to", WHATSAPP_NUMBER);
      params.append("body", formattedMessage);

      await fetch(`https://api.ultramsg.com/${ULTRAMSG_INSTANCE_ID}/messages/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });
    } catch (waErr) {
      console.error("Automated WhatsApp API error:", waErr);
    }
  }

  return { success: emailSuccess, waUrl };
}



