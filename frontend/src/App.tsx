import Header from "./components/Header";
import SalesCard from "./components/SalesCard";

import "./App.css";

const App = () => {
  return (
    <>
      <Header />

      <main>
        <section id="sales">
          <div className="dsmeta-container">
            <SalesCard />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
