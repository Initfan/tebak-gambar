import React from "react";
import { Link, useParams } from "react-router";
import type { Leaderboard } from "./Leaderboard";

interface ResultProps {
  totalQuestions: number;
  correct: number;
  time: string;
  starCount?: number;
  onReplay?: () => void;
  onHome?: () => void;
}

const Result: React.FC<ResultProps> = ({
  totalQuestions,
  correct,
  time,
  starCount = 4,
  onReplay,
  onHome,
}) => {
  const { level } = useParams();
  const name = localStorage.getItem("name");
  const leaderboard = JSON.parse(
    localStorage.getItem("leaderboard")!
  ) as Leaderboard[];

  const rank = leaderboard
    .filter((v) => v.level == level)
    .findIndex((v) => v.name == name);

  return (
    <div className="bg-background-dark text-white min-h-screen flex flex-col antialiased selection:bg-primary selection:text-white pb-3">
      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar flex flex-col w-full max-w-md mx-auto">
        {/* Top App Bar */}
        <header className=" top-0 z-50 flex items-center justify-between p-4 pb-2 bg-background-dark/95 backdrop-blur-sm border-b border-white/5">
          <Link
            to={"/level"}
            className="flex size-12 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 24 }}
            >
              arrow_back
            </span>
          </Link>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Hasil Permainan
          </h2>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center pt-8 pb-6 px-4">
          <h1 className="text-white tracking-light text-[32px] font-bold leading-tight text-center mb-6">
            Luar Biasa!
          </h1>

          {/* Circular Score Display */}
          <div className="relative flex flex-col items-center justify-center w-48 h-48 rounded-full border-4 border-surface-dark bg-linear-to-b from-[#1a2c35] to-[#111c22] shadow-2xl shadow-primary/10">
            <div
              className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent -rotate-45"
              style={{ clipPath: "circle(50%)" }}
            />
            <p className="text-white text-6xl font-black leading-none tracking-tighter mt-2">
              100
            </p>
            <p className="text-[#92b7c9] text-sm font-medium mt-1">
              Skor Akhir
            </p>

            {/* Stars */}
            <div className="absolute -bottom-4 flex gap-1 bg-surface-dark px-3 py-1.5 rounded-full shadow-lg border border-[#325567]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`material-symbols-outlined text-[18px] font-variation-settings-'FILL'-1 ${
                    i < starCount ? "text-primary filled" : "text-[#325567]"
                  }`}
                >
                  star
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Rating Summary Text */}
        <section className="px-4 text-center mb-8">
          <p className="text-[#92b7c9] text-base font-normal leading-normal">
            Kamu berhasil menjawab{" "}
            <span className="text-white font-bold">
              {correct} dari {totalQuestions}
            </span>{" "}
            pertanyaan dengan benar.
          </p>
        </section>

        {/* Detailed Stats Grid */}
        <section className="grid grid-cols-2 gap-3 px-4 mb-6">
          {/* Correct */}
          <div className="flex flex-col items-center gap-2 rounded-xl p-4 bg-surface-dark border border-white/5">
            <div className="p-3 flex items-center rounded-full bg-green-500/20 text-green-400">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 24 }}
              >
                trophy
              </span>
            </div>
            <p className="text-[#92b7c9] text-xs font-medium uppercase tracking-wider">
              Peringkat
            </p>
            <p className="text-white text-xl font-bold leading-tight">
              {rank + 1}
            </p>
          </div>

          {/* Time */}
          <div className="flex flex-col items-center gap-2 rounded-xl p-4 bg-surface-dark border border-white/5">
            <div className="p-3 flex items-center rounded-full bg-primary/20 text-primary">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 24 }}
              >
                timer
              </span>
            </div>
            <p className="text-[#92b7c9] text-xs font-medium uppercase tracking-wider">
              Waktu
            </p>
            <p className="text-white text-xl font-bold leading-tight">{time}</p>
          </div>
        </section>

        {/*Footer  */}
        <footer className="px-4 bg-background-dark/95 backdrop-blur-md border-t border-white/5 flex flex-col gap-3 z-50">
          <button
            onClick={onReplay}
            className="flex items-center justify-center w-full h-12 rounded-full bg-primary text-white font-bold text-base hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/25"
          >
            <span className="material-symbols-outlined mr-2 text-[20px]">
              replay
            </span>
            Main Lagi
          </button>

          <Link
            to={"leaderboard"}
            className="h-14 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-[#23333d] active:scale-[0.98] transition-all rounded-full flex items-center justify-center gap-3 border border-gray-100 dark:border-white/5 shadow-sm"
          >
            <span className="material-symbols-outlined text-yellow-500 text-[22px]">
              emoji_events
            </span>
            <span className="text-slate-700 dark:text-gray-200 font-semibold text-sm">
              Waktu Tercepat
            </span>
          </Link>

          <button
            onClick={onHome}
            className="flex items-center justify-center w-full h-12 rounded-full bg-transparent border border-[#325567] text-[#92b7c9] font-medium text-base hover:text-white hover:border-white/30 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined mr-2 text-[20px]">
              home
            </span>
            Kembali ke Beranda
          </button>
        </footer>
      </main>
    </div>
  );
};

export default Result;
