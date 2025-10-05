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
        getProjectByOwner: "/api/project/get-projects-by-owner",
        getTree: "/api/github-pat/repos"
    },
    deployment: {
        getDeployments: "/api/deployment/",
        terraform: "/api/terraform",
    }
}

export {apiEndpoints}