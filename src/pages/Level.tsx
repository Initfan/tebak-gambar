import { Link } from "react-router";
import LevelCard from "../components/LevelCard";

const Level: React.FC = () => {
  return (
    <div className="dark bg-background-dark min-h-screen text-slate-900 dark:text-white font-display antialiased">
      <div className="relative flex max-w-md mx-auto flex-col shadow-2xl">
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 dark:border-[#233c48] p-4 bg-background-light/95 dark:bg-[#111c22]/95">
          <Link
            to={".."}
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:text-white dark:hover:bg-surface-dark transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>

          <h2 className="flex-1 text-center dark:text-white pr-10 text-lg font-bold">
            Pilih Level
          </h2>
        </header>

        {/* Main */}
        <main className="flex-1 space-y-4 p-4 overflow-y-auto">
          <p className="text-center text-sm text-slate-500 dark:text-[#92b7c9]">
            Tantang diri Anda dengan berbagai tingkat kesulitan.
          </p>

          <LevelCard
            level="mudah"
            title="Mudah"
            description="Pemanasan otak dengan tebakan sederhana."
            icon="eco"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBy3sok8snaYij3KG1V-GIMZ_BRTKPDtx887uOfjvZ1BppDiibpgVAZJ4zN6L6ao0mXNymlUbZJ-1bRGf2ec9MKafB220bfOE2Ky4vxj1SKwY2Oa6cDUXHDNpIoKF6SsbHlGnrhEw-w3RnWNmxBdFVYBRxkZJR4uoVM6c2xjw0gviX2ul27Z0adOnewp5Dg3A3gfYCfBqA4xnQiy6bBYxUrPesXIHIavPjBq8J4JCpX0OGsWCyYd7UHpIVMolWwYDKUxKD_1gcSSEc"
            open
          />

          <LevelCard
            level="sedang"
            title="Sedang"
            description="Tantangan seru yang butuh ketelitian."
            icon="bolt"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDukcenyGzxm00xl9eJk-p-hAguRhU75M4FqYxUnzikkM8QngZ8MfgYw4zFR6AKNWg05BEBMggkXIl57QHHgnHx_HMqgwyDXaNRpse7rypWcVtZQ7NoQFXj5Edfb85H9VFmmuTlRmborEqTF5-Kuwkgm497k8gXaFAEGdxpxVfvKseDGUqnwMTzhGwIY4TG6mYGFiILlV9eM91bsRJ23rhGM7NJw8Wndqh_7BJ9y4O1CQjffy_hPXugPW9hoc5G-rZSkAaA3b_7gjY"
            locked
          />

          <LevelCard
            level="sulit"
            title="Sulit"
            description="Khusus ahli, siapkan mentalmu!"
            icon="local_fire_department"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCC2Iw251dJNOXoKDAXB117OmhQR2OAOBYfZvO0lr7kYkRtua1yMQ4KRHUuoDP0xi8GcMQ3-Wnj0Wd4ZfKIaHK3KJ17xy0WVKpoagi6Xfa9cRdafGVryk8bK02HFOK-OwVNoQuLtMPjjThP2yP4TvAB6_XNQ0dbKANcPBdgauDo7Cg7zV0ZUOOXcJxhEB7KzDfTajE9JCDUshWOg-ZsmEZcio4HkwwBi3y8uOOkIdk7rx3cfjrfHLxcpeE45N_ka_nxqWvOU7v-D7Y"
            locked
          />
        </main>
      </div>
    </div>
  );
};

export default Level;
