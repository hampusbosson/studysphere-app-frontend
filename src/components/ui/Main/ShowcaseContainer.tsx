import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'

function ShowcaseContainer(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    ref.current.rotation.y = elapsedTime; // Rotate based on elapsed time
    ref.current.rotation.x += delta; // Add delta-based rotation
  });
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 3 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default ShowcaseContainer;