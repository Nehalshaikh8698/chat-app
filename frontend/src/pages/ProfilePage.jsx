import { useState } from "react";
import {
  Camera,
  Mail,
  User,
  AtSign,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const ProfilePage = () => {
  //////////////////////////////////////////////////////
  // Store
  //////////////////////////////////////////////////////

  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
  } = useAuthStore();

  //////////////////////////////////////////////////////
  // State
  //////////////////////////////////////////////////////

  const [selectedImage, setSelectedImage] = useState(
    authUser?.profilePic || null
  );

  //////////////////////////////////////////////////////
  // Upload Profile Picture
  //////////////////////////////////////////////////////

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Image Validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size must be less than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      const image = reader.result;

      setSelectedImage(image);

      await updateProfile({
        profilePic: image,
      });
    };

    reader.readAsDataURL(file);
  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="card bg-base-200 shadow-xl">

          {/* Header */}
          <div className="card-body">

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">
                My Profile
              </h1>

              <p className="text-base-content/60 mt-2">
                Manage your account information.
              </p>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-10">

              <div className="relative">

                <img
                  src={
                    selectedImage ||
                    authUser?.profilePic ||
                    "/avatar.png"
                  }
                  alt={authUser?.fullName}
                  className="size-36 rounded-full object-cover border-4 border-base-300"
                />

                <label
                  htmlFor="profile-picture"
                  className={`absolute bottom-1 right-1 btn btn-circle btn-primary ${
                    isUpdatingProfile
                      ? "pointer-events-none animate-pulse"
                      : ""
                  }`}
                >
                  <Camera size={18} />

                  <input
                    id="profile-picture"
                    type="file"
                    hidden
                    accept="image/*"
                    disabled={isUpdatingProfile}
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              <p className="text-sm text-base-content/60 mt-4">
                {isUpdatingProfile
                  ? "Uploading profile picture..."
                  : "Click the camera icon to change your profile picture."}
              </p>
            </div>

            {/* User Information */}
            <div className="grid md:grid-cols-2 gap-5">

              {/* Full Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Full Name
                  </span>
                </label>

                <div className="input input-bordered flex items-center gap-2">
                  <User size={18} />
                  <span>{authUser?.fullName}</span>
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Username
                  </span>
                </label>

                <div className="input input-bordered flex items-center gap-2">
                  <AtSign size={18} />
                  <span>@{authUser?.username}</span>
                </div>
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">
                    Email Address
                  </span>
                </label>

                <div className="input input-bordered flex items-center gap-2">
                  <Mail size={18} />
                  <span>{authUser?.email}</span>
                </div>
              </div>

            </div>

            {/* Account Information */}
            <div className="divider my-8">
              Account Information
            </div>

            <div className="space-y-4">

              {/* Member Since */}
              <div className="flex items-center justify-between border-b border-base-300 pb-3">

                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>Member Since</span>
                </div>

                <span className="font-medium">
                  {authUser?.createdAt?.split("T")[0]}
                </span>

              </div>

              {/* Account Status */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} />
                  <span>Account Status</span>
                </div>

                <span className="badge badge-success">
                  Active
                </span>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;