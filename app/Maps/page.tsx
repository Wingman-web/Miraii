import { PanoramaViewer } from '@/components/PanoramaViewer';

export default function MapsPage() {
  return (
    <div className="w-screen h-screen">
      <PanoramaViewer
        panoramaUrl="/200M.JPG"
        masterPlanUrl="/master_plan.png"
        preloaderGifUrl="/Earth animated.gif"
        label="200M.JPG"
        autoRotate={true}
        rotationDuration={30000}
        initialPitch={-90}
        initialYaw={-35}
        initialHfov={95}
      />
    </div>
  );
}