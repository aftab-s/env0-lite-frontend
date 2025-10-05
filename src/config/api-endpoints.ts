const apiEndpoints = {
    auth : {
        signUp: "/api/users/signup",
        login: "/api/users/login",
    },
    github: {
        savePat: "/api/github-pat/save-pat",
        getRepo: "/api/github-pat/list-repos",
    },
       project: {
        createProject: "/api/project/create-project",
    }
}

export {apiEndpoints}