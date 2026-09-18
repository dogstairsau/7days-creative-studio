"use client";

import { useMemo, useState } from "react";

import { useStudio } from "@/creative/studio-store";

export function WorkspacePanel() {
  const workspaces = useStudio((state) => state.workspaces);
  const activeWorkspaceId = useStudio((state) => state.activeWorkspaceId);
  const addWorkspace = useStudio((state) => state.addWorkspace);
  const setActiveWorkspace = useStudio((state) => state.setActiveWorkspace);
  const updateActiveWorkspace = useStudio((state) => state.updateActiveWorkspace);
  const [name, setName] = useState("");

  const active = useMemo(
    () =>
      workspaces.find((workspace) => workspace.id === activeWorkspaceId) ??
      workspaces[0] ??
      null,
    [workspaces, activeWorkspaceId],
  );

  function add() {
    if (!name.trim()) return;
    addWorkspace(name);
    setName("");
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
            value={active?.id ?? ""}
            onChange={(event) => setActiveWorkspace(event.target.value)}
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
              if (event.key === "Enter") add();
            }}
          />
          <button type="button" className="studio-button" onClick={add}>
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
              onChange={(event) => updateActiveWorkspace({ website: event.target.value })}
            />
          </label>

          <label>
            <span>Brand summary</span>
            <textarea
              className="studio-input studio-textarea"
              value={active.summary ?? ""}
              placeholder="What does this brand do and who is it for?"
              onChange={(event) => updateActiveWorkspace({ summary: event.target.value })}
            />
          </label>

          <label>
            <span>Visual direction</span>
            <textarea
              className="studio-input studio-textarea"
              value={active.visualDirection ?? ""}
              placeholder="Premium, minimal, architectural, playful..."
              onChange={(event) =>
                updateActiveWorkspace({ visualDirection: event.target.value })
              }
            />
          </label>

          <label>
            <span>Brand colours</span>
            <input
              className="studio-input"
              value={active.colours.join(", ")}
              placeholder="#111111, #F4F2EC"
              onChange={(event) =>
                updateActiveWorkspace({
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
                updateActiveWorkspace({
                  fonts: event.target.value
                    .split(",")
                    .map((value) => value.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>

          <label>
            <span>Avoid</span>
            <input
              className="studio-input"
              value={active.doNot.join(", ")}
              placeholder="Stock-photo look, gradients, busy backgrounds"
              onChange={(event) =>
                updateActiveWorkspace({
                  doNot: event.target.value
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
