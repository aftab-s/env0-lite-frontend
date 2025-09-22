const apiEndpoints = {
    auth : {
        signUp: "/api/users/signup",
        login: "/api/users/login",
        byEmail: "/api/users/users/email"
    },
    github: {
        getRepo: "/api/github-pat/repos",
        getTree: "/api/github-pat/repos",
        getBranch: "/api/github-pat/repos/get-branch"
    }
}

export {apiEndpoints}