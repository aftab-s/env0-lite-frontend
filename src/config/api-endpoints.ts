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
        getTree: "/api/github-pat/repos",
        selectCsp:"/api/project/:projectId/csp",
        spaceList:"/api/project/:projectId/spaces",
        repoInsert:"/api/project/:projectId/repo",
        clonetoContainer:"/api/project/:projectId/inject-to-container"
    },  
    deployment: {
        getDeployments: "/api/deployment/",
        terraform: "/api/terraform",
    },
      credsInjector: {
        configureAwsProfile: "/api/project/:projectId/configure-aws-profile",
    },
}

export {apiEndpoints}