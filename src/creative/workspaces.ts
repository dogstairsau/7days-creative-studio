"use client";

const KEY = "7d-creative-workspaces";

export type ClientWorkspace = {
  id: string;
  name: string;
  website?: string;
  summary?: string;
  colours: string[];
  fonts: string[];
  visualDirection?: string;
  doNot: string[];
  createdAt: number;
  updatedAt: number;
};

function safeParse(raw: string | null): ClientWorkspace[] {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw) as unknown;
    return Array.isArray(value) ? (value as ClientWorkspace[]) : [];
  } catch {
    return [];
  }
}

export function loadWorkspaces(): ClientWorkspace[] {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(KEY));
}

export function saveWorkspaces(workspaces: ClientWorkspace[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(workspaces));
}

export function createWorkspace(name: string): ClientWorkspace {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    colours: [],
    fonts: [],
    doNot: [],
    createdAt: now,
    updatedAt: now,
  };
}
