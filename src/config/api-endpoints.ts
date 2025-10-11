const apiEndpoints = {
    auth : {
        signUp: "/api/users/signup",
        login: "/api/users/login",
        getUserById: "/api/users/get-user-by-id",
        updateUserById: "/api/users/update-user",
        deleteAccount: "/api/users/delete-hard",
        updatePassword: "/api/users/update-password",
    },
    github: {
        savePat: "/api/github-pat/save-pat",
        updatePat: "/api/github-pat/update-pat",
        getRepo: "/api/github-pat/list-repos",
    },
       project: {
        createProject: "/api/project/create-project",
        getProjectByOwner: "/api/project/get-projects-by-owner",
        getTree: "/api/github-pat/repos",
        selectCsp:"/api/project/:projectId/csp",
        spaceList:"/api/project/:projectId/spaces",
        repoInsert:"/api/project/:projectId/repo",
        clonetoContainer:"/api/project/:projectId/inject-to-container",
        deleteProject: "/api/project/:projectId/delete",
        pullInjector:"/api/project/:projectId/reset-branch",
    },
    deployment: {
        getDeployments: "/api/deployment/",
        terraform: "/api/terraform",
    },
      credsInjector: {
        configureAwsProfile: "/api/project/:projectId/configure-aws-profile",
        updateAWSProfile: "/api/project/:projectId/update-aws-profile",
    },
}

export {apiEndpoints}