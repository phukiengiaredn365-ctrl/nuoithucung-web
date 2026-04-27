"use client";

import { useEffect, useRef, useState } from "react";
import {
  Car,
  CloudRain,
  Gamepad2,
  Map,
  Smartphone,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

type Vec = { x: number; y: number };
type Weather = "clear" | "storm";
type District = "vice" | "coast" | "swamp" | "suburb";

type Building = {
  x: number;
  y: number;
  w: number;
  h: number;
  floors: number;
  color: string;
  district: District;
};

type Vehicle = {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  color: string;
  police?: boolean;
};

type Civilian = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  phase: number;
  filming: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
};

type Mission = {
  title: string;
  stage: number;
  objective: string;
  marker: Vec;
  reward: number;
};

type HudState = {
  cash: number;
  character: string;
  speed: number;
  wanted: number;
  weather: Weather;
  mission: Mission;
  inVehicle: boolean;
  social: number;
  time: string;
};

const MAP_WIDTH = 3600;
const MAP_HEIGHT = 2400;
const PLAYER_RADIUS = 16;
const TWO_PI = Math.PI * 2;

const CHARACTERS = [
  {
    name: "Lucia",
    color: "#f973a8",
    accent: "#ffe4f1",
    skill: "Lén lút + phản xạ nhanh",
  },
  {
    name: "Jason",
    color: "#38bdf8",
    accent: "#e0f2fe",
    skill: "Lái xe + chiến thuật",
  },
];

const INITIAL_MISSION: Mission = {
  title: "Neon Run",
  stage: 0,
  objective: "Đến điểm hẹn ở khu neon Vice City",
  marker: { x: 1260, y: 780 },
  reward: 850,
};

function distance(a: Vec, b: Vec) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function seededNoise(index: number) {
  const s = Math.sin(index * 999.33) * 43758.5453;
  return s - Math.floor(s);
}

function buildWorld() {
  const buildings: Building[] = [];
  let id = 0;

  for (let x = 540; x < 2100; x += 190) {
    for (let y = 260; y < 1300; y += 170) {
      const roadGap = x % 380 === 0 || y % 340 === 0;
      if (roadGap) continue;

      const tall = seededNoise(id) > 0.4;
      buildings.push({
        x,
        y,
        w: 92 + seededNoise(id + 1) * 72,
        h: 78 + seededNoise(id + 2) * 68,
        floors: tall ? 7 + Math.floor(seededNoise(id + 3) * 11) : 2 + Math.floor(seededNoise(id + 4) * 5),
        color: ["#172554", "#312e81", "#1e1b4b", "#0f172a"][id % 4],
        district: "vice",
      });
      id += 1;
    }
  }

  for (let i = 0; i < 18; i += 1) {
    buildings.push({
      x: 2520 + seededNoise(i + 90) * 760,
      y: 420 + seededNoise(i + 120) * 780,
      w: 120 + seededNoise(i + 150) * 95,
      h: 86 + seededNoise(i + 180) * 88,
      floors: 1 + Math.floor(seededNoise(i + 210) * 3),
      color: "#365314",
      district: "swamp",
    });
  }

  for (let i = 0; i < 24; i += 1) {
    buildings.push({
      x: 370 + seededNoise(i + 260) * 760,
      y: 1560 + seededNoise(i + 290) * 550,
      w: 92 + seededNoise(i + 320) * 78,
      h: 80 + seededNoise(i + 350) * 72,
      floors: 1 + Math.floor(seededNoise(i + 380) * 2),
      color: "#7c2d12",
      district: "suburb",
    });
  }

  return buildings;
}

function buildVehicles() {
  const colors = ["#ef4444", "#22c55e", "#f97316", "#eab308", "#a855f7", "#14b8a6", "#e5e7eb"];
  const vehicles: Vehicle[] = [];

  for (let i = 0; i < 34; i += 1) {
    const horizontal = i % 2 === 0;
    vehicles.push({
      id: i,
      x: 520 + seededNoise(i + 410) * 2160,
      y: 360 + seededNoise(i + 450) * 1520,
      angle: horizontal ? 0 : Math.PI / 2,
      speed: 38 + seededNoise(i + 470) * 64,
      color: colors[i % colors.length],
    });
  }

  for (let i = 0; i < 4; i += 1) {
    vehicles.push({
      id: 100 + i,
      x: 1780 + i * 90,
      y: 480,
      angle: Math.PI,
      speed: 120,
      color: "#f8fafc",
      police: true,
    });
  }

  return vehicles;
}

