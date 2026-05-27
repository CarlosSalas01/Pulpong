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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm text-neutral-400 mb-1">
          Nombre del equipo <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Ej: Los Cerveceros"
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm text-neutral-400 mb-1">
          Jugadores{" "}
          <span className="text-neutral-600">
            (separados por coma, opcional)
          </span>
        </label>
        <input
          type="text"
          value={playersText}
          onChange={(e) => setPlayersText(e.target.value)}
          placeholder="Ej: Juan, María, Pedro"
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/50 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="w-full bg-linear-to-br from-red-700 to-red-900 hover:from-red-900 hover:to-red-700 text-white font-bold py-2.5 rounded-lg transition-colors"
      >
        + Agregar equipo
      </button>
    </form>
  );
}
