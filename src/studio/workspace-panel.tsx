"use client";

import { useEffect, useMemo, useState } from "react";

import {
  createWorkspace,
  loadWorkspaces,
  saveWorkspaces,
  type ClientWorkspace,
} from "@/creative/workspaces";

export function WorkspacePanel() {
  const [workspaces, setWorkspaces] = useState<ClientWorkspace[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [name, setName] = useState("");

  useEffect(() => {
    const saved = loadWorkspaces();
    setWorkspaces(saved);
    setActiveId(saved[0]?.id ?? "");
  }, []);

  const active = useMemo(
    () => workspaces.find((workspace) => workspace.id === activeId) ?? null,
    [workspaces, activeId],
  );

  function addWorkspace() {
    if (!name.trim()) return;
    const workspace = createWorkspace(name);
    const next = [workspace, ...workspaces];
    setWorkspaces(next);
    setActiveId(workspace.id);
    setName("");
    saveWorkspaces(next);
  }

  function patchActive(patch: Partial<ClientWorkspace>) {
    if (!active) return;
    const next = workspaces.map((workspace) =>
      workspace.id === active.id
        ? { ...workspace, ...patch, updatedAt: Date.now() }
        : workspace,
    );
    setWorkspaces(next);
    saveWorkspaces(next);
  }

  return (
    <aside className="studio-panel studio-panel--workspace" aria-label="Client workspace">
      <div className="studio-panel__header">
        <div>
          <div className="studio-panel__eyebrow">Client workspace</div>
          <div className="studio-panel__title">
            {active ? active.name : "Create your first client"}
          </div>
        </div>

        {workspaces.length > 0 && (
          <select
            className="studio-input studio-input--select"
            value={activeId}
            onChange={(event) => setActiveId(event.target.value)}
            aria-label="Choose client workspace"
          >
            {workspaces.map((workspace) => (
              <option key={workspace.id} value={workspace.id}>
                {workspace.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {!active ? (
        <div className="studio-workspace-create">
          <input
            className="studio-input"
            value={name}
            placeholder="Client name"
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") addWorkspace();
            }}
          />
          <button type="button" className="studio-button" onClick={addWorkspace}>
            Add client
          </button>
        </div>
      ) : (
        <div className="studio-brand-grid">
          <label>
            <span>Website</span>
            <input
              className="studio-input"
              value={active.website ?? ""}
              placeholder="https://"
              onChange={(event) => patchActive({ website: event.target.value })}
            />
          </label>

          <label>
            <span>Brand summary</span>
            <textarea
              className="studio-input studio-textarea"
              value={active.summary ?? ""}
              placeholder="What does this brand do and who is it for?"
              onChange={(event) => patchActive({ summary: event.target.value })}
            />
          </label>

          <label>
            <span>Visual direction</span>
            <textarea
              className="studio-input studio-textarea"
              value={active.visualDirection ?? ""}
              placeholder="Premium, minimal, architectural, playful..."
              onChange={(event) => patchActive({ visualDirection: event.target.value })}
            />
          </label>

          <label>
            <span>Brand colours</span>
            <input
              className="studio-input"
              value={active.colours.join(", ")}
              placeholder="#111111, #F4F2EC"
              onChange={(event) =>
                patchActive({
                  colours: event.target.value
                    .split(",")
                    .map((value) => value.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>

          <label>
            <span>Fonts</span>
            <input
              className="studio-input"
              value={active.fonts.join(", ")}
              placeholder="Graphik, Inter"
              onChange={(event) =>
                patchActive({
                  fonts: event.target.value
                    .split(",")
                    .map((value) => value.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>
        </div>
      )}
    </aside>
  );
}
