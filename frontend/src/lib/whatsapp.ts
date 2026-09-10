import emailjs from '@emailjs/browser';

export const WHATSAPP_NUMBER = "919784800833";
export const PHONE_DISPLAY  = "+91 97848 00833";
export const CONTACT_EMAIL  = "deepesh3052@gmail.com";

// Optional WhatsApp Gateway API keys (e.g. UltraMsg.com) for silent background WhatsApp sending
export const ULTRAMSG_INSTANCE_ID = ""; // e.g. "instance12345"
export const ULTRAMSG_TOKEN = "";       // e.g. "abcdef123456"

// EmailJS credentials for 100% direct, zero-spam Gmail delivery via official browser SDK
export const EMAILJS_SERVICE_ID  = "service_tf9b0lo";
export const EMAILJS_TEMPLATE_ID = "template_6ju4zft";
export const EMAILJS_PUBLIC_KEY  = "tckkT8QZp1MrQSKCL";

// Optional Web3Forms Access Key for instant secondary fallback (get free at web3forms.com)
export const WEB3FORMS_ACCESS_KEY = "";

export interface WhatsAppData {
  [key: string]: string | undefined;
}

/**
 * Returns formatted current timestamp in Indian Standard Time (IST).
 */
export function getISTTimestamp(): string {
  const now = new Date();
  return now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }) + ' (IST)';
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

export async function sendAutomatedForm(title: string, rawData: WhatsAppData): Promise<{ success: boolean; waUrl: string }> {
  const istTimestamp = getISTTimestamp();
  
  // Inject submission timestamp
  const data: WhatsAppData = {
    'Submission Time (IST)': istTimestamp,
    ...rawData,
  };

  const waUrl = getWhatsAppUrl(title, data);
  const formattedMessage = formatFormMessage(title, data);

  let emailSuccess = false;

  // 1A. Primary Dispatch: Official EmailJS Browser SDK (Direct, Instant, Zero-Redirect)
  if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
    try {
      const templateParams = {
        subject: title,
        to_email: CONTACT_EMAIL,
        message: formattedMessage,
        submission_time: istTimestamp,
        ...data,
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      if (result.status === 200 || result.text === "OK") {
        emailSuccess = true;
        console.log("EmailJS dispatch succeeded instantly (Status 200).");
      }
    } catch (err) {
      console.warn("EmailJS SDK dispatch encountered an issue, trying backup relays:", err);
    }
  }

  // 1B. Backup Dispatch: Web3Forms (Instant 2-second delivery)
  if (!emailSuccess && WEB3FORMS_ACCESS_KEY) {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `${title} - ${istTimestamp}`,
          from_name: "Shree Krishna Transport Portal",
          to: CONTACT_EMAIL,
          ...data,
        }),
      });

      const resJson = await response.json();
      if (resJson.success) {
        emailSuccess = true;
        console.log("Web3Forms backup dispatch succeeded.");
      }
    } catch (w3Err) {
      console.warn("Web3Forms backup error:", w3Err);
    }
  }

  // 1C. Backup Dispatch: FormSubmit.co Relay
  if (!emailSuccess) {
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `${title} [${istTimestamp}]`,
          _template: "table",
          _captcha: "false",
          "Form Type": title,
          "Submission Time (IST)": istTimestamp,
          "Full Details": formattedMessage,
          ...data,
        }),
      });

      const resData = await response.json();
      emailSuccess = resData.success === "true" || response.ok;
      console.log("FormSubmit relay dispatch status:", emailSuccess);
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




