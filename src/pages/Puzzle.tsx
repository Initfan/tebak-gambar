import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import ResultPage from "./Result";
import type { Leaderboard } from "./Leaderboard";

type Puzzle = {
  id: number;
  image: string;
  suggested: string;
  answer: string;
};

type CategoryPerformance = {
  name: string;
  percentage: number;
};

interface Result {
  totalQuestions: number;
  correct: number;
  time: string;
  starCount?: number;
  categoryPerformance?: CategoryPerformance[];
}

const Puzzle = () => {
  const navigate = useNavigate();
  const { level } = useParams();
  const [timer, setTimer] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [result, setResult] = useState<Result>({
    totalQuestions: puzzles.length,
    correct: puzzles.length,
    starCount: 5,
    time: timer.toString(),
  });
  const [trying, setTrying] = useState(0);
  const [answer, setAnswer] = useState<string>("");
  const [answerStatus, setAnswerStatus] = useState<
    "salah" | "dikit-lagi" | "benar" | null
  >(null);

  useEffect(() => {
    fetch("/puzzle.json")
      .then((res) => res.json())
      .then((res) => setPuzzles(res[level ?? 0]));
  }, []);

  useEffect(() => {
    if (answerStatus != null) return;
    const clear = setInterval(() => {
      setTimer((p) => p + 1);
    }, 1000);
    return () => clearInterval(clear);
  }, [answerStatus]);

  const leaderboardUser = () => {
    const name = localStorage.getItem("name");
    const currentLeaderboard = JSON.parse(
      localStorage.getItem("leaderboard")!
    ) as Leaderboard[] | null;
    const leaderboard = { name, time: timer.toString(), level };

    if (!name) return;

    if (currentLeaderboard) {
      const userScore = currentLeaderboard.find(
        (v) => v.name == name && v.level == level
      );

      if (userScore) {
        const updateUserScore = currentLeaderboard
          .filter((v) => v.name == name && v.level != level)
          .concat(currentLeaderboard.filter((v) => v.name != name));

        localStorage.setItem(
          "leaderboard",
          JSON.stringify([...updateUserScore!, { ...leaderboard }])
        );
      } else
        localStorage.setItem(
          "leaderboard",
          JSON.stringify([...currentLeaderboard!, { ...leaderboard }])
        );
    } else
      localStorage.setItem("leaderboard", JSON.stringify([{ ...leaderboard }]));
  };

  const clearStatus = () =>
    setTimeout(() => {
      setAnswerStatus(null);
    }, 1500);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTrying((p) => p + 1);

    const correct = answer.toLowerCase() == puzzles[currentLevel].answer;
    const closeAnswer =
      puzzles[currentLevel].answer
        .split(" ")
        .filter((v) => v == answer.toLowerCase()).length > 0;

    if (correct && currentLevel + 1 == puzzles.length) {
      leaderboardUser();
    }

    if (correct) {
      setAnswerStatus("benar");
      clearStatus();
      setAnswer("");
      setTrying(0);
      setCurrentLevel((p) => p + 1);
      setResult((p) => ({
        ...p,
        correct: puzzles.length,
        starCount: 5,
        totalQuestions: puzzles.length,
        time: timer.toString(),
        categoryPerformance: [
          {
            name: puzzles[currentLevel].answer,
            percentage: trying,
          },
        ],
      }));
    } else if (closeAnswer) {
      setAnswerStatus("dikit-lagi");
      clearStatus();
    } else {
      setAnswerStatus("salah");
      clearStatus();
    }
  };

  const replayGame = () => {
    setCurrentLevel(0);
    setTimer(0);
  };

  return currentLevel == puzzles.length ? (
    <ResultPage
      {...result}
      onReplay={replayGame}
      onHome={() => navigate("/")}
    />
  ) : (
    <div className="dark font-display bg-background-dark text-slate-900 dark:text-white transition-colors duration-200">
      <div className="relative flex min-h-screen max-w-md mx-auto flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-background-dark/95 backdrop-blur-sm p-4">
          <Link
            to={".."}
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:text-white dark:hover:bg-surface-dark transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>

          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold dark:text-white">Level {level}</h2>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {currentLevel + 1}/{puzzles.length}
            </span>
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-1 dark:text-white">
              <span className="material-symbols-outlined">timer</span>
              <span>{timer}s</span>
            </div>
            <button
              onClick={() => setAnswer(puzzles[currentLevel].suggested)}
              className="flex size-10 items-center justify-center rounded-full text-primary hover:bg-slate-200 dark:hover:bg-surface-dark transition-colors"
            >
              <span className="material-symbols-outlined">lightbulb</span>
            </button>
          </div>
        </header>

        {/* Main */}
        {puzzles.length > 0 && (
          <>
            {answerStatus && (
              <motion.div
                animate={{
                  y: 150,
                  opacity: 1,
                }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="absolute z-10 inset-x-0 flex justify-center"
              >
                <img src={`/icon/${answerStatus}.png`} alt="" width={200} />
              </motion.div>
            )}
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col px-4 pb-4"
            >
              {/* Puzzle Image */}
              <section className="py-4">
                <div
                  className="aspect-square w-full rounded-xl bg-cover bg-center shadow-lg border border-slate-200 dark:border-surface-dark relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${puzzles[currentLevel].image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
              </section>

              {/* Input Area */}
              <section className="mt-auto flex flex-col gap-4">
                <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                  Apa jawaban dari gambar di atas?
                </p>

                <label className="relative">
                  <input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value.toUpperCase())}
                    placeholder="KETIK JAWABAN..."
                    disabled={answerStatus != null}
                    className="form-input h-14 w-full rounded-xl border dark:text-white border-slate-300 dark:border-slate-700
                  bg-white dark:bg-surface-dark px-4 text-center text-lg font-bold tracking-widest
                  placeholder:text-slate-400 dark:placeholder:text-slate-500
                  focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </label>

                <button
                  type="submit"
                  disabled={answerStatus != null}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-xl
                bg-primary text-white font-bold shadow-lg shadow-primary/25
                hover:bg-primary-dark active:scale-[0.98] transition-all"
                >
                  Kirim Jawaban
                  <span className="material-symbols-outlined text-[20px]">
                    send
                  </span>
                </button>
              </section>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Puzzle;
