import Header from "./components/Header/Header";
import MainContent from "./components/Main/MainContent";
import Footer from "./components/Footer/Footer";


const App: React.FC = () => {
  return (
    <div className="h-screen bg-background flex flex-col justify-between">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;