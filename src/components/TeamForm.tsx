import { useState } from "react";

interface TeamFormProps {
  onAdd: (name: string, players: string[]) => void;
  error: string;
}

export default function TeamForm({ onAdd, error }: TeamFormProps) {
  const [teamName, setTeamName] = useState("");
  const [playersText, setPlayersText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const players = playersText
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    onAdd(teamName, players);
    setTeamName("");
    setPlayersText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-3xl border border-(--color-border) bg-(--color-surface) p-4 shadow-xl"
    >
      <div>
        <label className="mb-1 block text-sm font-semibold text-(--color-muted)">
          Nombre del equipo <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Ej: Los Cerveceros"
          className="app-input w-full rounded-xl border px-3 py-2 text-(--color-text) transition-colors"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-(--color-muted)">
          Jugadores{" "}
          <span className="font-normal opacity-70">
            separados por coma, opcional
          </span>
        </label>

        <input
          type="text"
          value={playersText}
          onChange={(e) => setPlayersText(e.target.value)}
          placeholder="Ej: Juan, María, Pedro"
          className="app-input w-full rounded-xl border px-3 py-2 text-(--color-text) transition-colors"
        />
      </div>

      {error && (
        <p className="rounded-xl border border-red-700/40 bg-red-600/10 px-3 py-2 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="app-button-primary w-full rounded-xl py-2.5 font-bold transition-all active:scale-[0.98]"
      >
        + Agregar equipo
      </button>
    </form>
  );
}
