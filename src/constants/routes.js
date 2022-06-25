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
  { path: "/", name: "Home", exact: true, inNav: false, View: HomeView },
  {
    path: "/home",
    name: "Home",
    exact: false,
    inNav: true,
    View: HomeView,
  },
  {
    path: "/committee",
    name: "Committee",
    exact: false,
    inNav: true,
    View: CommitteeView,
  },
  {
    path: "/rooms",
    name: "Rooms",
    exact: false,
    inNav: true,
    View: RoomView,
  },
  {
    path: "/schedule",
    name: "Schedule",
    exact: false,
    inNav: true,
    View: ScheduleView,
  },
  {
    path: "/schedule-change",
    name: "Schedule Modify",
    exact: false,
    inNav: false,
    View: ScheduleModifyView,
  },
  {
    path: "/sponsors",
    name: "Sponsors",
    exact: false,
    inNav: true,
    View: SponsorView,
  },
  {
    path: "/sponsor-add",
    name: "Sponsors Add",
    exact: false,
    inNav: false,
    View: SponsorAddView,
  },
  {
    path: "/sponsor-remove",
    name: "Sponsors Remove",
    exact: false,
    inNav: false,
    View: SponsorRemoveView,
  },
  {
    path: "/jobs",
    name: "Jobs",
    exact: false,
    inNav: true,
    View: JobView,
  },
  {
    path: "/attendees",
    name: "Attendees",
    exact: false,
    inNav: true,
    View: AttendeeView,
  },
  {
    path: "/attendee-add",
    name: "Attendees Add",
    exact: false,
    inNav: false,
    View: AttendeeAddView,
  },
  {
    path: "/accounting",
    name: "Accounting",
    exact: false,
    inNav: true,
    View: AccountingView,
  },
];
