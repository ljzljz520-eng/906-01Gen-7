import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import TutorialList from "@/pages/TutorialList";
import TutorialDetail from "@/pages/TutorialDetail";
import Publish from "@/pages/Publish";
import Profile from "@/pages/Profile";
import Topics from "@/pages/Topics";
import TopicDetail from "@/pages/TopicDetail";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-rice-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutorials" element={<TutorialList />} />
            <Route path="/tutorials/:id" element={<TutorialDetail />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:id" element={<TopicDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
