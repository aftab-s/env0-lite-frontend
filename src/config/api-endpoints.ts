const apiEndpoints = {
    auth : {
        signUp: "/api/users/signup",
        login: "/api/users/login",
        byEmail: "/api/users/users/email"
    },
    github: {
        getRepo: "/api/github-pat/repos/:email",
        getTree: "/api/github-pat/repos"
    }
}

export {apiEndpoints}