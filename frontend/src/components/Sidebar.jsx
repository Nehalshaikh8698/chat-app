import { useEffect, useMemo, useState } from "react";
import { Users, Search } from "lucide-react";

import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  //////////////////////////////////////////////////////
  // Stores
  //////////////////////////////////////////////////////

  const {
    users,
    selectedUser,
    isUsersLoading,
    getUsers,
    setSelectedUser,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  //////////////////////////////////////////////////////
  // State
  //////////////////////////////////////////////////////

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [search, setSearch] = useState("");

  //////////////////////////////////////////////////////
  // Load Users
  //////////////////////////////////////////////////////

  useEffect(() => {
    getUsers();
  }, []);

  //////////////////////////////////////////////////////
  // Filter Users
  //////////////////////////////////////////////////////

  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    // Search Filter
    if (search.trim()) {
      const keyword = search.toLowerCase();

      filtered = filtered.filter(
        (user) =>
          user.fullName.toLowerCase().includes(keyword) ||
          user.username?.toLowerCase().includes(keyword)
      );
    }

    // Online Filter
    if (showOnlineOnly) {
      filtered = filtered.filter((user) =>
        onlineUsers.includes(user._id)
      );
    }

    return filtered;
  }, [users, onlineUsers, showOnlineOnly, search]);

  //////////////////////////////////////////////////////
  // Loading
  //////////////////////////////////////////////////////

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <h2 className="hidden lg:block font-semibold text-lg">
            Contacts
          </h2>
        </div>

        {/* Search */}
        <div className="hidden lg:flex items-center gap-2 mt-4 px-3 py-2 rounded-lg border border-base-300">
          <Search className="size-4 text-zinc-500" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>

        {/* Online Filter */}
        <div className="hidden lg:flex items-center justify-between mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) =>
                setShowOnlineOnly(e.target.checked)
              }
              className="checkbox checkbox-sm"
            />

            <span className="text-sm">
              Show Online Only
            </span>
          </label>

          <span className="text-xs text-zinc-500">
            {Math.max(onlineUsers.length - 1, 0)} Online
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto py-2">
        {filteredUsers.map((user) => {
          const isSelected =
            selectedUser?._id === user._id;

          const isOnline =
            onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full px-4 py-3 flex items-center gap-3 transition-all hover:bg-base-300
                ${
                  isSelected
                    ? "bg-base-300 border-r-4 border-primary"
                    : ""
                }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0 mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-12 rounded-full object-cover"
                />

                <span
                  className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-base-100 ${
                    isOnline
                      ? "bg-green-500"
                      : "bg-zinc-500"
                  }`}
                />
              </div>

              {/* User Info */}
              <div className="hidden lg:block flex-1 text-left overflow-hidden">
                <h3 className="font-semibold truncate">
                  {user.fullName}
                </h3>

                <p className="text-sm text-zinc-500 truncate">
                  @{user.username}
                </p>

                <p
                  className={`text-xs mt-1 ${
                    isOnline
                      ? "text-green-500"
                      : "text-zinc-500"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </button>
          );
        })}

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
            No users found.
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;