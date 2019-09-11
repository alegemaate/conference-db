// Compnents for routes
import HomeView from "../components/views/home";
import CommitteeView from "../components/views/committees";
import RoomView from "../components/views/rooms";
import ScheduleView from "../components/views/schedule";
import ScheduleModifyView from "../components/views/schedule-modify";
import SponsorView from "../components/views/sponsors";
import SponsorAddView from "../components/views/sponsor-add";
import SponsorRemoveView from "../components/views/sponsor-remove";
import JobView from "../components/views/jobs";
import AttendeeView from "../components/views/attendees";
import AttendeeAddView from "../components/views/attendee-add";
import AccountingView from "../components/views/accounting";

// Routes for nav
export const routes = [
  { path: "/", name: "Home", exact: true, inNav: false, component: HomeView },
  {
    path: "/home",
    name: "Home",
    exact: false,
    inNav: true,
    component: HomeView
  },
  {
    path: "/committee",
    name: "Committee",
    exact: false,
    inNav: true,
    component: CommitteeView
  },
  {
    path: "/rooms",
    name: "Rooms",
    exact: false,
    inNav: true,
    component: RoomView
  },
  {
    path: "/schedule",
    name: "Schedule",
    exact: false,
    inNav: true,
    component: ScheduleView
  },
  {
    path: "/schedule-change",
    name: "Schedule Modify",
    exact: false,
    inNav: false,
    component: ScheduleModifyView
  },
  {
    path: "/sponsors",
    name: "Sponsors",
    exact: false,
    inNav: true,
    component: SponsorView
  },
  {
    path: "/sponsor-add",
    name: "Sponsors Add",
    exact: false,
    inNav: false,
    component: SponsorAddView
  },
  {
    path: "/sponsor-remove",
    name: "Sponsors Remove",
    exact: false,
    inNav: false,
    component: SponsorRemoveView
  },
  {
    path: "/jobs",
    name: "Jobs",
    exact: false,
    inNav: true,
    component: JobView
  },
  {
    path: "/attendees",
    name: "Attendees",
    exact: false,
    inNav: true,
    component: AttendeeView
  },
  {
    path: "/attendee-add",
    name: "Attendees Add",
    exact: false,
    inNav: false,
    component: AttendeeAddView
  },
  {
    path: "/accounting",
    name: "Accounting",
    exact: false,
    inNav: true,
    component: AccountingView
  }
];
