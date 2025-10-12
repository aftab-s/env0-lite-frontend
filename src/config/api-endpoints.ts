/**
 * Centralized API Endpoints for all backend routes.
 * Use these constants throughout the app for maintainability and consistency.
 * Replace :projectId or other params at usage time.
 */

const apiEndpoints = {
    // Auth-related endpoints
    auth: {
        signUp: "/api/users/signup",
        login: "/api/users/login",
        getUserById: "/api/users/get-user-by-id",
        updateUserById: "/api/users/update-user",
        deleteAccount: "/api/users/delete-hard",
        updatePassword: "/api/users/update-password",
    },

    // GitHub integration endpoints
    github: {
        savePat: "/api/github-pat/save-pat",
        updatePat: "/api/github-pat/update-pat",
        getRepo: "/api/github-pat/list-repos",
    },

    // Project management endpoints
    project: {
        createProject: "/api/project/create-project",
        getProjectByOwner: "/api/project/get-projects-by-owner",
        getTree: "/api/github-pat/repos", // Get repo tree
        selectCsp: "/api/project/:projectId/csp", // Set cloud service provider for project
        spaceList: "/api/project/:projectId/spaces", // List spaces for a project
        repoInsert: "/api/project/:projectId/repo", // Add repo to project
        clonetoContainer: "/api/project/:projectId/inject-to-container", // Clone repo to container
        deleteProject: "/api/project/:projectId/delete", // Delete a project
        pullInjector: "/api/project/:projectId/reset-branch", // Reset branch (rebase)
    },

    // Deployment-related endpoints
    deployment: {
        getDeployments: "/api/deployment/", // List all deployments
        terraform: "/api/terraform", // Terraform operations
    },

    // AWS Credentials endpoints
    credsInjector: {
        configureAwsProfile: "/api/project/:projectId/configure-aws-profile", // Initial AWS profile setup
        updateAWSProfile: "/api/project/:projectId/update-aws-profile", // Update AWS profile/credentials
    },
};

export { apiEndpoints };