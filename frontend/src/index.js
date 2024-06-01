import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//Dananjaya
import RootLayout from './layout/root.layout';
import SignInPage from './pages/login/sign-in.page';
import SignUpPage from './pages/sign-up.page';
import HomePage from './pages/home/home.page';
import ResetPwd from './pages/login/components/ResetPwd';
import MembersTable from './pages/useradmin/admin.allusers';
import Login from './pages/login/components/Login';
import Profile from './pages/profile/profile';
import AgencyRegister from './pages/agencyRegister/AgencyRegister';
import AgencyList from './pages/allagencies/AgencyList';
import AgencyProfile from './pages/allagencies/AgencyProfile';
import UpdateAgency from './pages/allagencies/components/UpdateAgency';
import Dashboard from './pages/useradmin/Dashboard';
import { UserUpdate } from './pages/useradmin/components/UpdateUser';
import PrivateRoute from './PrivateRoute';

//Deanne
import PackagesHomePage from './pages/hotel packages/packages home/home.page';
import PackagesPage from './pages/hotel packages/all packages/hotel.packages';
import PackageAdd from './pages/hotel packages/add packages/add.package.page';
import PackageTable from './pages/hotel packages/packages_display_admin/packages.table.page';
import Custompackage from './pages/hotel packages/custom packages/Custompackage';
import DisplayCutomPackages from './pages/hotel packages/custom packages/Show';
import HotelBookingForm from './pages/hotel packages/booking packages/hotel_booking/hotel.booking';
import CustomBookingForm from './pages/hotel packages/booking packages/custom_booking/custom.booking';
import CustomBookingDisplay from './pages/hotel packages/booking packages/custom_booking/CustomBookingDisplay';
import HotelBookingDisplay from './pages/hotel packages/booking packages/hotel_booking/HotelBookingDisplay';

//Ishara
import AddFeedback from './pages/feedback/components/AddFeedback';
import AllFeedback from './pages/feedback/components/AllFeedback';
import AllFaq from './pages/faq/components/AllFaq';
import AddFaq from './pages/faq/components/AddFaq';
import MyFeedback from './pages/feedback/components/MyFeedback';
import UpdateFeedback from './pages/feedback/components/UpdateFeedback';
import Faq from './pages/faq/components/Faq';
import UpdateFaq from './pages/faq/components/UpdateFaq';
import AddagencyFeedback from './pages/agencyfeedback/components/Addagencyfeedback';
import Uniqueuserfeedback from './pages/agencyfeedback/components/Uniqueuserfeedbacks';

import Uniqueagencyfeedback from './pages/agencyfeedback/components/Uniqueagencyfeedbacks';
import AddroomFeedback from './pages/roomfeedback/AddRoomFeedback';
import AllRoomFeedback from './pages/roomfeedback/AllRoomFeedback';
import MyRoomFeedback from './pages/roomfeedback/MyRoomFeedback';
//ishara finance
import FinanceReport from './pages/finance/IncomeReport';



//Dushan
import ResidenceHome from './pages/Residence-homepage/Residence-homepage';
import Residencebooking from './pages/Residence-booking-page/residencebooking';
import AddRooms from './pages/Room-management/AddRooms';
import RoomPage from './pages/Room-management/RoomPage';
import UpdateRoomForm from './pages/Room-management/UpdateRoom';
import AvailableRooms from './pages/Residence-booking-page/Residence-booking-components/AvailableRooms';
import ReservationForm from './pages/Residence-booking-page/Residence-booking-components/Bookingform';
import ReservationPage from './pages/Reservation-management/reservationPage';
import MyReservation from './pages/Residence-booking-page/Residence-booking-components/myReservation';
import ResidenceAdmin from './pages/Residence-admin/residenceAdmin';

//Sayuni
import AddForm from './pages/AddActivity/AddForm';
import UpdateForm from './pages/UpdateActivity/UpdateForm';
import ViewActivity from './pages/AllActivity/ViewActivity';
import HomeActivity from './pages/HomeActivity/HomeActivity';
import ReservationActivity from './pages/ReservationActivity/ReservationActivity';
import ConfirmReservation from './pages/ConfirmReservation/ConfirmReservation';
import ViewActivityReservation from './pages/AllActivity/ViewActivityReservation';

//Sathma
import Spa from './pages/spaPackages/spa';
import SpaUser from './pages/spaPackages/spaUser';
import AppointmentView from './pages/spaPackages/appointmentView';
import SpaUserList from './pages/spaPackages/spaUserList';

