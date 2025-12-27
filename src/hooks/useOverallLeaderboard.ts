import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

type Level = "easy" | "medium" | "hard";

type RawLeaderboard = {
  userId: string;
  name: string;
  level: Level;
  time: string;
};

export type OverallLeaderboard = {
  userId: string;
  name: string;
  easy: number;
  medium: number;
  hard: number;
  totalTime: number;
};

export const useOverallLeaderboard = () => {
  const [data, setData] = useState<OverallLeaderboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "leaderboard"), (snap) => {
      const rows = snap.docs.map((d) => d.data()) as RawLeaderboard[];

      const map = new Map<string, OverallLeaderboard>();

      rows.forEach((r) => {
        if (!map.has(r.userId)) {
          map.set(r.userId, {
            userId: r.userId,
            name: r.name,
            easy: Infinity,
            medium: Infinity,
            hard: Infinity,
            totalTime: 0,
          });
        }

        map.get(r.userId)![r.level] = Number(r.time);
      });

      const result = Array.from(map.values())
        .filter(
          (u) =>
            u.easy !== Infinity && u.medium !== Infinity && u.hard !== Infinity
        )
        .map((u) => ({
          ...u,
          totalTime: u.easy + u.medium + u.hard,
        }))
        .sort((a, b) => a.totalTime - b.totalTime);

      setData(result);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { data, loading };
};
