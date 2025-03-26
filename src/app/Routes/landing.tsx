import MainContent from "../../components/ui/Main/MainContent";
import LandingLayout from "../../components/layouts/landing-layout";

const LandingRoute: React.FC = () => {
  return (
    <LandingLayout>
      <div className="h-screen bg-background flex flex-col justify-between">
        <MainContent />
      </div>
    </LandingLayout>
  );
};

export default LandingRoute;
