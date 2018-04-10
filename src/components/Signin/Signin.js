import React, { Component } from 'react';
import { BarLoader } from 'react-spinners';
import './Signin.css';
import Form from '../Form/Form';
import Alert from '../Alert/Alert';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            alertMsg: '',
            alertType: '',
            loading: false
        }
    }

    onSubmitSignIn = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        fetch('https://arcane-island-38870.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(resp => {
            if(resp.status !== 400){
                return resp.json();
            } else {
                this.setState({ loading: false });
                Form.setAlert.call(this, resp.statusText, 'error');
            }
        })
        .then(data => {
              if (data && data.id) {
                  this.setState({ loading: false });
                  this.props.loadUser(data);
                  this.props.onRouteChange('home');
              }
        })
        .catch(err => {
            this.setState({ loading: false });
            Form.setAlert.call(this, 'Server not responding.', 'error');
        });
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
                    <form onSubmit={this.onSubmitSignIn} className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 pb0 mt1 mh0">
                            <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                            <Form.Email ctx={this} />
                            <Form.Password ctx={this}/>
                        </fieldset>
                        <Alert type={this.state.alertType} message={this.state.alertMsg}/>
                        <Form.SubmitButton value={'Sign in'}/>
                        <div className="lh-copy dib">
                            <a onClick={() => onRouteChange('register')} className="f6 link dim black dib pointer">Register</a>
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default Signin;