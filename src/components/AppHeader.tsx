import RedCupIcon from "./RedCupIcon";

interface AppHeaderProps {
  tournamentName?: string;
  onReset?: () => void;
}

export default function AppHeader({ tournamentName, onReset }: AppHeaderProps) {
  return (
    <header className="bg-neutral-900 border-b border-amber-600/30 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <RedCupIcon className="h-5 w-5" />
        <div>
          <h1 className="text-amber-400 font-bold text-lg leading-tight">
            PULPONG
          </h1>
          {tournamentName && (
            <p className="text-neutral-400 text-xs leading-tight truncate max-w-45:">
              {tournamentName}
            </p>
          )}
        </div>
      </div>
      {onReset && (
        <button
          onClick={onReset}
          className="text-xs text-red-400 border border-red-800 hover:bg-red-900/30 px-3 py-1.5 rounded-lg transition-colors"
        >
          Reiniciar
        </button>
      )}
    </header>
  );
}
