import { useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import Bracket from "./components/Bracket";
import ChampionCard from "./components/ChampionCard";
import EmptyState from "./components/EmptyState";
import TeamForm from "./components/TeamForm";
import TeamList from "./components/TeamList";
import { useTournament } from "./hooks/useTournament";

function App() {
  const [tournamentName, setTournamentName] = useState("Torneo Beer Pong");
  const {
    tournament,
    phase,
    error,
    createTournament,
    addTeam,
    removeTeam,
    generateBracket,
    selectWinner,
    advanceRound,
    resetTournament,
  } = useTournament();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <AppHeader
        tournamentName={tournament?.name}
        onReset={tournament ? resetTournament : undefined}
      />

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* FASE: SETUP */}
        {phase === "setup" && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <span className="text-5xl">🍺</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-1">
                PULPONG
              </h2>
              <p className="text-neutral-400 text-sm">
                Organiza tu torneo de BeerPong con la banda.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-3">
              <input
                type="text"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                placeholder="Nombre del torneo"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 text-lg font-semibold transition-colors"
              />
              <button
                onClick={() => createTournament(tournamentName)}
                className="w-full bg-linear-to-br from-red-700 to-red-900 hover:from-red-900 hover:to-red-700 text-white font-extrabold py-3 rounded-xl text-lg transition-colors shadow-lg shadow-red-900/30"
              >
                Crear torneo
              </button>
            </div>
          </div>
        )}

        {/* FASE: REGISTRO DE EQUIPOS */}
        {phase === "teams" && tournament && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-0.5">
                Registrar equipos
              </h2>
              <p className="text-neutral-500 text-sm">
                {tournament.teams.length} equipo
                {tournament.teams.length !== 1 ? "s" : ""} registrado
                {tournament.teams.length !== 1 ? "s" : ""}
                {tournament.teams.length < 2 && " · necesitas al menos 2"}
              </p>
            </div>

            <TeamForm onAdd={addTeam} error={error} />

            {tournament.teams.length > 0 ? (
              <TeamList teams={tournament.teams} onRemove={removeTeam} />
            ) : (
              <EmptyState
                icon="👥"
                title="Sin equipos todavía"
                description="Agrega al menos 2 equipos para comenzar."
              />
            )}

            {tournament.teams.length >= 2 && (
              <button
                onClick={generateBracket}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-colors mt-2"
              >
                Generar enfrentamientos
              </button>
            )}
          </div>
        )}

        {/* FASE: BRACKET */}
        {phase === "bracket" && tournament && (
          <div className="space-y-6">
            {tournament.champion ? (
              <ChampionCard
                champion={tournament.champion}
                onReset={resetTournament}
              />
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-bold text-white mb-0.5">
                    Bracket
                  </h2>
                  <p className="text-neutral-500 text-sm">
                    Ronda actual: {tournament.rounds.length} de{" "}
                    {Math.ceil(Math.log2(tournament.teams.length))} aprox.
                  </p>
                </div>
                <Bracket
                  rounds={tournament.rounds}
                  champion={tournament.champion}
                  onSelectWinner={selectWinner}
                  onAdvanceRound={advanceRound}
                />
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
