import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Lottery extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isLooping: false,
      counter: 0,
      seed: '',
      address: '',
      privateKey: '',
      balance: '0',
    }
  }

  handleChange(e) {
    this.setState({ counter: 0, seed: e.target.value })
  }

  async generateNewKeyAndGetBalance(loop) {
    this.setState({ isLooping: loop });

    do {
      const nonce = this.state.counter++ || '';
      const privateKey = web3js.utils.soliditySha3(this.state.seed + nonce);
      const account = web3js.eth.accounts.privateKeyToAccount(privateKey);
      const balance = await web3js.eth.getBalance(account.address);
      this.setState({
        address: account.address,
        privateKey,
        balance,
      });
      await new Promise((r) => setTimeout(r, 500));
    } while (this.state.isLooping && this.state.balance === "0");
  }
  isValid() {
    return this.state.seed.length > 0;
  }

  render () {
    const valid = this.isValid();
    return (
      <Form>
        <FormGroup controlId="formBasicText" validationState={valid ? 'success' : 'error'}>
          <ControlLabel>Please enter seed value</ControlLabel>
          <FormControl
            componentClass="textarea"
            rows="3"
            value={this.state.seed}
            placeholder="Some text"
            onChange={(e) => this.handleChange(e)}
          />
          <FormControl.Feedback />
          <Button
            bsStyle="primary"
            onClick={() => this.generateNewKeyAndGetBalance(true)}
            disabled={!valid || this.state.isLooping}
          >
            Please loop
          </Button>
          <Button
            bsStyle="primary"
            onClick={() => this.generateNewKeyAndGetBalance(false)}
            disabled={!valid}
          >
            I feel lucky
          </Button>
          <h5>Address: {this.state.address}</h5>
          <h5>PrivateKey: {this.state.privateKey}</h5>
          <h5>Balance: {this.state.balance}</h5>
        </FormGroup>
      </Form>
    )
  }
}

export default Lottery