import { Routes, Route } from "react-router";
import HomePage from "../pages/home";
import ElementTribe from "../pages/fun";
import EnsPage from "../pages/ens";
import AboutPage from "../pages/about";
import BeatsPage from "../pages/beats";
import ClaimPage from "../pages/claim";
import CouncilPage from "../pages/council";
import FAQPage from "../pages/faq";
import ProfilePage from "../pages/profile";
import RafflesPage from "../pages/raffles";
import RafflesAdminPage from "../pages/rafflesadmin";
import RaffleOpenPage from "../pages/rafflesopened";
import StakingPage from "../pages/staking";
import WallpaperPage from "../pages/wallpaper";
import WinnersPage from "../pages/winners";
import CheckerPage from "../pages/checker";
import Layout from '../components/Layout';
import MoltenPage from '../pages/molten';
import Element19Page from '../pages/element19';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/fun" element={<ElementTribe />} />
        <Route path="/ens" element={<EnsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/beats" element={<BeatsPage />} />
        <Route path="/claim" element={<ClaimPage />} />
        <Route path="/council" element={<CouncilPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/raffles" element={<RafflesPage />} />
        <Route path="/raffles/admin" element={<RafflesAdminPage />} />
        <Route path="/raffles/:id" element={<RaffleOpenPage />} />
        <Route path="/staking" element={<StakingPage />} />
        <Route path="/wallpaper" element={<WallpaperPage />} />
        <Route path="/winners" element={<WinnersPage />} />
        <Route path="/checker" element={<CheckerPage />} />
        <Route path="/molten" element={<MoltenPage />} />
        <Route path="/element19" element={<Element19Page />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
