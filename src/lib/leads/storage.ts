import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { LeadRecord } from "./types";

const LEADS_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(LEADS_DIR, "leads.json");

export function isDevLeadStorageEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}

async function ensureLeadsFile(): Promise<LeadRecord[]> {
  await mkdir(LEADS_DIR, { recursive: true });

  try {
    const raw = await readFile(LEADS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as LeadRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveLeadToJson(lead: LeadRecord): Promise<void> {
  if (!isDevLeadStorageEnabled()) {
    return;
  }

  const leads = await ensureLeadsFile();
  leads.push(lead);
  await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}
