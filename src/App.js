// App.js
import React from 'react';
import HomePage from './HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameSelectionPage from './GameSelectionPage';
import LeagueSelectionPage from './LeagueSelectionPage';
import WhoAmI from './WhoAmI';
import TeamsAndMatches from './TeamsAndMatches';
import NewsDetails from './pages/NewsDetails';
import Layout from './Layout';
import CitiesPage from "./pages/CitiesPage";
import HostCities from "./pages/HostCities";
import CityStadiums from "./pages/CityStadiums";
import StadiumDetail from "./pages/StadiumDetail";
import AdditionalCityInfo from "./pages/AdditionalCityInfo";
import Login from './Signup/Login';
import Signup from './Signup/Signup';
//amjad
import Overview from './overview/overview';
import Overview2 from './overview/overview2';
import WorldCupTimeline from './overview/worldCups';
import Vision from './overview/vision';
import FuturePlans from './overview/future';
import Goals from './overview/goals';
import Statistics from './overview/statistics';
import Info from './overview/info';
import Vision2030 from './overview/Vision2030';


function App() {
  return (
 
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/play-zone" element={<GameSelectionPage />} />
        <Route path="/leagues" element={<LeagueSelectionPage />} />
        <Route path="/quiz/:leagueName" element={<WhoAmI />} />
        <Route path="/teams-and-matches" element={<TeamsAndMatches />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/cities" element={<HostCities />} />                        
        <Route path="/stadiums/:cityName" element={<CityStadiums />} />
        <Route path="/stadiums/:cityName/:stadiumId" element={<StadiumDetail />} />
        <Route path="/additionalcities/:cityName" element={<AdditionalCityInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/overview2" element={<Overview2 />} />
        <Route path="/worldCups" element={<WorldCupTimeline />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/future" element={<FuturePlans />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/info" element={<Info />} />
        <Route path="/vision2030" element={<Vision2030 />} />

      </Route>
    </Routes>
 
  );
}

export default App;