import React, { Component } from 'react';
import { BarLoader } from 'react-spinners';
import Alert from '../Alert/Alert';
import Form from '../Form/Form';
import './Register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            alertMsg: '',
            alertType: '',
            loading: false
        }
    }

    onSubmitRegister = (e) => {
        this.setState({ loading: true });
        e.preventDefault();
        fetch('https://arcane-island-38870.herokuapp.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(resp => {
            this.setState({ loading: false });
            if(resp.status !== 400){
                Form.setAlert.call(this, resp.statusText, 'info');
            } else {
                Form.setAlert.call(this, resp.statusText, 'error');
            }
        })
        .catch(err => {
            this.setState({ loading: false });
            Form.setAlert.call(this, 'Server not responding.', 'error');
        });;
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="mv6 w-100 w-50-m w-25-l mw center">
                <main className="pa4 mh2 black-80 shadow-4 br2 ba b--black-10 ">
                    <div className="w-100 loader">
                        <BarLoader width={100} widthUnit="%"
                            color={'rgb(13, 84, 157)'} 
                            loading={this.state.loading} 
                        />
                    </div>
                    <form onSubmit={this.onSubmitRegister} className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 pb0 mt1 mh0">
                            <legend className="f3 fw6 ph0 mh0">Register</legend>
                            <Form.Name ctx={this}/>
                            <Form.Email ctx={this}/>
                            <Form.Password ctx={this}/>
                        </fieldset>
                        <Alert type={this.state.alertType} message={this.state.alertMsg}/>
                        <Form.SubmitButton value={'Register'}/>
                        <div className="lh-copy">
                            <a onClick={() => onRouteChange('signin')} className="f6 link dim black dib pointer">Sign In</a>
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default Register;