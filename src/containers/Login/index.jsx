import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { tryLogin } from '../../store/actions/LoginActions';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = { 
            email: '',
            pwd: '',
            message: '',
        }
    }

    onLogin = () => {
        const { email, pwd } = this.state;
        const { users, tryLogin } = this.props; 

        let message = '';
        const login = users.find( user => user.email === email);

        if( login.try > 0 && !login.block ){
            
            if ( login?.pwd !== pwd ) {
                const payload = {
                    id: login.id,
                    date: new Date().toJSON().slice(0,10).replace(/-/g,'/')
                }

                tryLogin( payload );

                message = ` No coincide email y/o contraseña. Intentos ${login.try}`;
            } else {
                message = 'Haz iniciado sesión correctamente';
            }

        }

        if ( login.block ){
            message = `Tienes un bloqueo de 24h desde: ${login.date_block}`;
        }

        this.setState({ message: message });
    }

    render() {

        const { message } = this.state; 

        return(
            <Fragment>
                <p> { message } </p>
                <input type="text" onChange={ e => this.setState({ email: e.target.value })} />
                <input type="text" onChange={ e => this.setState({ pwd: e.target.value })} />
                <button onClick={ () => this.onLogin() }> Login </button>
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
        tryLogin: payload => dispatch(tryLogin(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);