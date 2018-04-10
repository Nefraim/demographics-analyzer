import React from 'react';

function onNameChange(event) {
    this.setState({ name: event.target.value });
}

function onEmailChange(event) {
    this.setState({ email: event.target.value });
}

function onPasswordChange(event) {
    this.setState({ password: event.target.value });
}

function setAlert (msg, type) {
    this.setState({ 
        alertMsg: msg,
        alertType: type
    });
}

const Password = ({ctx}) =>
    <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={(e) => onPasswordChange.call(ctx, e)} 
            className="b pa2 input-reset ba bg-transparent hover-bg-navy hover-white w-100" 
            type="password" 
            name="password"  
            id="password"
            required
        />
    </div>;

const Email = ({ctx}) => 
    <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input 
            onChange={(e) => onEmailChange.call(ctx, e)} 
            className="pa2 input-reset ba bg-transparent hover-bg-navy hover-white w-100" 
            type="email" 
            name="email-address"  
            id="email-address"
        />
    </div>;

const Name = ({ctx}) => 
    <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input 
            onChange={(e) => onNameChange.call(ctx, e)} 
            className="pa2 input-reset ba bg-transparent hover-bg-navy hover-white w-100" 
            type="text"
            name="name"  
            id="name"
        />
    </div>;

const SubmitButton = ({value}) => 
    <div className="">
        <input
        className="b mv3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
        type="submit" 
        value={value}
        />
    </div>




export default {
    onNameChange,
    onEmailChange,
    onPasswordChange,
    setAlert,
    Password,
    Email,
    Name,
    SubmitButton
}