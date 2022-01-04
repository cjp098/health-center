import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthOnChange'
import { lazy, Suspense } from 'react';

//** Doesnt Required Auth*/
const Login = lazy(() => import("./pages/Login"))
const PrivateRoute = lazy(() => import("./components/Layout/PriveRoute"))

//**Require Auth Section */
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Appointments = lazy(() => import("./pages/Appointments"))
const Patients = lazy(() => import("./pages/Patients"))
const PatientsInformation = lazy(() => import("./pages/PatientsInformation"))
const Staff = lazy(() => import("./pages/Staff"))
const StaffInformation = lazy(() => import("./pages/StaffInformation"));
const UpdateStaff = lazy(() => import("./pages/UpdateStaff"));
const UpdatePatient = lazy(() => import("./pages/UpdatePatient"))
const Complaints = lazy(() => import("./pages/Complaints"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          Loading....
        </div>
      }
    >
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/dashboard" title="Dashboard" component={Dashboard} />
            <PrivateRoute exact path="/appointments" title="Appointments" component={Appointments} />
            <PrivateRoute exact path="/staff" title="Staff Management" component={Staff} />
            <PrivateRoute exact path="/patients" title="Patients Management" component={Patients} />
            <PrivateRoute exact path="/staff-info" title="Staff Information" component={StaffInformation} />
            <PrivateRoute exact path="/updateStaff" title="Update Staff Information" component={UpdateStaff} />
            <PrivateRoute exact path="/patients-information" title="Patients Information" component={PatientsInformation} />
            <PrivateRoute exact path="/complaints" title="Complaints" component={Complaints} />
            <PrivateRoute exact path="/updatePatient" title="Update Patient Information" component={UpdatePatient} />
          </Switch>
        </Router>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
