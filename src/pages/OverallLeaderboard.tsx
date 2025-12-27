import { Link } from "react-router";
import { useOverallLeaderboard } from "../hooks/useOverallLeaderboard";
import PodiumCard from "../components/PodiumCard";

const OverallLeaderboard = () => {
  const { data: rank, loading } = useOverallLeaderboard();

  console.log(rank);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 p-4 bg-background-light dark:bg-background-dark border-b">
          <h2 className="text-lg font-bold text-center">
            🏆 Peringkat Keseluruhan
          </h2>
        </div>

        {/* Podium */}
        <div className="flex justify-center gap-4 pt-8">
          {rank[1] && <PodiumCard rank={2} data={rank[1]} />}
          {rank[0] && <PodiumCard rank={1} data={rank[0]} big />}
          {rank[2] && <PodiumCard rank={3} data={rank[2]} />}
        </div>

        {/* List */}
        <div className="px-4 mt-8 space-y-2">
          {rank.map(
            (v, i) =>
              i > 2 && (
                <div
                  key={v.userId}
                  className="flex justify-between bg-white dark:bg-card-dark p-4 rounded-xl"
                >
                  <div className="flex gap-3">
                    <span className="font-bold w-6">{i + 1}</span>
                    <div>
                      <p className="font-semibold">{v.name}</p>
                      <p className="text-xs text-gray-400">
                        Easy {v.easy}s • Medium {v.medium}s • Hard {v.hard}s
                      </p>
                    </div>
                  </div>
                  <b>{v.totalTime}s</b>
                </div>
              )
          )}
        </div>

        {/* Footer */}
        <div className="p-4">
          <Link
            to="/"
            className="block text-center bg-primary text-white py-3 rounded-xl font-bold"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OverallLeaderboard;
