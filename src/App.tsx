import { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import Bracket from "./components/Bracket";
import ChampionCard from "./components/ChampionCard";
import ConfirmModal from "./components/ConfirmModal";
import EmptyState from "./components/EmptyState";
import TeamForm from "./components/TeamForm";
import TeamList from "./components/TeamList";
import { useTournament } from "./hooks/useTournament";
// import BrandSelector from "./components/BrandSelector";
import PulpongLogo from "./assets/img/Pulpong.png";

import {
  defaultBeerBrand,
  isBeerBrandKey,
  type BeerBrandKey,
} from "./theme/beerBrandPalettes";

function App() {
  const [tournamentName, setTournamentName] = useState("Torneo Beer Pong");
  const [showResetModal, setShowResetModal] = useState(false);
  const [showChampionCard, setShowChampionCard] = useState(true);

  const [brand, setBrand] = useState<BeerBrandKey>(() => {
    const savedBrand = localStorage.getItem("pulpong-brand");

    if (savedBrand && isBeerBrandKey(savedBrand)) {
      return savedBrand;
    }

    return defaultBeerBrand;
  });

  useEffect(() => {
    document.documentElement.dataset.brand = brand;
    localStorage.setItem("pulpong-brand", brand);
  }, [brand]);

  const {
    tournament,
    phase,
    error,
    createTournament,
    addTeam,
    removeTeam,
    editTeam,
    generateBracket,
    selectWinner,
    clearWinner,
    advanceRound,
    resetTournament,
  } = useTournament();

  function handleResetConfirm() {
    resetTournament();
    setShowResetModal(false);
    setShowChampionCard(true);
  }

  function handleCreateTournament() {
    createTournament(tournamentName);
    setShowChampionCard(true);
  }

  function handleGenerateBracket() {
    generateBracket();
    setShowChampionCard(true);
  }

  function handleViewBracket() {
    setShowChampionCard(false);
  }

  function handleViewChampion() {
    setShowChampionCard(true);
  }

  return (
    <div className="min-h-screen app-bg transition-colors duration-300">
      <AppHeader
        tournamentName={tournament?.name}
        brand={brand}
        onBrandChange={setBrand}
        onReset={tournament ? () => setShowResetModal(true) : undefined}
      />

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* <div className="mb-6">
          <BrandSelector value={brand} onChange={setBrand} />
        </div> */}
        {/* FASE: SETUP */}
        {phase === "setup" && (
          <div
            key="setup"
            className="animate-fade-in flex flex-col items-center justify-center min-h-[70vh] gap-6"
          >
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <div className="rounded-3xl p-4 shadow-xl">
                  <span className="text-2xl">
                    {/* El mix-blend-multiply hace que el fondo blanco se vuelva invisible */}
                    <img
                      src={PulpongLogo}
                      alt="Pulpong Logo"
                      className="mix-blend-multiply"
                    />
                  </span>
                </div>
              </div>

              <h2 className="mb-1 text-3xl font-extrabold text-(--color-primary)">
                PULPONG
              </h2>

              <p className="text-sm text-(--color-muted)">
                Organiza tu torneo de BeerPong con la banda.
              </p>
            </div>

            <div className="w-full max-w-sm space-y-3 rounded-3xl border border-(--color-border) bg-(--color-surface) p-4 shadow-2xl">
              <input
                type="text"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                placeholder="Nombre del torneo"
                className="app-input w-full rounded-xl border px-4 py-3 text-lg font-semibold transition-colors"
              />

              <button
                onClick={handleCreateTournament}
                className="app-button-primary w-full rounded-xl py-3 text-lg font-extrabold shadow-lg transition-all active:scale-[0.98]"
              >
                Crear torneo
              </button>
            </div>
          </div>
        )}

        {/* FASE: REGISTRO DE EQUIPOS */}
        {phase === "teams" && tournament && (
          <div key="teams" className="animate-fade-in space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-0.5">
                Registrar equipos
              </h2>
              <p className="text-neutral-500 text-sm">
                {tournament.teams.length} equipo
                {tournament.teams.length !== 1 ? "s" : ""} registrado
                {tournament.teams.length !== 1 ? "s" : ""}
                {tournament.teams.length < 2 && " · necesitas al menos 2"}
                {tournament.teams.length >= 32 && " · máximo alcanzado"}
              </p>
            </div>

            <TeamForm onAdd={addTeam} error={error} />

            {tournament.teams.length > 0 ? (
              <TeamList
                teams={tournament.teams}
                onRemove={removeTeam}
                onEdit={editTeam}
              />
            ) : (
              <EmptyState
                icon="👥"
                title="Sin equipos todavía"
                description="Agrega al menos 2 equipos para comenzar."
              />
            )}

            {tournament.teams.length >= 2 && (
              <button
                onClick={handleGenerateBracket}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-colors mt-2"
              >
                Generar enfrentamientos
              </button>
            )}
          </div>
        )}

        {/* FASE: BRACKET */}
        {phase === "bracket" && tournament && (
          <div key="bracket" className="animate-fade-in space-y-6">
            {tournament.champion && showChampionCard ? (
              <ChampionCard
                champion={tournament.champion}
                onReset={() => setShowResetModal(true)}
                onViewBracket={handleViewBracket}
              />
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-0.5">
                      Bracket
                    </h2>
                    <p className="text-neutral-500 text-sm">
                      Ronda actual: {tournament.rounds.length} de{" "}
                      {Math.ceil(Math.log2(tournament.teams.length))} aprox.
                    </p>
                  </div>
                  {tournament.champion && !showChampionCard && (
                    <button
                      onClick={handleViewChampion}
                      className="shrink-0 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-300 transition-colors hover:border-amber-400 hover:bg-amber-500/20 hover:text-amber-200"
                    >
                      Ver campeon
                    </button>
                  )}
                </div>
                <Bracket
                  rounds={tournament.rounds}
                  champion={tournament.champion}
                  onSelectWinner={selectWinner}
                  onClearWinner={clearWinner}
                  onAdvanceRound={advanceRound}
                />
              </>
            )}
          </div>
        )}
      </main>

      {/* Modal de confirmación de reinicio */}
      {showResetModal && (
        <ConfirmModal
          title="Reiniciar torneo"
          message="Se perderán todos los datos del torneo actual. Esta acción no se puede deshacer."
          confirmLabel="Sí, reiniciar"
          danger
          onConfirm={handleResetConfirm}
          onCancel={() => setShowResetModal(false)}
        />
      )}
    </div>
  );
}

export default App;
