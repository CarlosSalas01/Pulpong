import { useState } from "react";
import type { Team } from "../models/tournament.types";

interface TeamListProps {
  teams: Team[];
  onRemove: (id: string) => void;
  onEdit: (id: string, name: string, players: string[]) => void;
}

export default function TeamList({ teams, onRemove, onEdit }: TeamListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPlayers, setEditPlayers] = useState("");
  const [editError, setEditError] = useState("");

  function startEdit(team: Team) {
    setEditingId(team.id);
    setEditName(team.name);
    setEditPlayers(team.players.join(", "));
    setEditError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditError("");
  }

  function handleSaveEdit() {
    if (!editName.trim()) {
      setEditError("El nombre no puede estar vacío.");
      return;
    }

    const isDuplicate = teams.some(
      (t) =>
        t.id !== editingId &&
        t.name.trim().toLowerCase() === editName.trim().toLowerCase(),
    );

    if (isDuplicate) {
      setEditError(`Ya existe un equipo llamado "${editName.trim()}".`);
      return;
    }

    const players = editPlayers
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    onEdit(editingId!, editName.trim(), players);
    setEditingId(null);
    setEditError("");
  }

  if (teams.length === 0) return null;

  return (
    <ul className="space-y-2">
      {teams.map((team, i) => (
        <li key={team.id}>
          {editingId === team.id ? (
            <div className="space-y-2 rounded-2xl border border-(--color-border-strong) bg-(--color-surface) p-3 shadow-lg">
              <input
                autoFocus
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit();
                  if (e.key === "Escape") cancelEdit();
                }}
                placeholder="Nombre del equipo"
                className="app-input w-full rounded-xl border px-3 py-2 text-sm"
              />

              <input
                type="text"
                value={editPlayers}
                onChange={(e) => setEditPlayers(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit();
                  if (e.key === "Escape") cancelEdit();
                }}
                placeholder="Jugadores separados por coma"
                className="app-input w-full rounded-xl border px-3 py-2 text-sm"
              />

              {editError && (
                <p className="text-xs font-semibold text-red-600">
                  {editError}
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="app-button-primary flex-1 rounded-xl py-2 text-sm font-bold transition-all active:scale-[0.98]"
                >
                  Guardar
                </button>

                <button
                  onClick={cancelEdit}
                  className="app-button-secondary flex-1 rounded-xl border py-2 text-sm font-semibold transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-2xl border border-(--color-border) bg-(--color-surface) px-3 py-3 shadow-sm transition-colors hover:border-(--color-border-strong)">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-sm font-black text-(--color-on-primary)">
                  {i + 1}
                </span>

                <div className="min-w-0">
                  <p className="truncate font-bold text-(--color-text)">
                    {team.name}
                  </p>

                  {team.players.length > 0 && (
                    <p className="truncate text-xs text-(--color-muted)">
                      {team.players.join(", ")}
                    </p>
                  )}
                </div>
              </div>

              <div className="ml-3 flex shrink-0 items-center gap-2">
                <button
                  onClick={() => startEdit(team)}
                  aria-label={`Editar ${team.name}`}
                  className="rounded-lg px-2 py-1 text-sm text-(--color-muted) transition-colors hover:bg-(--color-hover) hover:text-(--color-primary) border border-(--color-border)"
                >
                  Editar
                </button>

                <button
                  onClick={() => onRemove(team.id)}
                  aria-label={`Eliminar ${team.name}`}
                  className="rounded-lg px-2 py-1 text-lg leading-none text-(--color-muted) transition-colors hover:bg-red-600/10 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
