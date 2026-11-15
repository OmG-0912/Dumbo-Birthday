"use client";

import * as THREE from "three";

// High-performance procedural PBR texture generator
// Bakes natural botanical, bark, stone, and wood textures on off-screen HTML5 canvases
// Guarantees 100% offline reliability, zero external asset fetch failures, and crisp PBR responses.

class TextureFactory {
  private cache = new Map<string, THREE.CanvasTexture>();

  // 1. Natural Grass & Moss Ground Turf Texture + Normal Map
  getGrassTexture(): { map: THREE.CanvasTexture; normalMap: THREE.CanvasTexture } {
    const key = "grass_turf";
    if (this.cache.has(key) && this.cache.has(key + "_norm")) {
      return {
        map: this.cache.get(key)!,
        normalMap: this.cache.get(key + "_norm")!,
      };
    }

    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Base soil & deep moss undertone
    ctx.fillStyle = "#4A5A35";
    ctx.fillRect(0, 0, size, size);

    // Varied organic grass blades and moss speckles
    const colors = ["#5E7343", "#6E8750", "#7D9A5C", "#4B5F36", "#8AA867", "#3B4D29"];
    for (let i = 0; i < 35000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const len = 3 + Math.random() * 9;
      const angle = (Math.random() - 0.5) * 0.8 - Math.PI / 2;

      ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.lineWidth = 0.8 + Math.random() * 1.2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
      ctx.stroke();
    }

    // Normal map for grass blade relief
    const normCanvas = document.createElement("canvas");
    normCanvas.width = size;
    normCanvas.height = size;
    const nCtx = normCanvas.getContext("2d")!;
    nCtx.fillStyle = "#8080FF"; // Flat normal base
    nCtx.fillRect(0, 0, size, size);
    for (let i = 0; i < 20000; i++) {
      const nx = Math.random() * size;
      const ny = Math.random() * size;
      const r = Math.floor(128 + (Math.random() - 0.5) * 60);
      const g = Math.floor(128 + (Math.random() - 0.5) * 60);
      nCtx.fillStyle = `rgb(${r},${g},255)`;
      nCtx.fillRect(nx, ny, 2, 3);
    }

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(6, 6);

    const normalMap = new THREE.CanvasTexture(normCanvas);
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(6, 6);

    this.cache.set(key, map);
    this.cache.set(key + "_norm", normalMap);
    return { map, normalMap };
  }

  // 2. Weathered Tree Bark Texture with Fissures and Lichen
  getBarkTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
    const key = "bark_timber";
    if (this.cache.has(key) && this.cache.has(key + "_bump")) {
      return {
        map: this.cache.get(key)!,
        bumpMap: this.cache.get(key + "_bump")!,
      };
    }

    const width = 256;
    const height = 512;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    // Deep weathered cocoa base
    ctx.fillStyle = "#3E2E25";
    ctx.fillRect(0, 0, width, height);

    // Vertical bark striations and furrows
    const barkColors = ["#4A372E", "#594338", "#2E211A", "#533F34", "#634D41"];
    for (let x = 0; x < width; x += 2) {
      const col = barkColors[Math.floor(Math.random() * barkColors.length)];
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.5 + Math.random() * 2.5;
      ctx.beginPath();
      ctx.moveTo(x + (Math.random() - 0.5) * 4, 0);
      for (let y = 0; y < height; y += 40) {
        ctx.lineTo(x + (Math.random() - 0.5) * 6, y);
      }
      ctx.stroke();
    }

