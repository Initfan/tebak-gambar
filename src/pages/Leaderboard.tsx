import React from "react";
import { Link, useParams } from "react-router";

export type Leaderboard = {
  name: string;
  time: string;
  level: string;
};

const Leaderboard: React.FC = () => {
  const { level } = useParams();
  const leaderboard = JSON.parse(
    localStorage.getItem("leaderboard")!
  ) as Leaderboard[];

  const rank = leaderboard
    .filter((v) => v.level == level)
    .sort((a, b) => Number(a.time) - Number(b.time));

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-white min-h-screen">
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden mx-auto max-w-md shadow-2xl bg-background-light dark:bg-background-dark">
        {/* Top App Bar */}
        <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-divider">
          <Link
            to={"/level"}
            className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h2 className="text-lg font-bold leading-tight flex-1 text-center pr-10 tracking-tight">
            Waktu Tercepat
          </h2>
        </div>

        {/* Podium Section */}
        <div className="relative flex flex-col items-center justify-center pt-8 pb-6 px-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="flex items-end justify-center w-full gap-4 z-10">
            {/* Rank 2 */}
            {rank.length > 1 && (
              <div className="flex flex-col items-center gap-2 mb-4 cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-slate-300 dark:border-slate-500 p-1 bg-background-light dark:bg-card-dark shadow-lg">
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtVyzLjmN8X141JujIN7M1C3YD_i9Z0qw2xaEzfHEkvok0ilXwmdgw8gl7zK7X4Y3Q0ZbMnCU7QM5BaAoNd5wZxuGv2n1vXJQJCqaSE8k_xNrL2r8mEYLNk6Lqq4FnN80iaJqqqD4-Jje5t05sS3y_vAyGc2hkUpEj1fhtABtFiBoetj_1fCif2YXt2kI_iSpRLKETfDi0Dbd9kHUutvUulO6nZD8rSgkP8uuUZeSSgcIG1Bd5iqBkxTPijf1zTuwUnbAw3Sjgtzw')",
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md border border-background-dark">
                    #2
                  </div>
                </div>
                <div className="text-center mt-1">
                  <p className="font-bold text-sm truncate">{rank[1].name}</p>
                  <p className="text-primary font-bold text-base">
                    {rank[1].time}s
                  </p>
                </div>
              </div>
            )}

            {/* Rank 1 */}
            {rank.length > 0 && (
              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="relative">
                  <span className="material-symbols-outlined absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 text-3xl animate-bounce">
                    crown
                  </span>
                  <div className="w-28 h-28 rounded-full border-4 border-yellow-400 p-1 bg-background-light dark:bg-card-dark shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyfdCtJy_QUBdApcCeXNNZ-e6yRaIdKC9HcgV4tO5yR95PWvWpCCeD3sTSe4U8XHeYvE8HPvoLUZAf1_eDaMKokeiXkdSqIqIoBezHXXm8dgY4I9NR-issZX0q6FP-h0k5nMYX-ol_e893HmxVK_oq-ALKHH-TjMrldn3p1zSP6T9lAW0rOpZHITFZKRSYsn_Wma9QFO84NZw6MpjJpUGxFogUEmHCha7YZmXPvLGwlM3C2zNtBCb31ULB4amaUOLTo1dRlzsX5Ls')",
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-sm font-bold px-3 py-0.5 rounded-full shadow-md border-2 border-background-dark">
                    #1
                  </div>
                </div>
                <div className="text-center mt-2">
                  <p className="font-bold text-lg truncate">{rank[0].name}</p>
                  <p className="text-yellow-400 font-extrabold text-xl">
                    {rank[0].time}s
                  </p>
                </div>
              </div>
            )}

            {/* Rank 3 */}
            {rank.length > 2 && (
              <div className="flex flex-col items-center gap-2 mb-4 cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-orange-700/60 p-1 bg-background-light dark:bg-card-dark shadow-lg">
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZdpAJMGyziGTztyAOmyJLLkwItvA4ulhzt5pzK2TpNZljA6AGoVkNJQ7wZmWMouZN0QT-Z9UnCmcOLM11Z7fO6O6ZyAMhKeUqtSkhwS3ra6ID8Trc0EjjNvLt3Jx03mULOhBBHH1G_dIcpr5ohCWN8xzsmmdEMybId0_vXYv-aXuMnAWfUVIlOrNxfSCqrdBgcIPcR7YHBmIXocvp4-SW5YzAmONqN5QOEy77mu-g5Cnz8JaKjw5HoZQc1YmBdJr5JaNJcwNEFWg')",
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-700 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md border border-background-dark">
                    #3
                  </div>
                </div>
                <div className="text-center mt-1">
                  <p className="font-bold text-sm truncate">{rank[2].name}</p>
                  <p className="text-primary font-bold text-base">
                    {rank[2].time}s
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* List Peringkat */}
        {rank.length >= 4 && (
          <>
            {/* Section Header */}
            <div className="sticky top-16.25 z-40 bg-background-light dark:bg-background-dark pt-2 pb-2">
              <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight px-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  leaderboard
                </span>
                Peringkat Lainnya
              </h3>
            </div>
            <div className="flex flex-col gap-1 pb-32 px-4">
              {/* User card */}
              {rank.map(
                (v, i) =>
                  i > 2 && (
                    <div className="flex items-center gap-4 bg-white dark:bg-card-dark px-4 py-3 rounded-xl border border-gray-100 dark:border-divider shadow-sm">
                      <div className="text-slate-400 font-bold text-lg w-6 text-center">
                        4
                      </div>

                      <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <div
                          className="h-12 w-12 rounded-full bg-cover bg-center border"
                          style={{
                            backgroundImage:
                              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAjFSKDIvz5jtOpVKt1jtwUivdka7vd47lr-IMDx0Hfespe338Yt8hEV4MgEMDM28tOdTzzbfo7CfBVXdwuzKqcfLDbT7zWrKNu7ToV_0s8gQJFXDhdtHLDBweA5R68Rye3G-66xC4rjQMva55p7ZtzXnA4Jl93IL-WQkkmCzj9oahG5MxiuT0uDUhtpq0HgrSGSSLYBgSCM5okr_CFkEwk6ade-M21KAlc6ynevQlIAdkRKX559qzH7XQ0sJTVWB7bWzRKiTXha_U')",
                          }}
                        />
                        <div className="min-w-0">
                          <p className="font-medium truncate">{v.name}</p>
                        </div>
                      </div>

                      <p className="font-bold">{v.time}s</p>
                    </div>
                  )
              )}
            </div>
          </>
        )}

        {/* Floating Footer */}
        <div className="fixed inset-x-0 bottom-0 left-0 w-full max-w-md mx-auto bg-linear-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark dark:to-transparent pt-12 pb-8 px-4 flex justify-center z-50">
          <Link
            to={"/"}
            className="flex items-center justify-center gap-2 w-full bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">home</span>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
