"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { Teacher } from "@/types/teacher";
import TeacherCard from "@/components/TeacherCard/TeacherCard";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<Teacher[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      return;
    }

    const favoritesRef = ref(db, `users/${user.uid}/favorites`);

    const unsubscribe = onValue(favoritesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        const teachersList = Object.values(data) as Teacher[];
        setFavorites(teachersList);
      } else {
        setFavorites([]);
      }
      setLoadingData(false);
    });

    return () => unsubscribe();
  }, [user, authLoading]);

  if (authLoading || loadingData) {
    return (
      <section className="bg-[#F6F6F6] min-h-screen py-[96px]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl font-medium text-[#121417]">
            Loading favorites...
          </p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="bg-[#F6F6F6] min-h-screen py-[96px]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
          <p className="text-[#8a8a89] mb-8">
            Please log in to view your favorite teachers.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F6F6F6] min-h-screen py-[96px]">
      <div className="container max-w-[1184px] mx-auto px-4">
        {favorites.length === 0 ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">No favorites yet</h2>
            <p className="text-[#8a8a89]">
              Start looking for teachers and add them to your favorites list!
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-8 items-center">
            {favorites.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                currentFilterLevel=""
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
