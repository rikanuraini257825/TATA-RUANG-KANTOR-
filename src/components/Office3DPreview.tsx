import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { PlacedFurniture, RoomDimensions } from '../types/office';
import { Camera, Download } from 'lucide-react';

interface Office3DPreviewProps {
  dimensions: RoomDimensions;
  items: PlacedFurniture[];
  roomTitle: string;
}

type CameraPreset = 'isometric' | 'top' | 'front' | 'corner';

function createFloorTileTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#F1F5F9';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 254, 254);
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(128, 0);
  ctx.lineTo(128, 256);
  ctx.moveTo(0, 128);
  ctx.lineTo(256, 128);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function buildFurnitureGroup(item: PlacedFurniture): THREE.Group {
  const group = new THREE.Group();
  const baseColor = new THREE.Color(item.color);
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.75 });
  const lightMetal = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.25, metalness: 0.8 });
  const primaryMat = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: item.kind === 'sofa' || item.kind === 'partisi' ? 0.82 : 0.48,
    metalness: 0.08,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: baseColor.clone().offsetHSL(0, 0, -0.14),
    roughness: 0.65,
    metalness: 0.1,
  });

  const w = item.widthM * item.scale;
  const d = item.depthM * item.scale;

  if (item.kind === 'meja-kerja') {
    const h = 0.74;
    const top = new THREE.Mesh(new THREE.BoxGeometry(w, 0.045, d), primaryMat);
    top.position.y = h;
    group.add(top);

    const legGeo = new THREE.BoxGeometry(0.05, h - 0.02, 0.05);
    [
      [-w / 2 + 0.06, -d / 2 + 0.06],
      [w / 2 - 0.06, -d / 2 + 0.06],
      [-w / 2 + 0.06, d / 2 - 0.06],
      [w / 2 - 0.06, d / 2 - 0.06],
    ].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, darkMetal);
      leg.position.set(lx, (h - 0.02) / 2, lz);
      group.add(leg);
    });

    // Monitor & stand
    const stand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.06), darkMetal);
    stand.position.set(0, h + 0.11, -d * 0.22);
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.32, 0.025), darkMetal);
    screen.position.set(0, h + 0.28, -d * 0.2);
    const display = new THREE.Mesh(
      new THREE.PlaneGeometry(0.48, 0.28),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0ea5e9, emissiveIntensity: 0.35, roughness: 0.2 })
    );
    display.position.set(0, h + 0.28, -d * 0.2 + 0.014);
    group.add(stand, screen, display);
  } else if (item.kind === 'kursi') {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.05, 12), lightMetal);
    base.position.y = 0.025;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.38, 10), darkMetal);
    stem.position.y = 0.24;
    const seat = new THREE.Mesh(new THREE.BoxGeometry(w * 0.85, 0.08, d * 0.85), primaryMat);
    seat.position.y = 0.45;
    const back = new THREE.Mesh(new THREE.BoxGeometry(w * 0.82, 0.52, 0.07), primaryMat);
    back.position.set(0, 0.72, -d * 0.35);
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, d * 0.55), darkMetal);
    armL.position.set(-w * 0.42, 0.56, 0);
    const armR = armL.clone();
    armR.position.x = w * 0.42;
    group.add(base, stem, seat, back, armL, armR);
  } else if (item.kind === 'lemari') {
    const h = 1.75;
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), primaryMat);
    body.position.y = h / 2;
    const doorL = new THREE.Mesh(new THREE.BoxGeometry(w * 0.47, h * 0.9, 0.02), accentMat);
    doorL.position.set(-w * 0.245, h / 2, d / 2 + 0.01);
    const doorR = doorL.clone();
    doorR.position.x = w * 0.245;
    const handleL = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.16, 0.03), lightMetal);
    handleL.position.set(-0.04, h * 0.5, d / 2 + 0.025);
    const handleR = handleL.clone();
    handleR.position.x = 0.04;
    group.add(body, doorL, doorR, handleL, handleR);
  } else if (item.kind === 'rak-arsip') {
    const h = 1.8;
    const postGeo = new THREE.BoxGeometry(0.04, h, 0.04);
    [
      [-w / 2 + 0.02, -d / 2 + 0.02],
      [w / 2 - 0.02, -d / 2 + 0.02],
      [-w / 2 + 0.02, d / 2 - 0.02],
      [w / 2 - 0.02, d / 2 - 0.02],
    ].forEach(([px, pz]) => {
      const post = new THREE.Mesh(postGeo, darkMetal);
      post.position.set(px, h / 2, pz);
      group.add(post);
    });
    const shelfGeo = new THREE.BoxGeometry(w, 0.03, d);
    const binderColors = [0x1b365d, 0xd49b27, 0x334155, 0x0284c7];
    [0.15, 0.6, 1.05, 1.5, 1.78].forEach((sy, idx) => {
      const shelf = new THREE.Mesh(shelfGeo, primaryMat);
      shelf.position.y = sy;
      group.add(shelf);
      if (idx < 3) {
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(w * 0.35, 0.28, d * 0.75),
          new THREE.MeshStandardMaterial({ color: binderColors[idx % binderColors.length], roughness: 0.7 })
        );
        box.position.set(-w * 0.2 + idx * 0.14, sy + 0.155, 0);
        group.add(box);
      }
    });
  } else if (item.kind === 'sofa') {
    const base = new THREE.Mesh(new THREE.BoxGeometry(w, 0.16, d), darkMetal);
    base.position.y = 0.1;
    const cushion = new THREE.Mesh(new THREE.BoxGeometry(w - 0.12, 0.18, d - 0.12), primaryMat);
    cushion.position.set(0, 0.27, 0.04);
    const back = new THREE.Mesh(new THREE.BoxGeometry(w, 0.45, 0.18), accentMat);
    back.position.set(0, 0.45, -d / 2 + 0.09);
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.34, d), accentMat);
    armL.position.set(-w / 2 + 0.07, 0.35, 0);
    const armR = armL.clone();
    armR.position.x = w / 2 - 0.07;
    group.add(base, cushion, back, armL, armR);
  } else if (item.kind === 'meja-rapat') {
    const h = 0.75;
    const top = new THREE.Mesh(new THREE.BoxGeometry(w, 0.055, d), primaryMat);
    top.position.y = h;
    const ped1 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, h - 0.03, 14), darkMetal);
    ped1.position.set(-w * 0.28, (h - 0.03) / 2, 0);
    const ped2 = ped1.clone();
    ped2.position.x = w * 0.28;
    const powerBox = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.02, 0.14), lightMetal);
    powerBox.position.set(0, h + 0.03, 0);
    group.add(top, ped1, ped2, powerBox);
  } else if (item.kind === 'partisi') {
    const h = 1.25;
    const frame = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lightMetal);
    frame.position.y = h / 2;
    const panel = new THREE.Mesh(new THREE.BoxGeometry(w - 0.06, h - 0.1, d + 0.01), primaryMat);
    panel.position.y = h / 2 + 0.02;
    const footL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.32), darkMetal);
    footL.position.set(-w * 0.38, 0.02, 0);
    const footR = footL.clone();
    footR.position.x = w * 0.38;
    group.add(frame, panel, footL, footR);
  } else if (item.kind === 'tanaman') {
    const r = Math.min(w, d) * 0.42;
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r * 0.75, 0.38, 14),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.45 })
    );
    pot.position.y = 0.19;
    const soil = new THREE.Mesh(
      new THREE.CylinderGeometry(r * 0.9, r * 0.9, 0.04, 12),
      new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.95 })
    );
    soil.position.y = 0.37;
    group.add(pot, soil);
    [
      [0, 0.56, 0, r * 0.85],
      [-r * 0.45, 0.5, r * 0.25, r * 0.6],
      [r * 0.42, 0.52, -r * 0.25, r * 0.58],
      [0, 0.68, -r * 0.2, r * 0.55],
    ].forEach(([fx, fy, fz, fr]) => {
      const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(fr, 1), primaryMat);
      foliage.position.set(fx, fy, fz);
      group.add(foliage);
    });
  } else if (item.kind === 'lampu') {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.04, 16), darkMetal);
    base.position.y = 0.02;
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.55, 10), primaryMat);
    pole.position.y = 0.8;
    const shade = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.22, 0.28, 16),
      new THREE.MeshStandardMaterial({
        color: 0xfef3c7,
        emissive: 0xfbbf24,
        emissiveIntensity: 0.45,
        roughness: 0.35,
      })
    );
    shade.position.y = 1.62;
    group.add(base, pole, shade);
  } else if (item.kind === 'papan-info') {
    const standL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.7, 0.36), darkMetal);
    standL.position.set(-w * 0.42, 0.85, 0);
    const standR = standL.clone();
    standR.position.x = w * 0.42;
    const board = new THREE.Mesh(new THREE.BoxGeometry(w, 0.95, 0.05), primaryMat);
    board.position.y = 1.28;
    const header = new THREE.Mesh(
      new THREE.BoxGeometry(w - 0.08, 0.16, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x1b365d, roughness: 0.5 })
    );
    header.position.y = 1.63;
    group.add(standL, standR, board, header);
  }

  group.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  return group;
}

