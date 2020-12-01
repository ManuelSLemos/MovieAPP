import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import { addUser } from '../../store/actions/LoginActions';

class Register extends Component {
    constructor(props){
        super(props);

        this.state = { 
            email: '',
            pwd: '',
            pwd2: '',
            ver: false,
            evalue: '',
        };
    }

    onHandlePass = (e) => {
        this.setState({ pwd: e.target.value }, () => {
            if( this.state.pwd.length < 6 ){
                this.setState({ evalue: 'DEBIL'})
            }
            else if( this.state.pwd.length >= 6 && this.state.pwd.length < 9 ){
                this.setState({ evalue: 'MEDIO'})
            }
            else {
                this.setState({ evalue: 'FUERTE'})
            }
        });
    }

    onRegister = () => {
        const { email, pwd, pwd2, evalue } = this.state;

        const user = this.props.users.filter( user => user.email === email);

        const condition = user.length !== 0 && 
                                email !== '' && 
                                pwd === pwd2 && 
                                evalue !== 'DEBIL';

        
        const id = this.props.users.sort( (a, b)=> a.id < b.id)[0].id + 1;

        if ( condition ) {
            const payload = {
                id,
                email,
                pwd,
                try: 3,
                block: false,
                date_block: ''
            }
            this.props.addUser( payload );
        }

    }

    render() {
        return (
            <Fragment>
                <input type="text" onChange={ e => this.setState({ email: e.target.value }) } />
                <p> {this.state.evalue} </p>
                <input 
                    type={ this.state.ver ? 'text' : 'password'} 
                    onChange={ e => this.onHandlePass(e) } 
                />
                <input 
                    type={ this.state.ver ? 'text' : 'password'} 
                    onChange={ e => this.setState({ pwd2: e.target.value })} 
                />

                <button onClick={ () => this.setState( prevState => ({ ver: !prevState.ver})) } > Ver Contraseña </button>
                <button onClick={ () => this.onRegister() }> Registro </button>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ login }) => {
    return {
        users: login.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: payload => dispatch(addUser(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register) ;