type PaginationProps = {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
};

export function Pagination({ page, hasNext, hasPrev, onNext, onPrev }: PaginationProps){
  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white disabled:opacity-50"
      >
        ⬅️ Anterior
      </button>

      <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Página {page}
      </span>

      <button
        onClick={onNext}
        disabled={!hasNext}
        className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white disabled:opacity-50"
      >
        Siguiente ➡️
      </button>
    </div>
  );
};