//Yasiru
import AgencyDetails from './pages/travelAgency/client/agencyDetails';
import AgencyList2 from './pages/travelAgency/client/agencyList';
import AgencySendRequest from './pages/travelAgency/client/agencySendRequest';
import AgencyRequestList from './pages/travelAgency/agency/agencyRequestList';
import AgencyRequestDetails from './pages/travelAgency/agency/agencyRequestDetails';
import AgencySentRequestList from './pages/travelAgency/client/agencySentRequestList';
import AgencySentRequestDetails from './pages/travelAgency/client/agencySentRequestDetails';
import AgencyCreatePackage from './pages/travelAgency/agency/agencyCreatePackage';
import AgencyMyPackage from './pages/travelAgency/agency/agencyMyPackage';
import AgencyPackageBooking from './pages/travelAgency/client/agencyPackageBooking';
import AgencyHome from './pages/travelAgency/agency/agencyHome';
import AgencyPackageDetails from './pages/travelAgency/agency/agencyPackageDetails';

//Vilan
import EventHeader from './pages/EventManagement/Components/EventHeader';
import AddEvent from './pages/EventManagement/Events/AddEvent';
import EventList from './pages/EventManagement/Events/EventList';
import UpdateEvent from './pages/EventManagement/Events/UpdateEvent';
import AddOption from './pages/EventManagement/Options/AddOption';
import OptionList from './pages/EventManagement/Options/OptionList';
import ViewEvent from './pages/EventManagement/Events/ViewEvent';
import EventHome from './pages/EventManagement/Events/EventHome';
import UpdateOption from './pages/EventManagement/Options/UpdateOption';
import MyEvents from './pages/EventManagement/Events/MyEvents';
import BuyEventTicket from './pages/EventManagement/Tickets/BuyEventTicket';
import EventReports from './pages/EventManagement/Events/EventReports';
import EventAvailableRooms from './pages/EventManagement/Events/EventAvailableRooms';
import EventRoomBooking from './pages/EventManagement/Events/EventRoomBooking';
import TestPage from './pages/EventManagement/Components/TestPage';

