import { useNavigate } from "react-router";

interface LevelCardProps {
  title: string;
  description: string;
  level: "mudah" | "sedang" | "sulit";
  icon: string;
  image: string;
  open?: boolean;
  locked?: boolean;
}

const LevelCard: React.FC<LevelCardProps> = ({
  title,
  description,
  level,
  icon,
  image,
  open = false,
  locked = false,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/level/" + level)}
      className={`relative rounded-xl p-4 bg-white dark:bg-[#192b33] border dark:border-[#233c48] cursor-pointer
      ${locked ? "opacity-80" : ""}`}
    >
      <div className="flex gap-4">
        <div
          className={`h-24 w-24 rounded-lg bg-cover bg-center ${!open ? "grayscale" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="h-full w-full flex items-end justify-end bg-linear-to-t from-black/40 p-1">
            <span className="material-symbols-outlined text-white">{icon}</span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-[#92b7c9]">
            {description}
          </p>

          <span className="text-xs mt-5 text-blue-500">10 gambar</span>
        </div>
      </div>
    </div>
  );
};

export default LevelCard;
