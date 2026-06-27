import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export interface LeadPayload {
  name: string;
  phone: string;
  locale: string;
  implantCount: number;
  brandId: string;
  brandName: string;
  crownId: string;
  crownName: string;
  addons: {
    boneGraft: boolean;
    sinusLift: boolean;
    xray: boolean;
  };
  totalPrice: number;
  discountPercentage: number;
  submittedAt: string;
}

async function saveLead(lead: LeadPayload): Promise<void> {
  const dataDir = path.join(process.cwd(), "data");
  const leadsFile = path.join(dataDir, "leads.json");

  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }

  let leads: LeadPayload[] = [];
  if (existsSync(leadsFile)) {
    try {
      const raw = await readFile(leadsFile, "utf-8");
      leads = JSON.parse(raw);
    } catch {
      leads = [];
    }
  }

  leads.push(lead);
  await writeFile(leadsFile, JSON.stringify(leads, null, 2), "utf-8");
}

async function sendWhatsAppNotification(lead: LeadPayload): Promise<void> {
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  const watiApiUrl = process.env.WATI_API_URL;
  const watiApiKey = process.env.WATI_API_KEY;
  const watiPhone = process.env.WATI_NOTIFICATION_PHONE;

  const addonsText = [
    lead.addons.boneGraft ? "Sümük artırma" : null,
    lead.addons.sinusLift ? "Sinus lift" : null,
    lead.addons.xray ? "CBCT rentgen" : null,
  ]
    .filter(Boolean)
    .join(", ") || "Yoxdur";

  const message =
    `🦷 *YENİ KALKULYATORdan LEAD*\n\n` +
    `👤 Ad: ${lead.name}\n` +
    `📞 Telefon: ${lead.phone}\n` +
    `🔢 İmplant sayı: ${lead.implantCount}\n` +
    `🏷 Marka: ${lead.brandName}\n` +
    `👑 Tac: ${lead.crownName}\n` +
    `➕ Əlavə xidmətlər: ${addonsText}\n` +
    `💰 Ümumi məbləğ: ${lead.totalPrice.toLocaleString()} ₼` +
    (lead.discountPercentage > 0 ? ` (${lead.discountPercentage}% endirim tətbiq edilib)` : "") +
    `\n📅 Tarix: ${new Date(lead.submittedAt).toLocaleString("az-AZ")}`;

  if (watiApiUrl && watiApiKey && watiPhone) {
    try {
      await fetch(`${watiApiUrl}/api/v1/sendSessionMessage/${watiPhone}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${watiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageText: message }),
      });
    } catch (err) {
      console.error("[leads] WATI notification failed:", err);
    }
    return;
  }

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message, lead }),
      });
    } catch (err) {
      console.error("[leads] Webhook notification failed:", err);
    }
    return;
  }

  // No integration configured — log for now
  console.log("[leads] New lead (no WhatsApp integration configured):\n" + message);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data = body as Partial<LeadPayload>;

  if (!data.name || !data.phone || !data.brandId || !data.crownId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }

  const lead: LeadPayload = {
    name: String(data.name).trim().slice(0, 100),
    phone: String(data.phone).trim().slice(0, 30),
    locale: String(data.locale || "az").slice(0, 5),
    implantCount: Math.max(1, Math.min(20, Number(data.implantCount) || 1)),
    brandId: String(data.brandId).slice(0, 50),
    brandName: String(data.brandName || data.brandId).slice(0, 100),
    crownId: String(data.crownId).slice(0, 50),
    crownName: String(data.crownName || data.crownId).slice(0, 100),
    addons: {
      boneGraft: Boolean(data.addons?.boneGraft),
      sinusLift: Boolean(data.addons?.sinusLift),
      xray: Boolean(data.addons?.xray),
    },
    totalPrice: Math.max(0, Number(data.totalPrice) || 0),
    discountPercentage: Math.max(0, Math.min(100, Number(data.discountPercentage) || 0)),
    submittedAt: new Date().toISOString(),
  };

  await saveLead(lead);
  await sendWhatsAppNotification(lead);

  return NextResponse.json({ success: true }, { status: 201 });
}
