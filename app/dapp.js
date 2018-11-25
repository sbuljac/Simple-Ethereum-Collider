import React from 'react';
import ReactDOM from 'react-dom';
import {Tabs, Tab} from 'react-bootstrap';

import Lottery from './components/lottery';

import './dapp.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: global.web3js ? undefined : 'MetaMask/Mist is not available',
      activeKey: 0,
    };
  }

  handleSelect(key) {
    this.setState({ activeKey: key });
  }

  render() {
    // const ensEnabled = EmbarkJS.Names.currentNameSystems && EmbarkJS.Names.isAvailable();
    if (this.state.error) {
      return (<div>
        <div>{this.state.error}</div>
      </div>);
    }
    return (<div>
      <Tabs onSelect={() => this.handleSelect()} activeKey={this.state.activeKey} id="uncontrolled-tab-example">
        <Tab eventKey={0} title={'Simple Ethereum Collider'}>
          <Lottery/>
        </Tab>
      </Tabs>
    </div>);
  }
}

ReactDOM.render(<App></App>, document.getElementById('app'));
