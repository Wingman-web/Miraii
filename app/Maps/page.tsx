import { PanoramaViewer } from '@/components/PanoramaViewer';

export default function MapsPage() {
  return (
    <div className="w-screen h-screen">
      <PanoramaViewer
        panoramaUrl="/panorama.dzi"
        masterPlanUrl="/master_plan.png"
        preloaderGifUrl="/Earth animated.gif"
        label="panorama.dzi"
        autoRotate={true}
        rotationDuration={30000}
        initialPitch={-90}
        initialYaw={-35}
        initialHfov={95}
      />
    </div>
  );
}