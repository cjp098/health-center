import React, { createContext } from "react";
import { firebaseAuth, onAuthStateChanged } from "../config";

const AuthContext = createContext([]);

class AuthProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticted: {},
        };
    }

    componentDidMount() {
        this.isAuthenticated();
    }

    isAuthenticated = () => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {

                user.getIdTokenResult().then((idTokenResult) => {
                    user.admin = idTokenResult.claims.admin
                    this.setState({ authenticted: user });
                })

            } else {
                this.setState({ authenticted: null });
            }
        });
    };

    render() {
        const { authenticted } = this.state;

        return (
            <AuthContext.Provider value={authenticted}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export { AuthProvider, AuthContext };