////////////////////////////////////////////////////////////////////////////////
// Format Message Time
////////////////////////////////////////////////////////////////////////////////

export const formatMessageTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

////////////////////////////////////////////////////////////////////////////////
// Format Message Date
////////////////////////////////////////////////////////////////////////////////

export const formatMessageDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

////////////////////////////////////////////////////////////////////////////////
// Format Last Seen
////////////////////////////////////////////////////////////////////////////////

export const formatLastSeen = (date) => {
  if (!date) return "Offline";

  const lastSeen = new Date(date);
  const now = new Date();

  const diff = Math.floor((now - lastSeen) / 1000);

  if (diff < 60) return "Last seen just now";

  if (diff < 3600) {
    return `Last seen ${Math.floor(diff / 60)} min ago`;
  }

  if (diff < 86400) {
    return `Last seen ${Math.floor(diff / 3600)} hr ago`;
  }

  return `Last seen ${lastSeen.toLocaleDateString()}`;
};

////////////////////////////////////////////////////////////////////////////////
// Format File Size
////////////////////////////////////////////////////////////////////////////////

export const formatFileSize = (bytes = 0) => {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

////////////////////////////////////////////////////////////////////////////////
// Truncate Text
////////////////////////////////////////////////////////////////////////////////

export const truncateText = (text = "", length = 30) => {
  if (text.length <= length) return text;

  return `${text.slice(0, length)}...`;
};