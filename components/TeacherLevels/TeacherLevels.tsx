interface Props {
  teacherLevels: string[];
  currentFilterLevel: string;
}

export default function TeacherLevels({
  teacherLevels,
  currentFilterLevel,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {teacherLevels.map((lvl) => {
        const isActive = lvl.startsWith(currentFilterLevel);

        return (
          <span
            key={lvl}
            className={`px-3 py-2 rounded-full text-sm font-medium border transition-colors ${
              isActive
                ? "bg-[#F4C550] border-[#F4C550] text-black"
                : "bg-transparent border-gray-200 text-black"
            }`}
          >
            #{lvl}
          </span>
        );
      })}
    </div>
  );
}
