export const WHATSAPP_NUMBER = "918079086274";
export const PHONE_DISPLAY  = "+91 80790 86274";
export const CONTACT_EMAIL  = "parthkhowal222@gmail.com";

export interface WhatsAppData {
  [key: string]: string | undefined;
}

export function formatFormMessage(title: string, data: WhatsAppData): string {
  const formattedLines = Object.entries(data)
    .filter(([_, value]) => value && value.trim() !== "")
    .map(([key, value]) => `${key}: ${value?.trim()}`);

  return `${title}\n\n${formattedLines.join("\n")}`;
}

export function sendWhatsAppMessage(title: string, data: WhatsAppData): void {
  const formattedLines = Object.entries(data)
    .filter(([_, value]) => value && value.trim() !== "")
    .map(([key, value]) => `*${key}:* ${value?.trim()}`);

  const message = `*${title}*\n\n${formattedLines.join("\n")}`;
  const encodedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  
  window.open(encodedUrl, "_blank", "noopener,noreferrer");
}

export function sendEmailNotification(title: string, data: WhatsAppData): void {
  const bodyText = formatFormMessage(title, data);
  const subject = encodeURIComponent(title);
  const body = encodeURIComponent(bodyText);
  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  
  // Triggers client email app with pre-filled content
  window.location.href = mailtoUrl;
}

export function sendDualFormSubmission(title: string, data: WhatsAppData): void {
  // 1. Open WhatsApp tab with formatted message
  sendWhatsAppMessage(title, data);

  // 2. Also trigger email client fallback or notification
  setTimeout(() => {
    sendEmailNotification(title, data);
  }, 600);
}