export const Office3DPreview: React.FC<Office3DPreviewProps> = ({
  dimensions,
  items,
  roomTitle,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const furnitureRootRef = useRef<THREE.Group | null>(null);
  const roomRootRef = useRef<THREE.Group | null>(null);
  const requestRenderRef = useRef<() => void>(() => {});
  const [preset, setPreset] = useState<CameraPreset>('isometric');
  const [webglError, setWebglError] = useState(false);

  // Initialize Three.js once
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
      });
    } catch {
      setWebglError(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth || 800, container.clientHeight || 500);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe2e8f0);
    scene.fog = new THREE.Fog(0xe2e8f0, 14, 34);
    sceneRef.current = scene;

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(
      45,
      (container.clientWidth || 800) / (container.clientHeight || 500),
      0.1,
      100
    );
    camera.position.set(6, 5.5, 6.5);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 2.5;
    controls.maxDistance = 18;
    controlsRef.current = controls;

    // 3-point warm/cool architectural lighting
    const hemi = new THREE.HemisphereLight(0xdbeafe, 0x94a3b8, 0.9);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 1.5);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -8;
    keyLight.shadow.camera.right = 8;
    keyLight.shadow.camera.top = 8;
    keyLight.shadow.camera.bottom = -8;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe0f2fe, 0.55);
    rimLight.position.set(-6, 5, -5);
    scene.add(rimLight);

    const roomRoot = new THREE.Group();
    const furnitureRoot = new THREE.Group();
    scene.add(roomRoot, furnitureRoot);
    roomRootRef.current = roomRoot;
    furnitureRootRef.current = furnitureRoot;

    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function requestRender() {
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame(() => {
        renderDirty = false;
        controls.update();
        renderer.render(scene, camera);
        const done = () => {
          renderBusy = false;
          if (renderDirty) requestRender();
        };
        if (isSoftwareGl) afterDraw(done);
        else done();
      });
    }

    requestRenderRef.current = requestRender;
    controls.addEventListener('change', requestRender);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }
    requestRender();

    return () => {
      ro.disconnect();
      controls.removeEventListener('change', requestRender);
      controls.dispose();
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Rebuild room shell & furniture whenever dimensions or items change
  useEffect(() => {
    const roomRoot = roomRootRef.current;
    const furnitureRoot = furnitureRootRef.current;
    const renderer = rendererRef.current;
    if (!roomRoot || !furnitureRoot || !renderer) return;

    while (roomRoot.children.length) {
      roomRoot.remove(roomRoot.children[0]);
    }
    while (furnitureRoot.children.length) {
      furnitureRoot.remove(furnitureRoot.children[0]);
    }

    const { widthM, lengthM } = dimensions;
    const floorTex = createFloorTileTexture();
    floorTex.repeat.set(widthM, lengthM);
    floorTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(widthM, lengthM),
      new THREE.MeshStandardMaterial({ map: floorTex, color: 0xffffff, roughness: 0.72, metalness: 0.05 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomRoot.add(floor);

    const wallH = 2.6;
    const wallT = 0.12;
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85 });
    const navyAccentMat = new THREE.MeshStandardMaterial({ color: 0x0f2544, roughness: 0.75 });

    // Back wall (-Z)
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(widthM + wallT * 2, wallH, wallT), wallMat);
    backWall.position.set(0, wallH / 2, -lengthM / 2 - wallT / 2);
    backWall.receiveShadow = true;
    roomRoot.add(backWall);

    // Window frame on back wall
    const windowFrame = new THREE.Mesh(
      new THREE.BoxGeometry(Math.min(widthM * 0.55, 2.8), 1.15, 0.06),
      new THREE.MeshStandardMaterial({ color: 0xbae6fd, emissive: 0x7dd3fc, emissiveIntensity: 0.25, roughness: 0.15 })
    );
    windowFrame.position.set(0, 1.45, -lengthM / 2 + 0.01);
    roomRoot.add(windowFrame);

    // Left wall (-X) with navy dado trim
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(wallT, wallH, lengthM), navyAccentMat);
    leftWall.position.set(-widthM / 2 - wallT / 2, wallH / 2, 0);
    leftWall.receiveShadow = true;
    roomRoot.add(leftWall);

    // Low front & right cutaway plinths so camera never blocks view
    const rightPlinth = new THREE.Mesh(new THREE.BoxGeometry(wallT, 0.22, lengthM), wallMat);
    rightPlinth.position.set(widthM / 2 + wallT / 2, 0.11, 0);
    const frontPlinth = new THREE.Mesh(new THREE.BoxGeometry(widthM + wallT * 2, 0.22, wallT), wallMat);
    frontPlinth.position.set(0, 0.11, lengthM / 2 + wallT / 2);
    roomRoot.add(rightPlinth, frontPlinth);

    // Place furniture items
    items.forEach((item) => {
      const grp = buildFurnitureGroup(item);
      grp.position.set(item.xM - widthM / 2, 0.01, item.yM - lengthM / 2);
      grp.rotation.y = (-item.rotationDeg * Math.PI) / 180;
      furnitureRoot.add(grp);
    });

    requestRenderRef.current();
  }, [dimensions, items]);

  // Camera presets
  const applyPreset = (p: CameraPreset) => {
    setPreset(p);
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;
    if (!cam || !ctrl) return;
    const span = Math.max(dimensions.widthM, dimensions.lengthM);
    ctrl.target.set(0, 0.6, 0);
    if (p === 'isometric') cam.position.set(span * 1.1, span * 0.95, span * 1.15);
    if (p === 'top') cam.position.set(0, span * 1.55, 0.01);
    if (p === 'front') cam.position.set(0, span * 0.48, span * 1.35);
    if (p === 'corner') cam.position.set(-span * 0.95, span * 0.72, span * 1.05);
    ctrl.update();
    requestRenderRef.current();
  };

  const handleExport3DPng = () => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const cam = cameraRef.current;
    if (!renderer || !scene || !cam) return;
    renderer.render(scene, cam);
    const url = renderer.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `desain-3d-${roomTitle.toLowerCase().replace(/\s+/g, '-')}.png`;
    a.click();
  };

  if (webglError) {
    return (
      <div className="h-[520px] flex flex-col items-center justify-center bg-slate-100 border border-slate-200 rounded-xl p-6 text-center">
        <p className="font-semibold text-slate-800">Tampilan 3D WebGL tidak didukung pada perangkat ini.</p>
        <p className="text-sm text-slate-600 mt-1">Silakan gunakan tampilan Denah 2D (Top View) yang tetap tersedia penuh.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-200 bg-slate-200" data-testid="office-3d-viewport">
      <div ref={mountRef} className="w-full h-full" />

      {/* Top-left compact badge (solid fill, no backdrop-blur over WebGL) */}
      <div className="absolute top-3 left-3 bg-slate-900/90 text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 pointer-events-none">
        <span className="font-semibold">{roomTitle}</span>
        <span className="text-slate-400">·</span>
        <span className="font-mono tabular-nums text-amber-300">
          {dimensions.widthM}m × {dimensions.lengthM}m
        </span>
      </div>

      {/* Bottom Camera Dock (no backdrop-blur) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-slate-700 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg max-w-[96%] overflow-x-auto">
        <span className="text-[11px] text-slate-300 flex items-center gap-1 px-1 whitespace-nowrap shrink-0">
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          Kamera:
        </span>
        {(
          [
            { id: 'isometric', label: 'Isometrik' },
            { id: 'top', label: 'Atas' },
            { id: 'front', label: 'Depan' },
            { id: 'corner', label: 'Sudut' },
          ] as { id: CameraPreset; label: string }[]
        ).map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => applyPreset(btn.id)}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
              preset === btn.id
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {btn.label}
          </button>
        ))}
        <button
          type="button"
          onClick={handleExport3DPng}
          className="ml-0.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white text-slate-900 hover:bg-slate-100 flex items-center gap-1 whitespace-nowrap shrink-0"
        >
          <Download className="w-3 h-3" />
          PNG 3D
        </button>
      </div>
    </div>
  );
};
