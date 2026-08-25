import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dannyboy-tetris-classroom.ma-danny.chatgpt.site"),
  title: "DannyBoy 俄罗斯方块",
  description: "经典街机俄罗斯方块，支持手机和电脑，并有班级排行榜。",
  manifest: "/manifest.json",
  icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
  openGraph: {
    title: "DannyBoy 俄罗斯方块",
    description: "挑战全班排行榜",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
