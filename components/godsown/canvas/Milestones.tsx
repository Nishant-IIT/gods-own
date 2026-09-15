'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { ACCENT_AMBER, MILESTONES } from '../lib/curves';
import { envDensity } from '../lib/env';
import { scrollState } from '../lib/scrollState';

/**
 * The five song/career milestones as glowing points in space — "the more
 * important the memory, the stronger its gravity" (brief §34). Bright,
 * saturated emissive cores feed the scene's Bloom pass.
 *
 * (An earlier pass also drew a thin connecting line between the first three
 * milestones as a "constellation". Because they sit at different depths, its
 * on-screen projection could stretch into a long, stark diagonal streak
 * across most of the viewport — a distracting artifact rather than a subtle
 * detail, so it's been dropped.)
 */
export function Milestones() {
  const coreRefs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const env = envDensity(scrollState.progress);
    const t = clock.elapsedTime;

    MILESTONES.forEach((m, i) => {
      const mesh = coreRefs.current[i];
      if (!mesh) return;
      const pulse = 0.85 + 0.15 * Math.sin(t * 1.4 + m.z);
      const scale = 1.2 * m.g * pulse;
      mesh.scale.setScalar(scale);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 + 0.5 * Math.min(1, env + 0.3);
    });
  });

  return (
    <>
      {MILESTONES.map((m, i) => {
        const col = m.col ?? ACCENT_AMBER;
        const color = new THREE.Color(col[0] / 255, col[1] / 255, col[2] / 255).multiplyScalar(2.4);
        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) coreRefs.current[i] = el;
            }}
            position={[m.x, m.y, -m.z]}
          >
            <sphereGeometry args={[3, 16, 16]} />
            <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.9} />
          </mesh>
        );
      })}
    </>
  );
}
