const apiEndpoints = {
    auth : {
        signUp: "/api/users/signup",
        login: "/api/users/login",
        // byEmail: "/api/users/email"
    },
    github: {
        savePat: "/api/github-pat/save-pat",
        getRepo: "/api/github-pat/list-repos",
        // getTree: "/api/github-pat/repos"
    },
       project: {
        createProject: "/api/project/create-project",
        getProjectByOwner: "/api/project/get-projects-by-owner",
        // getTree: "/api/github-pat/repos"
    }
}

export {apiEndpoints}