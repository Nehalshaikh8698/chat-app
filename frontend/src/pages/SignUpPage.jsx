import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
  AtSign,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

const SignUpPage = () => {
  //////////////////////////////////////////////////////
  // Store
  //////////////////////////////////////////////////////

  const { signup, isSigningUp } = useAuthStore();

  //////////////////////////////////////////////////////
  // State
  //////////////////////////////////////////////////////

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  //////////////////////////////////////////////////////
  // Handle Input
  //////////////////////////////////////////////////////

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "username" ? value.toLowerCase() : value,
    }));
  };

  //////////////////////////////////////////////////////
  // Validate Form
  //////////////////////////////////////////////////////

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required.");
      return false;
    }

    if (!formData.username.trim()) {
      toast.error("Username is required.");
      return false;
    }

    if (!USERNAME_REGEX.test(formData.username)) {
      toast.error(
        "Username must be 3-20 characters and contain only letters, numbers and underscore."
      );
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email.");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required.");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  //////////////////////////////////////////////////////
  // Submit
  //////////////////////////////////////////////////////

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    await signup({
      fullName: formData.fullName.trim(),
      username: formData.username.trim().toLowerCase(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    });
  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-primary/10">
              <MessageSquare className="size-7 text-primary" />
            </div>

            <h1 className="mt-4 text-3xl font-bold">
              Create Account
            </h1>

            <p className="mt-2 text-base-content/60">
              Create your free account and start chatting.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Full Name */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Full Name
                </span>
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />

                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  className="input input-bordered w-full pl-10"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Username
                </span>
              </label>

              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />

                <input
                  type="text"
                  name="username"
                  placeholder="nehal_shaikh"
                  className="input input-bordered w-full pl-10"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <p className="text-xs text-base-content/50 mt-1">
                3-20 characters • lowercase • numbers • underscore
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Email
                </span>
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-10"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Password
                </span>
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 pr-10"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="btn btn-primary w-full"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link
                to="/login"
                className="link link-primary"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <AuthImagePattern
        title="Join Our Community"
        subtitle="Connect with friends, share moments, and enjoy real-time conversations."
      />
    </div>
  );
};

export default SignUpPage;