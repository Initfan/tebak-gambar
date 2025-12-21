import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import type { Leaderboard } from "../pages/Leaderboard";

export const useLeaderboard = (level: string) => {
  const [data, setData] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = collection(db, "leaderboard");

    const q = query(
      ref,
      where("level", "==", level),
      orderBy("time", "asc"),
      limit(10)
    );

    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Leaderboard[];

      setData(docs);
      setLoading(false);
    });

    return () => unsub();
  }, [level]);

  return { data, loading };
};
