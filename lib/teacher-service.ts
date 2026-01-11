import { ref, get } from "firebase/database";
import { db } from "./firebase";
import { Teacher } from "@/types/teacher";

export const getTeachers = async (): Promise<Teacher[]> => {
  const teachersRef = ref(db, 'teachers');
  const snapshot = await get(teachersRef);

  if (snapshot.exists()) {
    const data = snapshot.val();
    if (Array.isArray(data)) {
      return data;
    }
    
    return Object.entries(data).map(([id, details]) => ({
      id,
      ...(details as Omit<Teacher, 'id'>),
    }));
  }
  
  return [];
};