import { useState } from "react";
import { Link } from "react-router";

const Home: React.FC = () => {
  const [name, setName] = useState<string | null>(localStorage.getItem("name"));
  const [isEditing, setIsEditing] = useState(false);

  const saveName = (value: string) => {
    setName(value);
    localStorage.setItem("name", value);
    setIsEditing(false);
  };

  return (
    <div className="dark bg-background-dark font-display transition-colors  duration-200 antialiased selection:bg-primary/30 selection:text-primary min-h-vh">
      <div className="relative flex h-screen max-h-screen w-full py-3 flex-col overflow-hidden mx-auto max-w-md shadow-2xl">
        {/* Decorative Background */}
        <div className="absolute top-[-20%] left-[-10%] w-75 h-75 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-62.5 h-62.5 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full px-6 z-10">
          <div className="flex flex-col items-center gap-6 mb-8 w-full">
            {/* Logo */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-primary/40 rounded-3xl blur-xl transform group-hover:scale-110 transition-transform duration-500" />
              <div className="relative size-32 bg-linear-to-br from-surface-light to-blue-50 dark:from-surface-dark dark:to-background-dark rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 flex items-center justify-center overflow-hidden">
                {/* <span className="material-symbols-outlined text-primary text-[64px]">
                  extension
                </span> */}
                <img src="/icon/icon.png" alt="icon" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">
                Tebak Gambar
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium px-4 leading-relaxed">
                Tantang imajinasimu dan temukan <br /> kata di balik gambar.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="w-full px-6 pb-12 pt-4 z-10 flex flex-col gap-4">
          {/* Name Section */}
          {!name || isEditing ? (
            /* INPUT MODE */
            <div className="w-full flex gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-xl">
                    person
                  </span>
                </div>
                <input
                  defaultValue={name ?? ""}
                  className="block w-full h-14 pl-11 pr-4 rounded-xl
        bg-white dark:bg-surface-dark ring-1 ring-slate-200
        dark:ring-white/5 text-slate-900 dark:text-white
        text-sm font-medium outline-none"
                  placeholder="Masukkan nama kamu"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveName(e.currentTarget.value);
                    }
                  }}
                />
              </div>

              {/* Save Button */}
              <button
                onClick={() => {
                  const input = document.querySelector<HTMLInputElement>(
                    'input[placeholder="Masukkan nama kamu"]'
                  );
                  if (input?.value) saveName(input.value);
                }}
                className="h-14 px-5 rounded-xl bg-primary text-white
      font-semibold shadow-md hover:bg-sky-500 transition"
              >
                Simpan
              </button>
            </div>
          ) : (
            /* USER CARD */
            <div
              className="w-full h-16 rounded-2xl bg-white dark:bg-surface-dark
  border border-gray-100 dark:border-white/5 shadow-md
  flex items-center justify-between px-5"
            >
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">
                    person
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Nama Pemain</p>
                  <p className="font-bold text-slate-800 dark:text-white">
                    {name}
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(true)}
                className="text-slate-400 hover:text-primary transition"
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          )}

          {/* Start Game */}
          <button className="group relative w-full h-16 bg-primary hover:bg-sky-500 active:scale-[0.98] transition-all duration-200 rounded-2xl flex items-center justify-between px-6 shadow-lg shadow-primary/25 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

            <Link to={"/level"} className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[24px]">
                  play_arrow
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white text-lg font-bold leading-none">
                  Mulai Permainan
                </span>
              </div>
            </Link>

            <span className="material-symbols-outlined text-white/70 group-hover:translate-x-1 transition-transform text-[20px]">
              arrow_forward_ios
            </span>
          </button>

          {/* Secondary Buttons */}
          {/* <div className="grid grid-cols-2 gap-4">
            <button className="h-14 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-[#23333d] active:scale-[0.98] transition-all rounded-xl flex items-center justify-center gap-3 border border-gray-100 dark:border-white/5 shadow-sm">
              <span className="material-symbols-outlined text-yellow-500 text-[22px]">
                emoji_events
              </span>
              <span className="text-slate-700 dark:text-gray-200 font-semibold text-sm">
                Skor Tertinggi
              </span>
            </button>

            <button className="h-14 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-[#23333d] active:scale-[0.98] transition-all rounded-xl flex items-center justify-center gap-3 border border-gray-100 dark:border-white/5 shadow-sm">
              <span className="material-symbols-outlined text-slate-400 text-[22px]">
                settings
              </span>
              <span className="text-slate-700 dark:text-gray-200 font-semibold text-sm">
                Pengaturan
              </span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
