import "./styles.css";
import NextLaunch from "./containers/nextLaunch.js";

export default function App() {
  return (
    <div className="App">
      <h1 className="bg-navy text-white display-2 p-3">Next Launch!</h1>
      <NextLaunch />
    </div>
  );
}