function buildCivilians() {
  const civilians: Civilian[] = [];

  for (let i = 0; i < 80; i += 1) {
    const x = 450 + seededNoise(i + 510) * 2380;
    const y = 300 + seededNoise(i + 540) * 1680;
    civilians.push({
      x,
      y,
      baseX: x,
      baseY: y,
      phase: seededNoise(i + 570) * TWO_PI,
      filming: false,
    });
  }

  return civilians;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

function drawRoads(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.fillStyle = "#172033";

  for (let x = 420; x <= 2260; x += 380) {
    ctx.fillRect(x - 38, 140, 76, 1540);
  }

  for (let y = 260; y <= 1600; y += 340) {
    ctx.fillRect(300, y - 36, 2180, 72);
  }

  ctx.translate(2200, 1680);
  ctx.rotate(-0.42);
  ctx.fillRect(-280, -34, 1100, 68);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 3;
  ctx.setLineDash([24, 24]);

  for (let x = 420; x <= 2260; x += 380) {
    ctx.beginPath();
    ctx.moveTo(x, 160);
    ctx.lineTo(x, 1650);
    ctx.stroke();
  }

  for (let y = 260; y <= 1600; y += 340) {
    ctx.beginPath();
    ctx.moveTo(320, y);
    ctx.lineTo(2460, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWaterAndSwamp(ctx: CanvasRenderingContext2D) {
  const coast = ctx.createLinearGradient(0, 0, 900, 0);
  coast.addColorStop(0, "#0891b2");
  coast.addColorStop(0.55, "#0e7490");
  coast.addColorStop(1, "#155e75");
  ctx.fillStyle = coast;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(275, 0);
  ctx.bezierCurveTo(170, 520, 310, 1050, 125, 1520);
  ctx.bezierCurveTo(40, 1770, 200, 2120, 0, MAP_HEIGHT);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(245, 0);
  ctx.bezierCurveTo(140, 520, 290, 1050, 105, 1520);
  ctx.stroke();

  ctx.fillStyle = "#2f4f23";
  ctx.beginPath();
  ctx.ellipse(2940, 1060, 560, 680, -0.12, 0, TWO_PI);
  ctx.fill();

  ctx.fillStyle = "rgba(34,197,94,0.18)";
  for (let i = 0; i < 26; i += 1) {
    ctx.beginPath();
    ctx.ellipse(
      2520 + seededNoise(i + 620) * 880,
      520 + seededNoise(i + 650) * 980,
      55 + seededNoise(i + 680) * 120,
      24 + seededNoise(i + 710) * 55,
      seededNoise(i + 740) * Math.PI,
      0,
      TWO_PI,
    );
    ctx.fill();
  }
}

function drawPalm(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = "#5c3b1e";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 22);
  ctx.quadraticCurveTo(6, 0, 0, -34);
  ctx.stroke();

  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 7;
  for (let i = 0; i < 7; i += 1) {
    const angle = (i / 7) * TWO_PI;
    ctx.beginPath();
    ctx.moveTo(0, -34);
    ctx.quadraticCurveTo(Math.cos(angle) * 24, -52 + Math.sin(angle) * 18, Math.cos(angle) * 52, -35 + Math.sin(angle) * 26);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBuildings(ctx: CanvasRenderingContext2D, buildings: Building[], camera: Vec, night: number) {
  buildings.forEach((building, index) => {
    const height = building.floors * 14;
    const screenX = building.x - camera.x;
    const screenY = building.y - camera.y;
    if (screenX < -220 || screenY < -260 || screenX > ctx.canvas.clientWidth + 220 || screenY > ctx.canvas.clientHeight + 220) return;

    ctx.save();
    ctx.translate(screenX, screenY);

    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.beginPath();
    ctx.ellipse(building.w * 0.52, building.h * 0.82, building.w * 0.62, building.h * 0.24, 0, 0, TWO_PI);
    ctx.fill();

    ctx.fillStyle = building.color;
    drawRoundedRect(ctx, 0, -height, building.w, building.h + height, 10);

    const neon = building.district === "vice";
    ctx.strokeStyle = neon ? `rgba(45,212,191,${0.22 + night * 0.55})` : "rgba(255,255,255,0.08)";
    ctx.lineWidth = neon ? 3 : 1.5;
    ctx.strokeRect(3, -height + 3, building.w - 6, building.h + height - 6);

    const cols = Math.max(2, Math.floor(building.w / 25));
    const rows = Math.max(3, Math.floor((building.h + height) / 28));
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const lit = seededNoise(index * 97 + r * 17 + c) > 0.52 - night * 0.26;
        ctx.fillStyle = lit ? `rgba(255,245,157,${0.32 + night * 0.55})` : "rgba(15,23,42,0.6)";
        ctx.fillRect(12 + c * 23, -height + 14 + r * 24, 10, 9);
      }
    }

    ctx.restore();
  });
}

function drawVehicle(ctx: CanvasRenderingContext2D, vehicle: Vehicle, camera: Vec, night: number, selected: boolean) {
  ctx.save();
  ctx.translate(vehicle.x - camera.x, vehicle.y - camera.y);
  ctx.rotate(vehicle.angle);

  ctx.shadowColor = vehicle.police ? "#60a5fa" : vehicle.color;
  ctx.shadowBlur = selected ? 24 : 8 + night * 12;
  ctx.fillStyle = "rgba(0,0,0,0.24)";
  ctx.fillRect(-26, -14, 58, 31);

  ctx.fillStyle = vehicle.police ? "#f8fafc" : vehicle.color;
  drawRoundedRect(ctx, -26, -15, 52, 30, 7);

  ctx.fillStyle = "#0f172a";
  ctx.fillRect(-7, -13, 16, 26);
  ctx.fillStyle = "rgba(191,219,254,0.9)";
  ctx.fillRect(-22, -10, 8, 8);
  ctx.fillRect(-22, 2, 8, 8);

  if (vehicle.police) {
    ctx.fillStyle = "#1d4ed8";
    ctx.fillRect(-1, -16, 6, 7);
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(7, -16, 6, 7);
  }

  if (night > 0.35 || selected) {
    const beam = ctx.createLinearGradient(22, 0, 130, 0);
    beam.addColorStop(0, "rgba(255,255,210,0.45)");
    beam.addColorStop(1, "rgba(255,255,210,0)");
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(24, -9);
    ctx.lineTo(150, -42);
    ctx.lineTo(150, 42);
    ctx.lineTo(24, 9);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function drawPlayer(
  ctx: CanvasRenderingContext2D,
  position: Vec,
  angle: number,
  camera: Vec,
  characterIndex: number,
  inVehicle: boolean,
) {
  if (inVehicle) return;

  const character = CHARACTERS[characterIndex];
  ctx.save();
  ctx.translate(position.x - camera.x, position.y - camera.y);
  ctx.rotate(angle);
  ctx.shadowColor = character.color;
  ctx.shadowBlur = 18;

  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 14, 18, 9, 0, 0, TWO_PI);
  ctx.fill();

  ctx.fillStyle = character.color;
  ctx.beginPath();
  ctx.arc(0, 0, PLAYER_RADIUS, 0, TWO_PI);
  ctx.fill();

  ctx.fillStyle = character.accent;
  ctx.beginPath();
  ctx.arc(7, -5, 5, 0, TWO_PI);
  ctx.fill();

  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(22, 0);
  ctx.stroke();
  ctx.restore();
}

function drawCivilians(ctx: CanvasRenderingContext2D, civilians: Civilian[], camera: Vec) {
  civilians.forEach((civilian) => {
    const sx = civilian.x - camera.x;
    const sy = civilian.y - camera.y;
    if (sx < -60 || sy < -60 || sx > ctx.canvas.width + 60 || sy > ctx.canvas.height + 60) return;

    ctx.fillStyle = civilian.filming ? "#facc15" : "#f9fafb";
    ctx.beginPath();
    ctx.arc(sx, sy, 7, 0, TWO_PI);
    ctx.fill();

    if (civilian.filming) {
      ctx.fillStyle = "rgba(96,165,250,0.85)";
      ctx.fillRect(sx + 9, sy - 14, 5, 10);
    }
  });
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[], camera: Vec) {
  particles.forEach((particle) => {
    ctx.globalAlpha = clamp(particle.life, 0, 1);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x - camera.x, particle.y - camera.y, particle.size, 0, TWO_PI);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function drawMissionMarker(ctx: CanvasRenderingContext2D, mission: Mission, camera: Vec, pulse: number) {
  const x = mission.marker.x - camera.x;
  const y = mission.marker.y - camera.y;
  ctx.save();
  ctx.translate(x, y);
  ctx.shadowColor = "#f97316";
  ctx.shadowBlur = 24;
  ctx.strokeStyle = "rgba(249,115,22,0.7)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 38 + Math.sin(pulse * 4) * 6, 0, TWO_PI);
  ctx.stroke();

  ctx.fillStyle = "#f97316";
  ctx.beginPath();
  ctx.moveTo(0, -32);
  ctx.lineTo(25, 24);
  ctx.lineTo(0, 12);
  ctx.lineTo(-25, 24);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawMiniMap(
  ctx: CanvasRenderingContext2D,
  player: Vec,
  mission: Mission,
  vehicles: Vehicle[],
  width: number,
  height: number,
) {
  const size = 156;
  const x = width - size - 24;
  const y = height - size - 24;
  ctx.save();
  ctx.fillStyle = "rgba(2,6,23,0.72)";
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, x, y, size, size, 18);
  ctx.strokeRect(x + 10, y + 10, size - 20, size - 20);

  const mapX = (value: number) => x + 12 + (value / MAP_WIDTH) * (size - 24);
  const mapY = (value: number) => y + 12 + (value / MAP_HEIGHT) * (size - 24);

  ctx.fillStyle = "#0891b2";
  ctx.fillRect(x + 12, y + 12, 14, size - 24);
  ctx.fillStyle = "rgba(148,163,184,0.5)";
  for (let i = 0; i < 5; i += 1) {
    ctx.fillRect(x + 38 + i * 22, y + 22, 3, size - 44);
    ctx.fillRect(x + 28, y + 38 + i * 20, size - 58, 3);
  }

  ctx.fillStyle = "#ef4444";
  vehicles.filter((vehicle) => vehicle.police).forEach((vehicle) => {
    ctx.beginPath();
    ctx.arc(mapX(vehicle.x), mapY(vehicle.y), 3, 0, TWO_PI);
    ctx.fill();
  });

  ctx.fillStyle = "#f97316";
  ctx.beginPath();
  ctx.arc(mapX(mission.marker.x), mapY(mission.marker.y), 5, 0, TWO_PI);
  ctx.fill();

  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.arc(mapX(player.x), mapY(player.y), 5, 0, TWO_PI);
  ctx.fill();
  ctx.restore();
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  state: {
    player: Vec;
    angle: number;
    characterIndex: number;
    camera: Vec;
    buildings: Building[];
    vehicles: Vehicle[];
    civilians: Civilian[];
    particles: Particle[];
    mission: Mission;
    timeOfDay: number;
    weather: Weather;
    inVehicleId: number | null;
    pulse: number;
    wanted: number;
  },
) {
  const width = ctx.canvas.clientWidth || ctx.canvas.width;
  const height = ctx.canvas.clientHeight || ctx.canvas.height;
  const dayAmount = Math.max(0.12, Math.sin(state.timeOfDay * TWO_PI - Math.PI / 5) * 0.5 + 0.5);
  const night = 1 - dayAmount;
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, night > 0.55 ? "#111827" : "#38bdf8");
  sky.addColorStop(1, night > 0.55 ? "#312e81" : "#fef3c7");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.translate(-state.camera.x, -state.camera.y);
  const ground = ctx.createLinearGradient(0, 0, MAP_WIDTH, MAP_HEIGHT);
  ground.addColorStop(0, "#f59e0b");
  ground.addColorStop(0.42, "#334155");
  ground.addColorStop(0.76, "#365314");
  ground.addColorStop(1, "#1f2937");
  ctx.fillStyle = ground;
  ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
  drawWaterAndSwamp(ctx);
  drawRoads(ctx);
  for (let i = 0; i < 38; i += 1) {
    drawPalm(ctx, 235 + i * 73, 142 + (i % 7) * 250, 0.78 + (i % 3) * 0.12);
  }
  ctx.restore();

  drawBuildings(ctx, state.buildings, state.camera, night);
  drawCivilians(ctx, state.civilians, state.camera);
  state.vehicles.forEach((vehicle) => {
    drawVehicle(ctx, vehicle, state.camera, night, vehicle.id === state.inVehicleId);
  });
  drawMissionMarker(ctx, state.mission, state.camera, state.pulse);
  drawParticles(ctx, state.particles, state.camera);
  drawPlayer(ctx, state.player, state.angle, state.camera, state.characterIndex, state.inVehicleId !== null);

  if (state.weather === "storm") {
    ctx.strokeStyle = "rgba(191,219,254,0.42)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 120; i += 1) {
      const x = (seededNoise(i + Math.floor(state.pulse * 18)) * width + state.pulse * 44) % width;
      const y = (seededNoise(i + 800) * height + state.pulse * 360) % height;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 16, y + 38);
      ctx.stroke();
    }
  }

  if (night > 0.18) {
    ctx.fillStyle = `rgba(15,23,42,${night * 0.46})`;
    ctx.fillRect(0, 0, width, height);
  }

  if (state.wanted > 0) {
    ctx.strokeStyle = `rgba(239,68,68,${0.14 + Math.sin(state.pulse * 7) * 0.07})`;
    ctx.lineWidth = 16;
    ctx.strokeRect(8, 8, width - 16, height - 16);
  }

  drawMiniMap(ctx, state.player, state.mission, state.vehicles, width, height);
}

function formatClock(timeOfDay: number) {
  const minutes = Math.floor(timeOfDay * 24 * 60);
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export default function OpenWorldDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const [hud, setHud] = useState<HudState>({
    cash: 1200,
    character: CHARACTERS[0].name,
    speed: 0,
    wanted: 0,
    weather: "clear",
    mission: INITIAL_MISSION,
    inVehicle: false,
    social: 12,
    time: "18:30",
  });
  const [helpOpen, setHelpOpen] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const buildings = buildWorld();
    const vehicles = buildVehicles();
    const civilians = buildCivilians();
    const particles: Particle[] = [];
    const player: Vec = { x: 760, y: 970 };
    const camera: Vec = { x: 0, y: 0 };
    const velocity: Vec = { x: 0, y: 0 };
    let angle = 0;
    let characterIndex = 0;
    let cash = 1200;
    let wanted = 0;
    let social = 12;
    let timeOfDay = 18.5 / 24;
    let weather: Weather = "clear";
    let mission: Mission = { ...INITIAL_MISSION };
    let inVehicleId: number | null = null;
    let last = performance.now();
    let animation = 0;
    let hudTimer = 0;
    let weatherTimer = 0;
    let missionHold = 0;
    let socialTimer = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const ratio = window.devicePixelRatio || 1;
      const width = parent?.clientWidth ?? window.innerWidth;
      const height = Math.max(620, Math.min(window.innerHeight - 120, 820));
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const setKey = (key: string, active: boolean) => {
      if (active) {
        keysRef.current.add(key);
      } else {
        keysRef.current.delete(key);
      }
    };

    const completeMission = () => {
      cash += mission.reward;
      social += 9 + wanted * 3;
      particles.push({
        x: player.x,
        y: player.y,
        vx: 0,
        vy: -35,
        life: 1,
        color: "#facc15",
        size: 24,
      });

      if (mission.stage === 0) {
        mission = {
          title: "Swamp Signal",
          stage: 1,
          objective: "Hack trạm tín hiệu ở vùng đầm lầy",
          marker: { x: 2880, y: 920 },
          reward: 1350,
        };
        wanted = Math.max(wanted, 1);
      } else if (mission.stage === 1) {
        mission = {
          title: "Clean Escape",
          stage: 2,
          objective: "Cắt đuôi cảnh sát và đến safehouse ngoại ô",
          marker: { x: 1040, y: 1860 },
          reward: 2200,
        };
        wanted = Math.max(wanted, 3);
      } else {
        mission = {
          title: "Empire Builder",
          stage: 3,
          objective: "Mở nhiệm vụ mới: mua garage, nâng cấp xe, tuyển crew",
          marker: { x: 1720, y: 560 },
          reward: 3000,
        };
        wanted = Math.max(0, wanted - 2);
      }
    };

    const interact = () => {
      if (inVehicleId !== null) {
        const current = vehicles.find((vehicle) => vehicle.id === inVehicleId);
        if (current) {
          player.x = current.x + Math.cos(current.angle + Math.PI / 2) * 44;
          player.y = current.y + Math.sin(current.angle + Math.PI / 2) * 44;
        }
        inVehicleId = null;
        return;
      }

      const nearest = vehicles
        .filter((vehicle) => !vehicle.police)
        .map((vehicle) => ({ vehicle, dist: distance(player, vehicle) }))
        .sort((a, b) => a.dist - b.dist)[0];

      if (nearest && nearest.dist < 72) {
        inVehicleId = nearest.vehicle.id;
        wanted = Math.max(wanted, 1);
        social += 2;
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setKey(key, true);

      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
        event.preventDefault();
      }

      if (key === "1" || key === "2") {
        characterIndex = key === "1" ? 0 : 1;
      }

      if (key === "e") {
        interact();
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      setKey(event.key.toLowerCase(), false);
    };

    const updateVehicles = (dt: number) => {
      vehicles.forEach((vehicle) => {
        if (vehicle.id === inVehicleId) {
          vehicle.x = player.x;
          vehicle.y = player.y;
          vehicle.angle = angle;
          return;
        }

        if (vehicle.police && wanted > 0) {
          const dx = player.x - vehicle.x;
          const dy = player.y - vehicle.y;
          vehicle.angle = Math.atan2(dy, dx);
          vehicle.x += Math.cos(vehicle.angle) * vehicle.speed * (0.65 + wanted * 0.12) * dt;
          vehicle.y += Math.sin(vehicle.angle) * vehicle.speed * (0.65 + wanted * 0.12) * dt;
          return;
        }

        vehicle.x += Math.cos(vehicle.angle) * vehicle.speed * dt;
        vehicle.y += Math.sin(vehicle.angle) * vehicle.speed * dt;

        if (vehicle.x < 360 || vehicle.x > 2500) vehicle.angle = Math.PI - vehicle.angle;
        if (vehicle.y < 220 || vehicle.y > 1700) vehicle.angle = -vehicle.angle;
        vehicle.x = clamp(vehicle.x, 330, 2560);
        vehicle.y = clamp(vehicle.y, 180, 1760);
      });
    };

    const updateCivilians = (dt: number) => {
      civilians.forEach((civilian) => {
        civilian.phase += dt;
        civilian.x = civilian.baseX + Math.cos(civilian.phase * 0.8) * 28;
        civilian.y = civilian.baseY + Math.sin(civilian.phase * 0.6) * 24;
        civilian.filming = wanted > 0 && distance(player, civilian) < 170;
      });
    };

    const updateParticles = (dt: number) => {
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.life -= dt * 0.8;
        if (particle.life <= 0) {
          particles.splice(i, 1);
        }
      }

      if (inVehicleId !== null && Math.hypot(velocity.x, velocity.y) > 180) {
        particles.push({
          x: player.x - Math.cos(angle) * 32,
          y: player.y - Math.sin(angle) * 32,
          vx: -Math.cos(angle) * 18 + (Math.random() - 0.5) * 18,
          vy: -Math.sin(angle) * 18 + (Math.random() - 0.5) * 18,
          life: 0.5,
          color: "rgba(226,232,240,0.8)",
          size: 5 + Math.random() * 8,
        });
      }
    };

    const updatePlayer = (dt: number) => {
      const keys = keysRef.current;
      const input: Vec = { x: 0, y: 0 };
      if (keys.has("w") || keys.has("arrowup")) input.y -= 1;
      if (keys.has("s") || keys.has("arrowdown")) input.y += 1;
      if (keys.has("a") || keys.has("arrowleft")) input.x -= 1;
      if (keys.has("d") || keys.has("arrowright")) input.x += 1;

      const inputLength = Math.hypot(input.x, input.y) || 1;
      input.x /= inputLength;
      input.y /= inputLength;

      const driving = inVehicleId !== null;
      const sprint = keys.has("shift");
      const maxSpeed = driving ? 420 + characterIndex * 40 : sprint ? 185 : 125;
      const acceleration = driving ? 8.5 : 11;
      const friction = driving ? 3.2 : 8.5;

      velocity.x += input.x * maxSpeed * acceleration * dt;
      velocity.y += input.y * maxSpeed * acceleration * dt;

      const currentSpeed = Math.hypot(velocity.x, velocity.y);
      if (currentSpeed > maxSpeed) {
        velocity.x = (velocity.x / currentSpeed) * maxSpeed;
        velocity.y = (velocity.y / currentSpeed) * maxSpeed;
      }

      velocity.x = lerp(velocity.x, 0, clamp(friction * dt, 0, 1));
      velocity.y = lerp(velocity.y, 0, clamp(friction * dt, 0, 1));

      if (Math.hypot(velocity.x, velocity.y) > 4) {
        angle = Math.atan2(velocity.y, velocity.x);
      }

      player.x = clamp(player.x + velocity.x * dt, 90, MAP_WIDTH - 90);
      player.y = clamp(player.y + velocity.y * dt, 90, MAP_HEIGHT - 90);

      if (driving && Math.hypot(velocity.x, velocity.y) > 330) {
        wanted = Math.min(5, wanted + dt * 0.08);
      }
    };

    const updateMission = (dt: number) => {
      const nearMarker = distance(player, mission.marker) < 78;
      if (nearMarker) {
        missionHold += dt;
        if (missionHold > 0.9) completeMission();
      } else {
        missionHold = 0;
      }

      if (mission.stage === 2 && wanted > 0) {
        wanted = Math.max(0, wanted - dt * (distance(player, { x: 1780, y: 480 }) > 760 ? 0.13 : 0.04));
      } else if (wanted > 0) {
        wanted = Math.max(0, wanted - dt * 0.018);
      }
    };

    const updateCamera = () => {
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      const targetX = clamp(player.x - cssWidth / 2, 0, MAP_WIDTH - cssWidth);
      const targetY = clamp(player.y - cssHeight / 2, 0, MAP_HEIGHT - cssHeight);
      camera.x = lerp(camera.x, targetX, 0.09);
      camera.y = lerp(camera.y, targetY, 0.09);
    };

    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      hudTimer += dt;
      weatherTimer += dt;
      socialTimer += dt;
      timeOfDay = (timeOfDay + dt * 0.0028) % 1;

      if (weatherTimer > 24) {
        weatherTimer = 0;
        weather = weather === "clear" ? "storm" : "clear";
      }

      if (socialTimer > 1.5) {
        socialTimer = 0;
        const filming = civilians.filter((civilian) => civilian.filming).length;
        if (filming > 0) social += Math.ceil(filming / 8);
      }

      updatePlayer(dt);
      updateVehicles(dt);
      updateCivilians(dt);
      updateParticles(dt);
      updateMission(dt);
      updateCamera();

      drawScene(ctx, {
        player,
        angle,
        characterIndex,
        camera,
        buildings,
        vehicles,
        civilians,
        particles,
        mission,
        timeOfDay,
        weather,
        inVehicleId,
        pulse: now / 1000,
        wanted: Math.round(wanted),
      });

      if (hudTimer > 0.12) {
        hudTimer = 0;
        setHud({
          cash,
          character: CHARACTERS[characterIndex].name,
          speed: Math.round(Math.hypot(velocity.x, velocity.y)),
          wanted: Math.round(wanted),
          weather,
          mission,
          inVehicle: inVehicleId !== null,
          social,
          time: formatClock(timeOfDay),
        });
      }

      animation = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    animation = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const pressKey = (key: string, active: boolean) => {
    if (active) {
      keysRef.current.add(key);
    } else {
      keysRef.current.delete(key);
    }
  };

  const wantedStars = Array.from({ length: 5 }, (_, index) => index < hud.wanted);

  return (
    <section id="neon-vice" className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.22),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(244,63,94,0.2),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0.95))]" />

      <div className="relative z-10 border-b border-white/10">
        <div className="container-page flex flex-col gap-5 py-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.28em] text-cyan-100">
              <Sparkles className="h-4 w-4" />
              Open-world web prototype
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-none text-white sm:text-6xl lg:text-7xl">
              Neon Vice: City Chase
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              Prototype lấy cảm hứng từ tài liệu: thành phố mở, 2 nhân vật, xe cộ, NPC có phản ứng xã hội,
              nhiệm vụ nhiều chặng, chu kỳ ngày/đêm, mưa, neon lighting và wanted system.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4 lg:w-[460px]">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
              <Users className="mb-2 h-5 w-5 text-cyan-200" />
              <p className="text-slate-400">Nhân vật</p>
              <p className="font-bold">{hud.character}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
              <Car className="mb-2 h-5 w-5 text-orange-200" />
              <p className="text-slate-400">Tốc độ</p>
              <p className="font-bold">{hud.speed} km/h</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
              <CloudRain className="mb-2 h-5 w-5 text-sky-200" />
              <p className="text-slate-400">Thời tiết</p>
              <p className="font-bold">{hud.weather === "storm" ? "Mưa bão" : "Quang đãng"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
              <Smartphone className="mb-2 h-5 w-5 text-pink-200" />
              <p className="text-slate-400">Viral</p>
              <p className="font-bold">{hud.social}K</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-3 py-4 sm:px-5 lg:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
          <canvas ref={canvasRef} className="block w-full cursor-crosshair" aria-label="Neon Vice game canvas" />

          <div className="pointer-events-none absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Nhiệm vụ</p>
              <p className="mt-1 font-bold text-white">{hud.mission.title}</p>
              <p className="mt-1 max-w-[260px] text-xs leading-5 text-slate-300">{hud.mission.objective}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Wanted</p>
              <div className="mt-1 flex gap-1">
                {wantedStars.map((active, index) => (
                  <Star
                    key={index}
                    className={active ? "h-5 w-5 fill-red-400 text-red-400" : "h-5 w-5 text-slate-600"}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Ví tiền</p>
              <p className="mt-1 font-bold text-emerald-300">${hud.cash.toLocaleString("en-US")}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Giờ game</p>
              <p className="mt-1 font-bold text-cyan-200">{hud.time}</p>
            </div>
          </div>

          <div className="absolute bottom-5 left-5 hidden gap-2 sm:flex">
            {["w", "a", "s", "d"].map((key) => (
              <button
                key={key}
                type="button"
                onPointerDown={() => pressKey(key, true)}
                onPointerUp={() => pressKey(key, false)}
                onPointerLeave={() => pressKey(key, false)}
                className="h-12 w-12 rounded-2xl border border-white/15 bg-white/10 text-sm font-black uppercase text-white backdrop-blur transition hover:bg-white/20"
              >
                {key}
              </button>
            ))}
          </div>

          <div className="absolute bottom-5 right-48 hidden gap-2 lg:flex">
            {hud.inVehicle ? (
              <span className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-100 backdrop-blur">
                Đang lái xe
              </span>
            ) : (
              <span className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-slate-200 backdrop-blur">
                Nhấn E gần xe để lái
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setHelpOpen((value) => !value)}
            className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <Gamepad2 className="h-4 w-4" />
            Điều khiển
          </button>

          {helpOpen ? (
            <div className="absolute right-5 top-20 w-[min(340px,calc(100%-2.5rem))] rounded-3xl border border-white/10 bg-slate-950/82 p-5 text-sm leading-6 text-slate-200 shadow-2xl backdrop-blur">
              <div className="mb-3 flex items-center gap-2 font-bold text-white">
                <Map className="h-5 w-5 text-cyan-200" />
                Cách chơi
              </div>
              <ul className="space-y-2">
                <li>
                  <b>WASD / Arrow:</b> di chuyển hoặc lái xe.
                </li>
                <li>
                  <b>Shift:</b> chạy nhanh; <b>E:</b> vào/ra xe.
                </li>
                <li>
                  <b>1 / 2:</b> đổi Lucia và Jason.
                </li>
                <li>Đi tới marker màu cam để hoàn thành nhiệm vụ và mở chặng mới.</li>
                <li>Chạy quá tốc độ hoặc lấy xe sẽ tăng sao truy nã; trốn khỏi cảnh sát để giảm sao.</li>
              </ul>
              <div className="mt-4 rounded-2xl bg-white/8 p-3 text-xs text-slate-300">
                Đây là prototype web gốc, không dùng asset hay mã nguồn từ GTA/Rockstar.
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
