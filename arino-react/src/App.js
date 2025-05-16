import { Route, Routes } from 'react-router-dom';
import AboutPage from './components/Pages/AboutPage';
import BlogPage from './components/Pages/BlogPage';
import BlogDetailsPage from './components/Pages/BlogDetailsPage';
import ContactPage from './components/Pages/ContactPage';
import ErrorPage from './components/Pages/ErrorPage';
import Home from './components/Pages/Home';
import PortfolioDetailsPage from './components/Pages/PortfolioDetailsPage';
import ServiceDetailsPage from './components/Pages/ServiceDetailsPage';
import ServicesPage from './components/Pages/ServicesPage';
import TeamPage from './components/Pages/TeamPage';
import PortfolioPage from './components/Pages/PortfolioPage';
import TeamDetails from './components/Pages/TeamDetails';
import PhotographyAgencyHome from './components/Pages/PhotographyAgencyHome';
import CreativePortfolioHome from './components/Pages/CreativePortfolioHome';
import DigitalAgencyHome from './components/Pages/DigitalAgencyHome';
import MarketingAgencyHome from './components/Pages/MarketingAgencyHome';
import ShowcasePortfolioHome from './components/Pages/ShowcasePortfolioHome';
import CaseStudyShowcaseHome from './components/Pages/CaseStudyShowcaseHome';
import Layout from './components/Layout';
import CaseStudyDetailsPage from './components/Pages/CaseStudyDetailsPage';
import FaqPage from './components/Pages/FaqPage';
import FreelancerAgencyHome from './components/Pages/FreelancerAgencyHome';
import ArchitectureAgencyHome from './components/Pages/ArchitectureAgencyHome';
import CreativeSolutionHome from './components/Pages/CreativeSolutionHome';
import PersonalPortfolioHome from './components/Pages/PersonalPortfolioHome';
import VideoShowcaseHome from './components/Pages/VideoShowcaseHome';
// import TechnologyPage from './components/Pages/TechnologyPage';
import TechnologyController from './components/Pages/TechnologyController';
import AISimulation from './components/Pages/AISimulation';
// import SpacePortfolio from './components/Pages/SpacePortfolio';
import SpacePortfolioController from './components/Pages/spaceportfolioController';
import UpcomingEvents from './components/Pages/Upcomingevents';
import CaseStudyDetails from './components/Pages/CaseStudyDetails';
import GroundstoragePortfolio from './components/Pages/GroundstoragePortfolio';
import UnderwaterPortfolio from './components/Pages/UnderwaterPortfolio';

// Admin imports
import AdminLogin from '../src/AdminDashboard/pages/AdminLogin';
import AdminDashboard from '../src/AdminDashboard/pages/AdminDashboard';
import PrivateRoute from './AdminDashboard/components/PrivateRoute';
import HomeDashboard from './AdminDashboard/components/Home';
import ContactList from './AdminDashboard/components/ContactList';
import SubscriptionList from './AdminDashboard/components/SubscriptionList';
import VisitorsList from './AdminDashboard/components/VisitorsList';

function App() {
  return (
    <>
      <Routes>
        {/* Main Layout with Default Header */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="photography-agency" element={<PhotographyAgencyHome />} />
          <Route path="digital-agency" element={<DigitalAgencyHome />} />
          <Route path="marketing-agency" element={<MarketingAgencyHome />} />
          <Route path="freelancer-agency" element={<FreelancerAgencyHome />} />
          <Route path="architecture-agency" element={<ArchitectureAgencyHome />} />
          <Route path="creative-solution" element={<CreativeSolutionHome />} />
          <Route path="personal-portfolio" element={<PersonalPortfolioHome />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="service" element={<ServicesPage />} />
          <Route path="service/:serviceDetailsId" element={<ServiceDetailsPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:portfolioDetailsId" element={<PortfolioDetailsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:blogDetailsId" element={<BlogDetailsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="team/:teamDetails" element={<TeamDetails />} />
          <Route path="faq" element={<FaqPage />} />
          {/* <Route path="technology" element={<TechnologyPage />} /> */}
          <Route path="technology" element={<TechnologyController />} />
          <Route path="ai-simulation" element={<AISimulation />} />
          {/* <Route path="spaceportfolio" element={<SpacePortfolio />} /> */}
          <Route path="spaceportfolio" element={<SpacePortfolioController />} />
          <Route path="ground-storage" element={<GroundstoragePortfolio />} />
          <Route path="underwater-portfolio" element={<UnderwaterPortfolio />} />
          <Route path="upcoming-events" element={<UpcomingEvents />} />
          <Route path="case-study-details" element={<CaseStudyDetails />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<PrivateRoute />}>
          <Route element={<AdminDashboard />}>
            <Route index element={<HomeDashboard />} />
            <Route path="admin-home" element={<HomeDashboard />} />
            <Route path="admin-contact" element={<ContactList />} />
            <Route path="admin-subscribe" element={<SubscriptionList />} />
            <Route path="admin-visitors" element={<VisitorsList />} />
          </Route>
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
