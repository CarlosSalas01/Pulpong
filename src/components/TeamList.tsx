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
    <ul className="space-y-2 mt-4">
      {teams.map((team, i) => (
        <li key={team.id}>
          {editingId === team.id ? (
            <div className="bg-neutral-800 border border-amber-500/50 rounded-lg p-3 space-y-2">
              <input
                autoFocus
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSaveEdit(); if (e.key === "Escape") cancelEdit(); }}
                placeholder="Nombre del equipo"
                className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-amber-500"
              />
              <input
                type="text"
                value={editPlayers}
                onChange={(e) => setEditPlayers(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSaveEdit(); if (e.key === "Escape") cancelEdit(); }}
                placeholder="Jugadores (separados por coma)"
                className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-amber-500"
              />
              {editError && (
                <p className="text-red-400 text-xs">{editError}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold py-1.5 rounded-lg text-sm transition-colors"
                >
                  Guardar
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white py-1.5 rounded-lg text-sm transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-amber-500 font-mono text-sm w-5 shrink-0">
                  {i + 1}.
                </span>
                <div className="min-w-0">
                  <p className="text-white font-medium truncate">{team.name}</p>
                  {team.players.length > 0 && (
                    <p className="text-neutral-500 text-xs truncate">
                      {team.players.join(", ")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-3 shrink-0">
                <button
                  onClick={() => startEdit(team)}
                  aria-label={`Editar ${team.name}`}
                  className="text-neutral-500 hover:text-amber-400 transition-colors text-sm px-1"
                >
                  ✏
                </button>
                <button
                  onClick={() => onRemove(team.id)}
                  aria-label={`Eliminar ${team.name}`}
                  className="text-neutral-500 hover:text-red-400 transition-colors text-lg leading-none"
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
