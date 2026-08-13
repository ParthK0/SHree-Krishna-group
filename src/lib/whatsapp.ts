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

// Optional EmailJS keys for 100% direct, zero-redirect, zero-spam Gmail delivery
export const EMAILJS_SERVICE_ID  = ""; // e.g. "service_abc123"
export const EMAILJS_TEMPLATE_ID = ""; // e.g. "template_xyz789"
export const EMAILJS_PUBLIC_KEY  = ""; // e.g. "user_pk_12345"

export async function sendAutomatedForm(title: string, data: WhatsAppData): Promise<{ success: boolean; waUrl: string }> {
  const waUrl = getWhatsAppUrl(title, data);
  const formattedMessage = formatFormMessage(title, data);

  let emailSuccess = false;

  // 1A. Direct EmailJS API Dispatch (Zero-Spam, Zero-Redirect via personal Gmail)
  if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            subject: title,
            to_email: CONTACT_EMAIL,
            message: formattedMessage,
            ...data,
          },
        }),
      });

      emailSuccess = response.ok;
    } catch (err) {
      console.error("EmailJS dispatch error:", err);
    }
  } 
  
  // 1B. Fallback Direct Silent Email Dispatch (FormSubmit.co)
  if (!emailSuccess) {
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
      console.error("FormSubmit email form error:", error);
    }
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



