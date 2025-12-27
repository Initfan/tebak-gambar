type PodiumCardProps = {
  rank: 1 | 2 | 3;
  data: {
    name: string;
    easy: number;
    medium: number;
    hard: number;
    totalTime: number;
  };
  big?: boolean;
};

const rankStyle = {
  1: {
    border: "border-yellow-400",
    badge: "bg-yellow-400 text-black",
    text: "text-yellow-400",
    crown: true,
  },
  2: {
    border: "border-slate-400",
    badge: "bg-slate-400 text-white",
    text: "text-slate-300",
    crown: false,
  },
  3: {
    border: "border-orange-600",
    badge: "bg-orange-600 text-white",
    text: "text-orange-500",
    crown: false,
  },
};

const PodiumCard = ({ rank, data, big }: PodiumCardProps) => {
  const style = rankStyle[rank];

  return (
    <div
      className={`flex flex-col items-center gap-2 ${
        big ? "scale-110" : "scale-95"
      }`}
    >
      <div className="relative">
        {style.crown && (
          <span className="material-symbols-outlined absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 text-3xl animate-bounce">
            crown
          </span>
        )}

        <div
          className={`rounded-full p-1 bg-background-light dark:bg-card-dark shadow-lg ${
            big ? "w-28 h-28 border-4" : "w-20 h-20 border-2"
          } ${style.border}`}
        >
          <div
            className="w-full h-full rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyfdCtJy_QUBdApcCeXNNZ-e6yRaIdKC9HcgV4tO5yR95PWvWpCCeD3sTSe4U8XHeYvE8HPvoLUZAf1_eDaMKokeiXkdSqIqIoBezHXXm8dgY4I9NR-issZX0q6FP-h0k5nMYX-ol_e893HmxVK_oq-ALKHH-TjMrldn3p1zSP6T9lAW0rOpZHITFZKRSYsn_Wma9QFO84NZw6MpjJpUGxFogUEmHCha7YZmXPvLGwlM3C2zNtBCb31ULB4amaUOLTo1dRlzsX5Ls')",
            }}
          />
        </div>

        <div
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full font-bold shadow-md border ${style.badge}`}
        >
          #{rank}
        </div>
      </div>

      <div className="text-center mt-2">
        <p className="font-bold truncate max-w-[100px]">{data.name}</p>
        <p className={`font-extrabold text-lg ${style.text}`}>
          {data.totalTime}s
        </p>
        <p className="text-xs text-gray-400">
          E {data.easy}s • M {data.medium}s • H {data.hard}s
        </p>
      </div>
    </div>
  );
};

export default PodiumCard;