    // Lichen and moss patches
    const mossColors = ["#5A6B48", "#6E8257", "#48563A"];
    for (let i = 0; i < 40; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      const rad = 6 + Math.random() * 14;
      ctx.fillStyle = mossColors[Math.floor(Math.random() * mossColors.length)];
      ctx.beginPath();
      ctx.arc(px, py, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bump map for bark relief
    const bumpCanvas = document.createElement("canvas");
    bumpCanvas.width = width;
    bumpCanvas.height = height;
    const bCtx = bumpCanvas.getContext("2d")!;
    bCtx.fillStyle = "#808080";
    bCtx.fillRect(0, 0, width, height);
    for (let x = 0; x < width; x += 3) {
      const val = Math.floor(60 + Math.random() * 140);
      bCtx.strokeStyle = `rgb(${val},${val},${val})`;
      bCtx.lineWidth = 2;
      bCtx.beginPath();
      bCtx.moveTo(x, 0);
      bCtx.lineTo(x, height);
      bCtx.stroke();
    }

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(1, 3);

    const bumpMap = new THREE.CanvasTexture(bumpCanvas);
    bumpMap.wrapS = THREE.RepeatWrapping;
    bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(1, 3);

    this.cache.set(key, map);
    this.cache.set(key + "_bump", bumpMap);
    return { map, bumpMap };
  }

  // 3. Natural Cleft Flagstone Texture (Reference Photo 1)
  getStoneTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
    const key = "flagstone_cleft";
    if (this.cache.has(key) && this.cache.has(key + "_bump")) {
      return {
        map: this.cache.get(key)!,
        bumpMap: this.cache.get(key + "_bump")!,
      };
    }

    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Warm sedimentary sandstone base
    ctx.fillStyle = "#DDD0BE";
    ctx.fillRect(0, 0, size, size);

    // Natural stone grain layers and mineral flecks
    const stoneHues = ["#D4C6B3", "#E3D7C7", "#C9BAA6", "#E8DDCF", "#C2B29E"];
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = stoneHues[Math.floor(Math.random() * stoneHues.length)];
      const x = Math.random() * size;
      const y = Math.random() * size;
      const w = 15 + Math.random() * 45;
      const h = 8 + Math.random() * 20;
      ctx.beginPath();
      ctx.ellipse(x, y, w, h, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Micro pitted noise
    for (let i = 0; i < 8000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(70,60,50,0.08)" : "rgba(255,255,255,0.12)";
      ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
    }

    const bumpCanvas = document.createElement("canvas");
    bumpCanvas.width = size;
    bumpCanvas.height = size;
    const bCtx = bumpCanvas.getContext("2d")!;
    bCtx.fillStyle = "#808080";
    bCtx.fillRect(0, 0, size, size);
    for (let i = 0; i < 5000; i++) {
      const v = Math.floor(100 + Math.random() * 60);
      bCtx.fillStyle = `rgb(${v},${v},${v})`;
      bCtx.fillRect(Math.random() * size, Math.random() * size, 3, 3);
    }

    const map = new THREE.CanvasTexture(canvas);
    const bumpMap = new THREE.CanvasTexture(bumpCanvas);
    this.cache.set(key, map);
    this.cache.set(key + "_bump", bumpMap);
    return { map, bumpMap };
  }

  // 4. Botanical Leaf Cluster Alpha Texture (for realistic translucent canopies)
  getLeafClusterTexture(): THREE.CanvasTexture {
    const key = "leaf_cluster_alpha";
    if (this.cache.has(key)) return this.cache.get(key)!;

    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Transparent background
    ctx.clearRect(0, 0, size, size);

    // Draw realistic leaf spray
    const leafColors = ["#4D6638", "#618047", "#739954", "#3D522C", "#85AA62"];
    const leaves = [
      { x: 128, y: 128, r: 42, ang: -0.2 },
      { x: 95, y: 85, r: 38, ang: -0.8 },
      { x: 165, y: 88, r: 39, ang: 0.6 },
      { x: 75, y: 145, r: 36, ang: -1.3 },
      { x: 180, y: 148, r: 37, ang: 1.1 },
      { x: 105, y: 185, r: 35, ang: 2.2 },
      { x: 155, y: 182, r: 35, ang: 1.7 },
      { x: 128, y: 55, r: 34, ang: -0.4 },
    ];

    leaves.forEach((lf) => {
      ctx.save();
      ctx.translate(lf.x, lf.y);
      ctx.rotate(lf.ang);

      // Leaf oval shape with pointed tip
      ctx.beginPath();
      ctx.moveTo(0, -lf.r);
      ctx.bezierCurveTo(lf.r * 0.7, -lf.r * 0.4, lf.r * 0.7, lf.r * 0.4, 0, lf.r);
      ctx.bezierCurveTo(-lf.r * 0.7, lf.r * 0.4, -lf.r * 0.7, -lf.r * 0.4, 0, -lf.r);

      const grad = ctx.createLinearGradient(0, -lf.r, 0, lf.r);
      grad.addColorStop(0, leafColors[Math.floor(Math.random() * leafColors.length)]);
      grad.addColorStop(1, leafColors[Math.floor(Math.random() * leafColors.length)]);
      ctx.fillStyle = grad;
      ctx.fill();

      // Delicate leaf center vein
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, -lf.r * 0.85);
      ctx.lineTo(0, lf.r * 0.85);
      ctx.stroke();

      ctx.restore();
    });

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  // 5. Weathered Timber Texture for Pergola (Reference Photo 2 & 5)
  getWeatheredWoodTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
    const key = "weathered_wood";
    if (this.cache.has(key) && this.cache.has(key + "_bump")) {
      return {
        map: this.cache.get(key)!,
        bumpMap: this.cache.get(key + "_bump")!,
      };
    }

    const width = 128;
    const height = 512;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    // Aged silvery brown
    ctx.fillStyle = "#5A493F";
    ctx.fillRect(0, 0, width, height);

    // Linear grain
    const woodHues = ["#685449", "#4E3E35", "#735D52", "#43342C", "#5F4D43"];
    for (let x = 0; x < width; x += 2) {
      ctx.strokeStyle = woodHues[Math.floor(Math.random() * woodHues.length)];
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.moveTo(x + (Math.random() - 0.5) * 2, 0);
      ctx.lineTo(x + (Math.random() - 0.5) * 2, height);
      ctx.stroke();
    }

    // Wood knot
    ctx.fillStyle = "#382A23";
    ctx.beginPath();
    ctx.ellipse(width * 0.45, height * 0.35, 12, 22, 0.1, 0, Math.PI * 2);
    ctx.fill();

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(1, 2);

    const bumpMap = new THREE.CanvasTexture(canvas);
    bumpMap.wrapS = THREE.RepeatWrapping;
    bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(1, 2);

    this.cache.set(key, map);
    this.cache.set(key + "_bump", bumpMap);
    return { map, bumpMap };
  }

