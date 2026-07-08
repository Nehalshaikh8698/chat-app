import { Link, NavLink } from "react-router-dom";
import {
  LogOut,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  //////////////////////////////////////////////////////
  // Store
  //////////////////////////////////////////////////////

  const { authUser, logout } = useAuthStore();

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        border-b border-base-300
        bg-base-100/80
        backdrop-blur-lg
      "
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <MessageSquare className="size-5 text-primary" />
          </div>

          <div>
            <h1 className="text-lg font-bold">
              Chatty
            </h1>

            <p className="hidden text-xs text-base-content/60 sm:block">
              Real-Time Chat
            </p>
          </div>
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-2">

          {/* Settings */}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `btn btn-sm gap-2 ${
                isActive ? "btn-primary" : "btn-ghost"
              }`
            }
          >
            <Settings className="size-4" />
            <span className="hidden md:inline">
              Settings
            </span>
          </NavLink>

          {/* Authenticated Navigation */}
          {authUser && (
            <>
              {/* Profile */}
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `btn btn-sm gap-2 ${
                    isActive ? "btn-primary" : "btn-ghost"
                  }`
                }
              >
                {authUser.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt={authUser.fullName}
                    className="size-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="size-4" />
                )}

                <span className="hidden md:inline">
                  Profile
                </span>
              </NavLink>

              {/* Logout */}
              <button
                onClick={logout}
                className="btn btn-sm btn-error btn-outline gap-2"
              >
                <LogOut className="size-4" />

                <span className="hidden md:inline">
                  Logout
                </span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;