import store from './store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
        children: [
          {
            path: '/sign-in/',
            element: <Login />,
          },
          {
            path: '/sign-in/reset',
            element: <ResetPwd />,
          },
        ],
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/agencyregister',
        element: <PrivateRoute component={AgencyRegister} />,
      },
      {
        path: '/all',
        element: <PrivateRoute component={MembersTable} />,
      },
      {
        path: '/profile',
        element: <PrivateRoute component={Profile} />,
      },
      {
        path: '/agency',
        element: <AgencyList />,
      },
      {
        path: '/:id',
        element: <PrivateRoute component={AgencyProfile} />,
      },
      {
        path: 'update/:id',
        element: <PrivateRoute component={UpdateAgency} />,
      },
      {
        path: '/admindashboard',
        element: <PrivateRoute component={Dashboard} />,
      },
      {
        path: 'updateuser/:id',
        element: <PrivateRoute component={UserUpdate} />,
      },

      //Deanne
      {
        path: '/hotel/:id/:price',
        element: <PrivateRoute component={HotelBookingForm} />,
      },
      {
        path: '/hotelbookingdisplay',
        element: <PrivateRoute component={HotelBookingDisplay} />,
      },

      {
        path: '/cus/:id/:price',
        element: <PrivateRoute component={CustomBookingForm} />,
      },
      {
        path: '/cusbokingdisplay',
        element: <PrivateRoute component={CustomBookingDisplay} />,
      },

      {
        path: '/packagesHome',
        element: <PackagesHomePage />,
      },
      {
        path: '/customcreated',
        element: <PrivateRoute component={DisplayCutomPackages} />,
      },

      {
        path: '/custom_1',
        element: <PrivateRoute component={Custompackage} />,
      },

      {
        path: '/packages',
        element: <PackagesPage />,
      },

      {
        path: '/add',
        element: <PrivateRoute component={PackageAdd} />,
      },
      {
        path: '/table',
        element: <PrivateRoute component={PackageTable} />,
      },
      {
        path: '/update',
        element: <updatePack />,
      },

      //Ishara
      {
        path: '/feedback',
        element: <AllFeedback />,
      },
      {
        path: '/addfeedback',
        element: <AddFeedback />,
      },
      {
        path: '/myfeedback',
        element: <MyFeedback />,
      },
      {
        path: '/faq',
        element: <AllFaq />,
      },
      {
        path: '/addfaq',
        element: <AddFaq />,
      },
      {
        path: '/myfaq',
        element: <Faq />,
      },
      {
        path: '/updatefeedback',
        element: <UpdateFeedback />,
      },
      {
        path: '/updatefaq',
        element: <UpdateFaq />,
      },
      {
        path: '/addagencyfeedback/:agencyId',
        element: <AddagencyFeedback />,
      },
      {
        path: '/myagencyfeedback',
        element: <Uniqueuserfeedback />,
      },
      {
        path: '/uniqueagency/:id',
        element: <Uniqueagencyfeedback />,
      },
      {
        path: '/financereport',
        element: <FinanceReport />,
      },
      {
        path: '/addroomfeedback',
        element: <AddroomFeedback />,
      },
      {
        path: '/allroomfeedback',
        element: <AllRoomFeedback />,
      },
      {
        path: '/myroomfeedback',
        element: <MyRoomFeedback />,
      },

      //Dushan
      {
        path: '/residenceHome',
        element: <ResidenceHome />,
      },
      {
        path: '/residenceBooking',
        element: <PrivateRoute component={Residencebooking} />,
      },
      {
        path: '/AddRoom',
        element: <PrivateRoute component={AddRooms} />,
      },
      {
        path: '/RoomPage',
        element: <PrivateRoute component={RoomPage} />,
      },
      {
        path: '/UpdateRoom/:id',
        element: <PrivateRoute component={UpdateRoomForm} />,
      },
      {
        path: '/Available',
        element: <AvailableRooms />,
      },
      {
        path: '/Booking/:id',
        element: <PrivateRoute component={ReservationForm} />,
      },
      {
        path: '/allReservations',
        element: <PrivateRoute component={ReservationPage} />,
      },
      {
        path: '/myReservations/:id',
        element: <PrivateRoute component={MyReservation} />,
      },
      {
        path: '/residenceAdmin',
        element: <PrivateRoute component={ResidenceAdmin} />,
      },

      //Sayuni
      {
        path: '/activity',
        element: <ViewActivity />,
      },
      {
        path: '/activity/add',
        element: <PrivateRoute component={AddForm} />,
      },
      {
        path: '/activity/update/:id',
        element: <PrivateRoute component={UpdateForm} />,
      },
      {
        path: '/activity/home',
        element: <HomeActivity />,
      },
      {
        path: '/activity/apply/:id',
        element: <PrivateRoute component={ReservationActivity} />,
      },
      {
        path: '/activity/confirmactivity/:id',
        element: <PrivateRoute component={ConfirmReservation} />,
      },
      {
        path: '/activity/allActivityReservation',
        element: <PrivateRoute component={ViewActivityReservation} />,
      },

      //Sathma
      {
        path: '/spa',
        element: <Spa />,
      },
      {
        path: '/spaUser',
        element: <PrivateRoute component={SpaUser} />,
      },
      {
        path: '/appointmentView',
        element: <PrivateRoute component={AppointmentView} />,
      },
      {
        path: '/spaUserList',
        element: <PrivateRoute component={SpaUserList} />,
      },

      //Yasiru - client
      {
        path: '/AgencySendRequest/:agencyId',
        element: <AgencySendRequest />,
      },
      {
        path: '/AgencyList/',
        element: <AgencyList2 />,
      },
      {
        path: '/AgencyDetails/:agencyId',
        element: <AgencyDetails />,
      },
      {
        path: '/AgencySentRequestDetails/:requestId',
        element: <AgencySentRequestDetails />,
      },
      {
        path: '/AgencySentRequestList/',
        element: <AgencySentRequestList />,
      },
      {
        path: 'AgencyPackageBooking/:packageId',
        element: <AgencyPackageBooking />,
      },

      //Yasiru - agency view
      {
        path: '/AgencyRequestList/:agencyId',
        element: <AgencyRequestList />,
      },
      {
        path: '/AgencyRequestDetails/:requestId',
        element: <AgencyRequestDetails />,
      },
      {
        path: '/AgencyCreatePackage/:agencyId/:packageId',
        element: <AgencyCreatePackage />,
      },
      {
        path: '/AgencyPackageDetails/:packageId',
        element: <AgencyPackageDetails />,
      },
      {
        path: '/AgencyHome/',
        element: <AgencyHome />,
      },

      //Vilan
      {
        path: '/eventHome',
        element: <EventHome />,
      },
      {
        path: '/events',
        element: <EventList />,
      },
      {
        path: '/addEvent',
        element: <AddEvent />,
      },
      {
        path: '/updateEvent/:eventId',
        element: <UpdateEvent />,
      },
      {
        path: '/addOption',
        element: <AddOption />,
      },
      {
        path: '/allOptions',
        element: <OptionList />,
      },
      {
        path: '/viewEvent/:eventId',
        element: <ViewEvent />,
      },
      {
        path: '/updateOption/:optionId',
        element: <UpdateOption />,
      },
      {
        path: '/test',
        element: <TestPage />,
      },
      {
        path: '/myEvents',
        element: <MyEvents />,
      },
      {
        path: '/buyEventTicket/:eventId',
        element: <BuyEventTicket />,
      },
      {
        path: '/eventReports',
        element: <EventReports />,
      },
      {
        path: '/availableRooms/:eventId',
        element: <EventAvailableRooms />,
      },
      {
        path: '/reservationForm/:id/:eventId',
        element: <EventRoomBooking />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
