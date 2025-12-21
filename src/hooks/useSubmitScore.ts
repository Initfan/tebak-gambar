import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

export const submitScore = async (
  name: string,
  level: string,
  time: number
) => {
  const ref = collection(db, "leaderboard");

  const q = query(ref, where("name", "==", name), where("level", "==", level));
  const snap = await getDocs(q);

  if (!snap.empty) {
    const existing = snap.docs[0];

    const oldTime = existing.data().time;

    if (time < oldTime) {
      await updateDoc(existing.ref, {
        time,
        createdAt: serverTimestamp(),
      });
    }

    return;
  }

  await addDoc(ref, {
    name,
    level,
    time,
    createdAt: serverTimestamp(),
  });
};
