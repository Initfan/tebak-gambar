import React from "react";

type CategoryStatus = "active" | "new" | "locked";

interface CategoryCardProps {
  title: string;
  status: CategoryStatus;
  progressText?: string;
  image: string;
  showPlay?: boolean;
  isNew?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  status,
  progressText,
  image,
  showPlay,
  isNew,
}) => {
  const locked = status === "locked";

  return (
    <button
      disabled={locked}
      className={`group relative flex flex-col gap-3 rounded-2xl p-3 transition-all
        ${
          locked
            ? "bg-gray-100 dark:bg-[#152026] opacity-80 grayscale"
            : "bg-surface-light dark:bg-surface-dark hover:shadow-md active:scale-95 border border-transparent hover:border-primary/30"
        }`}
    >
      {isNew && (
        <span className="absolute -top-2 -right-2 z-30 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
          BARU
        </span>
      )}

      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        {showPlay && (
          <div className="absolute bottom-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            <span className="material-symbols-outlined text-[18px]">
              play_arrow
            </span>
          </div>
        )}

        {locked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
            <span className="material-symbols-outlined text-white">lock</span>
          </div>
        )}
      </div>

      <div className="px-1 text-left">
        <h3 className="text-base font-bold">{title}</h3>
        <p className="text-xs font-medium text-primary">
          {progressText ?? "Terkunci"}
        </p>
      </div>
    </button>
  );
};

export default CategoryCard;
