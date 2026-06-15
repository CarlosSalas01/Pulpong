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
  const [showAddTeamsPanel, setShowAddTeamsPanel] = useState(false);
  const [showRegenerateBracketModal, setShowRegenerateBracketModal] =
    useState(false);

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

  function hasPlayableWinnerSelected() {
    if (!tournament) return false;

    return tournament.rounds.some((round) =>
      round.some((match) => match.teamB && match.winner),
    );
  }

  function handleRegenerateBracketConfirm() {
    generateBracket();
    setShowRegenerateBracketModal(false);
    setShowAddTeamsPanel(false);
    setShowChampionCard(true);
  }

  function handleRequestRegenerateBracket() {
    if (!tournament) return;

    if (tournament.teams.length < 2) return;

    setShowRegenerateBracketModal(true);
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
        isChampionScreen={phase === "bracket" && !!tournament?.champion && showChampionCard}
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
                <div className="rounded-3xl p-4 ">
                  <span className="">
                    {/* El mix-blend-multiply hace que el fondo blanco se vuelva invisible */}
                    <img
                      src={PulpongLogo}
                      alt="Pulpong Logo"
                      className="h-64 w-auto"
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
                // value={tournamentName}
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
              <h2 className="mb-0.5 text-xl font-bold text-(--color-text)">
                Registrar equipos
              </h2>
              <p className="text-sm text-(--color-muted)">
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
                className="app-button-primary mt-2 w-full rounded-xl py-3 font-bold transition-all active:scale-[0.98]"
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
                    <h2 className="mb-0.5 text-xl font-bold text-(--color-text)">
                      Bracket
                    </h2>

                    <p className="text-sm text-(--color-muted)">
                      {tournament.teams.length} equipos · Ronda actual:{" "}
                      {tournament.rounds.length} de{" "}
                      {Math.ceil(Math.log2(tournament.teams.length))} aprox.
                    </p>

                    {hasPlayableWinnerSelected() && !tournament.champion && (
                      <p className="mt-1 text-xs font-semibold text-red-600">
                        Si agregas participantes, tendrás que regenerar el
                        bracket y se perderán los ganadores seleccionados.
                      </p>
                    )}
                  </div>
                  {tournament.champion && !showChampionCard && (
                    <button
                      onClick={handleViewChampion}
                      className="app-button-secondary shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors"
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

                {!tournament.champion && (
                  <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-4 shadow-xl">
                    <button
                      type="button"
                      onClick={() =>
                        setShowAddTeamsPanel((current) => !current)
                      }
                      className="flex w-full items-center justify-between gap-3 text-left"
                    >
                      <div>
                        <p className="font-bold text-(--color-text)">
                          ¿Faltó alguien?
                        </p>
                        <p className="text-sm text-(--color-muted)">
                          Agrega, edita o elimina participantes y después
                          actualiza los enfrentamientos.
                        </p>
                      </div>

                      <span className="rounded-full bg-(--color-primary) px-3 py-1 text-xs font-black text-(--color-on-primary)">
                        {showAddTeamsPanel ? "Cerrar" : "Agregar"}
                      </span>
                    </button>

                    {showAddTeamsPanel && (
                      <div className="mt-4 space-y-4 border-t border-(--color-border) pt-4">
                        <TeamForm onAdd={addTeam} error={error} />

                        <TeamList
                          teams={tournament.teams}
                          onRemove={removeTeam}
                          onEdit={editTeam}
                        />

                        <button
                          type="button"
                          onClick={handleRequestRegenerateBracket}
                          disabled={tournament.teams.length < 2}
                          className="app-button-primary w-full rounded-xl py-3 font-bold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Actualizar enfrentamientos
                        </button>

                        <p className="text-center text-xs text-(--color-muted)">
                          El bracket se regenerará usando la lista actual de
                          equipos.
                        </p>
                      </div>
                    )}
                  </div>
                )}
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

      {showRegenerateBracketModal && (
        <ConfirmModal
          title="Actualizar enfrentamientos"
          message={
            hasPlayableWinnerSelected()
              ? "Se regenerará el bracket con la lista actual de equipos. Los ganadores seleccionados se perderán. ¿Deseas continuar?"
              : "Se regenerará el bracket con la lista actual de equipos. ¿Deseas continuar?"
          }
          confirmLabel="Actualizar bracket"
          danger={hasPlayableWinnerSelected()}
          onConfirm={handleRegenerateBracketConfirm}
          onCancel={() => setShowRegenerateBracketModal(false)}
        />
      )}
    </div>
  );
}

export default App;
