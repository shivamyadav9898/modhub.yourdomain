import { db, appsTable } from "@workspace/db";

const apps = [
  {
    name: "Neon Racer X",
    category: "gaming",
    description:
      "A high-octane futuristic racing mod with neon-soaked tracks, custom vehicle physics, and online multiplayer. Drift through cyberpunk cityscapes at 300mph and customize every panel of your hovercar.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=neonracer&backgroundColor=4F46E5",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=neonracer",
    size: "842 MB",
    version: "2.4.1",
    developer: "Volt Studios",
    rating: 4.8,
    downloads: 128430,
    featured: true,
  },
  {
    name: "Pixel Forge Pro",
    category: "tools",
    description:
      "Professional pixel art editor with animation timelines, palette management, tilemap export, and full keyboard shortcuts. Loved by indie devs.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=pixelforge&backgroundColor=7C3AED",
    screenshots: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200",
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=1200",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=pixelforge",
    size: "215 MB",
    version: "5.0.2",
    developer: "Forge Labs",
    rating: 4.6,
    downloads: 54210,
    featured: true,
  },
  {
    name: "Skyline Builder",
    category: "gaming",
    description:
      "Build the megacity of your dreams. Sandbox city builder with realistic traffic, weather, and economy systems. Includes 40+ community mods preinstalled.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=skyline&backgroundColor=22C55E",
    screenshots: [
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=skyline",
    size: "1.2 GB",
    version: "1.8.0",
    developer: "Horizon Games",
    rating: 4.7,
    downloads: 89340,
    featured: true,
  },
  {
    name: "FocusFlow",
    category: "productivity",
    description:
      "Pomodoro timer meets task manager meets ambient soundscapes. Built for deep work sessions with beautiful focus statistics.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=focusflow&backgroundColor=4F46E5",
    screenshots: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=focusflow",
    size: "92 MB",
    version: "3.1.4",
    developer: "Quiet Co.",
    rating: 4.9,
    downloads: 213450,
    featured: false,
  },
  {
    name: "CinemaVerse",
    category: "movies",
    description:
      "Stream and download high quality movie content with offline support, subtitles in 40+ languages, and a sleek dark UI.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=cinema&backgroundColor=7C3AED",
    screenshots: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=cinema",
    size: "78 MB",
    version: "4.2.0",
    developer: "Reel Tech",
    rating: 4.4,
    downloads: 412980,
    featured: true,
  },
  {
    name: "MathMaster",
    category: "study",
    description:
      "Step-by-step math solver with handwriting recognition, graphing calculator, and exam prep mode for SAT, ACT, and IB.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=mathmaster&backgroundColor=22C55E",
    screenshots: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=mathmaster",
    size: "156 MB",
    version: "2.0.7",
    developer: "Bright Path",
    rating: 4.5,
    downloads: 78230,
    featured: false,
  },
  {
    name: "Shadow Strike",
    category: "gaming",
    description:
      "Stealth action mod featuring 30 hand-crafted missions, customizable loadouts, and a dynamic alert AI system.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=shadow&backgroundColor=4F46E5",
    screenshots: [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200",
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=shadow",
    size: "2.1 GB",
    version: "1.3.0",
    developer: "Nightshade",
    rating: 4.7,
    downloads: 165780,
    featured: false,
  },
  {
    name: "AudioCraft",
    category: "tools",
    description:
      "Multi-track audio editor with VST plugin support, real-time pitch correction, and one-click mastering presets.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=audiocraft&backgroundColor=7C3AED",
    screenshots: [
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=1200",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=audiocraft",
    size: "488 MB",
    version: "6.5.1",
    developer: "Sonic Forge",
    rating: 4.6,
    downloads: 43920,
    featured: false,
  },
  {
    name: "LinguaQuest",
    category: "study",
    description:
      "Learn 25 languages through interactive story quests. Speech recognition, daily streaks, and AI conversation partners.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=lingua&backgroundColor=22C55E",
    screenshots: [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=lingua",
    size: "324 MB",
    version: "8.1.2",
    developer: "Polyglot Inc.",
    rating: 4.8,
    downloads: 298540,
    featured: true,
  },
  {
    name: "Dungeon Echoes",
    category: "gaming",
    description:
      "Roguelike dungeon crawler with procedurally generated levels, 80+ weapons, and infinite replayability.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=dungeon&backgroundColor=4F46E5",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=dungeon",
    size: "640 MB",
    version: "2.7.3",
    developer: "Crypt Studios",
    rating: 4.5,
    downloads: 67890,
    featured: false,
  },
  {
    name: "StreamBox HD",
    category: "entertainment",
    description:
      "All-in-one streaming hub aggregating movies, shows, and live channels in one beautifully organized interface.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=streambox&backgroundColor=7C3AED",
    screenshots: [
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200",
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=streambox",
    size: "112 MB",
    version: "3.4.0",
    developer: "Cast Media",
    rating: 4.3,
    downloads: 187340,
    featured: false,
  },
  {
    name: "CodeNest IDE",
    category: "tools",
    description:
      "Lightweight cross-platform code editor with intelligent autocomplete, git integration, and 200+ language extensions.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=codenest&backgroundColor=22C55E",
    screenshots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1200",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=codenest",
    size: "278 MB",
    version: "1.9.5",
    developer: "Nest Labs",
    rating: 4.9,
    downloads: 524100,
    featured: true,
  },
];

async function main() {
  const existing = await db.select().from(appsTable).limit(1);
  if (existing.length > 0) {
    console.log("Apps already seeded, skipping.");
    process.exit(0);
  }
  await db.insert(appsTable).values(apps);
  console.log(`Seeded ${apps.length} apps.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
