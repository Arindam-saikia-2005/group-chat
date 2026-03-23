export default function SidebarSkeleton() {
  return (
    <div>
      <div className="p-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 animate-pulse"
          >
            <div className="w-11 h-11 rounded-full bg-gray-600"></div>

            <div className="flex flex-col gap-2">
              <div className="w-32 h-3 bg-gray-600 rounded"></div>
              <div className="w-20 h-2 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
