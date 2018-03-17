import React from "react";

// Screens Main StackNavigator
import Login from "../../screens/Login/";
import SignUp from "../../screens/SignUp/";
import ForgotPassword from "../../screens/ForgotPassword";
import Walkthrough from "../../screens/Walkthrough/";
import TimeEntry from "../../screens/TimeEntry/";

// Screens Drawer DrawerNavigator
import Home from "../../screens/Home/";
import Missions from "../../screens/Missions/";
import Trainings from "../../screens/Trainings/";
import TimeTracking from "../../screens/TimeTracking/";
import Mapping from "../../screens/Mapping/";
import CallOuts from "../../screens/CallOuts/";
import Social from "../../screens/Social/";
import Settings from "../../screens/Settings";

// Other components
import Sidebar from "../../screens/Sidebar";

import { StackNavigator, DrawerNavigator } from "react-navigation";

const HomeDrawer = DrawerNavigator(
  {
    Home: { screen: Home },
    Missions: { screen: Missions },
    Trainings: { screen: Trainings },
    TimeTracking: { screen: TimeTracking },
    Mapping: { screen: Mapping },
    CallOuts: { screen: CallOuts },
    Social: { screen: Social },
    Settings: { screen: Settings }
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <Sidebar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword },
    Walkthrough: { screen: Walkthrough },
    TimeEntry: { screen: TimeEntry },
    HomeDrawer: { screen: HomeDrawer }
  },
  {
    index: 0,
    initialRouteName: "HomeDrawer",
    headerMode: "none"
  }
);

export default AppNavigator
