export const WHATSAPP_NUMBER = "918079086274";
export const PHONE_DISPLAY  = "+91 80790 86274";
export const CONTACT_EMAIL  = "parthkhowal222@gmail.com";

export interface WhatsAppData {
  [key: string]: string | undefined;
}

export function sendWhatsAppMessage(title: string, data: WhatsAppData): void {
  const formattedLines = Object.entries(data)
    .filter(([_, value]) => value && value.trim() !== "")
    .map(([key, value]) => `*${key}:* ${value?.trim()}`);

  const message = `*${title}*\n\n${formattedLines.join("\n")}`;
  const encodedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  
  window.open(encodedUrl, "_blank", "noopener,noreferrer");
}
