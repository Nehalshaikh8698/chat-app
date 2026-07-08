import { Users } from "lucide-react";

const SKELETON_COUNT = 8;

const SidebarSkeleton = () => {
  //////////////////////////////////////////////////////
  // Skeleton Items
  //////////////////////////////////////////////////////

  const skeletonUsers = Array.from({
    length: SKELETON_COUNT,
  });

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <aside
      className="
        h-full
        w-20
        lg:w-80
        border-r border-base-300
        flex flex-col
        animate-pulse
      "
    >
      {/* Header */}
      <div className="border-b border-base-300 p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />

          <span className="hidden lg:block font-semibold">
            Contacts
          </span>
        </div>

        {/* Search Skeleton */}
        <div className="hidden lg:block mt-5">
          <div className="skeleton h-10 w-full rounded-lg" />
        </div>

        {/* Online Toggle Skeleton */}
        <div className="hidden lg:flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="skeleton size-4 rounded-sm" />
            <div className="skeleton h-4 w-28" />
          </div>

          <div className="skeleton h-4 w-12" />
        </div>
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto py-2">
        {skeletonUsers.map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-4 py-3"
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="skeleton size-12 rounded-full" />

              {/* Online Indicator */}
              <div className="absolute bottom-0 right-0 skeleton size-3 rounded-full" />
            </div>

            {/* User Info */}
            <div className="hidden lg:flex flex-1 flex-col gap-2">
              <div className="skeleton h-4 w-32" />
              <div className="skeleton h-3 w-20" />
              <div className="skeleton h-3 w-12" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;