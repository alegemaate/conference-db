import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './header'

import HomeView from './views/home'
import CommitteeView from './views/committees'
import RoomView from './views/rooms'
import ScheduleView from './views/schedule'
import ScheduleModifyView from './views/schedule-modify'
import SponsorView from './views/sponsors'
import SponsorAddView from './views/sponsor-add'
import SponsorRemoveView from './views/sponsor-remove'
import JobView from './views/jobs'
import AttendeeView from './views/attendees'
import AttendeeAddView from './views/attendee-add'
import AccountingView from './views/accounting'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <main>
          <Switch>
            <Route exact path="/" component={HomeView}/>
            <Route path="/home" component={HomeView}/>
            <Route path="/committee" component={CommitteeView}/>
            <Route path="/rooms" component={RoomView}/>
            <Route path="/schedule" component={ScheduleView}/>
            <Route path="/schedule-change" component={ScheduleModifyView}/>
            <Route path="/sponsors" component={SponsorView}/>
            <Route path="/sponsor-add" component={SponsorAddView}/>
            <Route path="/sponsor-remove" component={SponsorRemoveView}/>
            <Route path="/jobs" component={JobView}/>
            <Route path="/attendees" component={AttendeeView}/>
            <Route path="/attendee-add" component={AttendeeAddView}/>
            <Route path="/accounting" component={AccountingView}/>
          </Switch>
        </main>
      </div>
    )
  }
}
