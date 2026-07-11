import soundcloudLogoUrl from "./assets/providers/soundcloud.svg";
import spotifyLogoUrl from "./assets/providers/spotify.svg";
import youtubeMusicLogoUrl from "./assets/providers/youtube-music.svg";
export type ProviderConnectionStatus = "connected" | "issue";

export type ProviderPresentation = {
  id: "spotify" | "youtube-music" | "soundcloud";
  logoUrl: string;
  name: string;
  status: ProviderConnectionStatus;
  statusLabel: string;
  description: string;
  meta: string[];
  enabled?: boolean;
};

export const PROVIDER_FIXTURES: ProviderPresentation[] = [
  {
    id: "spotify",
    logoUrl: spotifyLogoUrl,
    name: "Spotify",
    status: "connected",
    statusLabel: "Connected",
    description:
      "Đang sẵn sàng để launcher mở app, route nội dung và đồng bộ trạng thái cơ bản.",
    meta: ["OAuth active", "Enabled", "Open app"],
  },
  {
    id: "youtube-music",
    logoUrl: youtubeMusicLogoUrl,
    name: "YouTube Music",
    status: "connected",
    statusLabel: "Connected",
    description:
      "Provider đang bật, có thể được ưu tiên khi người dùng chọn phát qua YouTube Music.",
    meta: ["Session valid", "Enabled", "Deep link"],
  },
  {
    id: "soundcloud",
    logoUrl: soundcloudLogoUrl,
    name: "SoundCloud",
    status: "issue",
    statusLabel: "Needs reconnect",
    description:
      "Kết nối chưa ổn định. Cần reconnect trước khi bật provider trong launcher.",
    meta: ["Token expired", "Disabled", "Manual check"],
  },
];
