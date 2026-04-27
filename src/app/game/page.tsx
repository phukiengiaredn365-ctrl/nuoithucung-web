import type { Metadata } from "next";
import OpenWorldDemo from "@/components/game/OpenWorldDemo";

export const metadata: Metadata = {
  title: "Neon Vice — Open World Game Demo",
  description:
    "Prototype game thế giới mở lấy cảm hứng từ tài liệu GTA VI: lái xe, nhiệm vụ, NPC, wanted system và hiệu ứng neon.",
};

export default function GamePage() {
  return <OpenWorldDemo />;
}
