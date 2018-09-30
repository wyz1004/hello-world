import React, { Component } from 'react';
import{Router,Route,hashHistory,Redirect} from "react-router"
import PreviewReport from "./component/previewReport.js";
import ReportManagement from "./component/reportManagement/reportManagement.js";
import 'antd/dist/antd.css';
import ForeCast from './component/foreCast';
import Optimizaiton from "./component/optimization.js";
import MonitorsWater from "./component/energyMonitors/monitorsWater.js";
import MonitorsSteam from "./component/energyMonitors/monitorsSteam.js";
import MonitorsElectricity from "./component/energyMonitors/monitorsElectricity.js";
import Analysis from "./component/analysis.js";
import AirSystem from './component/airSystem.js';
import GmpPage from './component/GmpPage.js';
import EfficiencyReport from "./component/efficiencyReport/efficiencyReport.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={ hashHistory }>
          <Route path="/energyMonitors/water" component={MonitorsWater}></Route>
          <Redirect from="/energyMonitor" to="/energyMonitors/water" />
          <Route path="/energyMonitors/steam" component={MonitorsSteam}></Route>
          <Route path="/energyMonitors/electricity" component={MonitorsElectricity}></Route>

          <Route path="/optimization" component={Optimizaiton}></Route>
          <Route path="/forecast" component={ForeCast}></Route>
          <Route path="/reportManagement" component={ReportManagement}></Route>
          <Route path="/previewReport" component={PreviewReport}></Route>
          <Route path="/" component={ Analysis }></Route>
          <Route path="/airSystem" component={AirSystem}></Route>
          <Route path="/efficiencyReport" component={EfficiencyReport}></Route>
          <Route path="/gmpPage" component={GmpPage}></Route>

         
        </Router>
      </div>
    );
  }
}

export default App;
