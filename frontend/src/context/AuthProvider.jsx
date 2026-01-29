const { useEffect, useState, createContext } = require("react");

export const AuthContext = createContext({
    user: {
        id: 0,
        name: '',
        email: '',
        image: '',
    },
    signin: () => { },
    signout: () => { },
})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return (storedUser && storedUser !== "undefined") ? JSON.parse(storedUser) : undefined;
        } catch (e) {
            return undefined;
        }
    });



    const signin = (user, token) => {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const signout = () => {
        setUser(undefined)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const authValue = {
        user,
        signin,
        signout,
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
}