  // 6. Purple Clematis & English Climbing Rose Petal Texture (Reference Photo 2 & 6)
  getClematisTexture(): THREE.CanvasTexture {
    const key = "clematis_violet";
    if (this.cache.has(key)) return this.cache.get(key)!;

    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);

    // 6 velvety violet petals
    const center = 64;
    const petalLen = 42;
    for (let p = 0; p < 6; p++) {
      const angle = (p / 6) * Math.PI * 2;
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle);

      const grad = ctx.createRadialGradient(0, petalLen * 0.5, 4, 0, petalLen * 0.5, petalLen * 0.6);
      grad.addColorStop(0, "#7E52A0");
      grad.addColorStop(0.7, "#5B327D");
      grad.addColorStop(1, "#402058");
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.ellipse(0, petalLen * 0.5, 12, petalLen * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Delicate star-like creamy pistil center
    ctx.fillStyle = "#FBF5E6";
    ctx.beginPath();
    ctx.arc(center, center, 8, 0, Math.PI * 2);
    ctx.fill();
    for (let a = 0; a < 12; a++) {
      const ang = (a / 12) * Math.PI * 2;
      ctx.strokeStyle = "#EDE0C5";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(center + Math.cos(ang) * 14, center + Math.sin(ang) * 14);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  // 7. Hydrangea & Mophead Floret Cluster Texture (Reference Photo 4 & 9)
  getHydrangeaTexture(tint = "#F6F7FA"): THREE.CanvasTexture {
    const key = `hydrangea_${tint}`;
    if (this.cache.has(key)) return this.cache.get(key)!;

    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);

    // Dense cluster of 4-lobed florets
    const florets = [
      { x: 64, y: 64, r: 18 },
      { x: 38, y: 44, r: 16 },
      { x: 88, y: 42, r: 16 },
      { x: 34, y: 86, r: 15 },
      { x: 92, y: 84, r: 15 },
      { x: 64, y: 22, r: 14 },
      { x: 64, y: 104, r: 14 },
    ];

    florets.forEach((fl) => {
      ctx.save();
      ctx.translate(fl.x, fl.y);
      for (let lobe = 0; lobe < 4; lobe++) {
        const ang = (lobe / 4) * Math.PI * 2;
        ctx.fillStyle = tint;
        ctx.beginPath();
        ctx.ellipse(Math.cos(ang) * (fl.r * 0.45), Math.sin(ang) * (fl.r * 0.45), fl.r * 0.45, fl.r * 0.35, ang, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#E4DCD0";
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  // 8. Golden Sunflower Texture (Directly from Reference Photo)
  getSunflowerTexture(): THREE.CanvasTexture {
    const key = "sunflower_golden";
    if (this.cache.has(key)) return this.cache.get(key)!;

    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);

    const center = 128;
    const petalLen = 95;
    const numPetals = 20;

    // Radiating golden petals with subtle gradient
    for (let i = 0; i < numPetals; i++) {
      const ang = (i / numPetals) * Math.PI * 2;
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(ang);

      const grad = ctx.createLinearGradient(0, 25, 0, petalLen);
      grad.addColorStop(0, "#E5A01A");
      grad.addColorStop(0.4, "#FFC72C");
      grad.addColorStop(1, "#FFE066");
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.bezierCurveTo(12, 45, 14, 80, 0, petalLen);
      ctx.bezierCurveTo(-14, 80, -12, 45, 0, 20);
      ctx.fill();

      // Delicate center vein
      ctx.strokeStyle = "rgba(180, 100, 10, 0.35)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(0, petalLen * 0.9);
      ctx.stroke();

      ctx.restore();
    }

    // Secondary inner petal layer
    for (let i = 0; i < numPetals; i++) {
      const ang = ((i + 0.5) / numPetals) * Math.PI * 2;
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(ang);

      ctx.fillStyle = "#FFB81C";
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.bezierCurveTo(9, 40, 10, 68, 0, 78);
      ctx.bezierCurveTo(-10, 68, -9, 40, 0, 20);
      ctx.fill();
      ctx.restore();
    }

    // Large textured seed disc center (dark amber & chocolate brown)
    const discRad = 36;
    const discGrad = ctx.createRadialGradient(center, center, 4, center, center, discRad);
    discGrad.addColorStop(0, "#2B1A0E");
    discGrad.addColorStop(0.7, "#3D2513");
    discGrad.addColorStop(1, "#543318");
    ctx.fillStyle = discGrad;
    ctx.beginPath();
    ctx.arc(center, center, discRad, 0, Math.PI * 2);
    ctx.fill();

    // Spiral seed florets
    for (let r = 6; r < discRad - 2; r += 5) {
      const count = Math.floor(r * 2.8);
      for (let s = 0; s < count; s++) {
        const sang = (s / count) * Math.PI * 2 + r * 0.3;
        const sx = center + Math.cos(sang) * r;
        const sy = center + Math.sin(sang) * r;
        ctx.fillStyle = s % 2 === 0 ? "#7A4E24" : "#4A2D16";
        ctx.fillRect(sx, sy, 2.5, 2.5);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }
}

export const gardenPBR = new TextureFactory();
