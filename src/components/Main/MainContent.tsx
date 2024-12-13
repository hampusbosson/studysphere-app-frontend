import React from "react";
import { Canvas } from "@react-three/fiber";
import CallToActionButton from "./CallToActionButton";
import ShowcaseContainer from "./ShowcaseContainer";

const MainContent: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 max-w-5xl">
        <h1 className="text-5xl font-bold font-montserrat bg-shiny-silver bg-clip-text text-transparent flex text-center p-1">
          Master Your Studies, Effortlessly
        </h1>
        <h2 className="text-2xl font-raleway font-semibold bg-shiny-silver bg-clip-text text-transparent text-center -mt-1">
          Summarize PDFs, take interactive quizzes, highlight key ideas, and organize your notes -
          All in one app designed to supercharge your learning.
        </h2>
      </div>
      <div className="mt-10">
        <CallToActionButton linkName="login" buttonName="Get started for free" />
        {/* Canvas wraps ShowcaseContainer */}
        <div className="mt-20 w-full h-[200px] bg-black">
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <ShowcaseContainer/>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default MainContent;