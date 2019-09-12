// Compnents for routes
import HomeView from "../views/home";
import CommitteeView from "../views/committees";
import RoomView from "../views/rooms";
import ScheduleView from "../views/schedule";
import ScheduleModifyView from "../views/schedule-modify";
import SponsorView from "../views/sponsors";
import SponsorAddView from "../views/sponsor-add";
import SponsorRemoveView from "../views/sponsor-remove";
import JobView from "../views/jobs";
import AttendeeView from "../views/attendees";
import AttendeeAddView from "../views/attendee-add";
import AccountingView from "../views/accounting";

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
