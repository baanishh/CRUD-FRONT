const backendDomain="https://crud-back-zvr6.onrender.com"
const SummaryApi = {
    profile : {
        url : `${backendDomain}/api/auth/profile`,
        method : "GET"
    },
    register : {
        url : `${backendDomain}/api/auth/register`,
        method : "POST"
    },
    login : {
        url : `${backendDomain}/api/auth/login`,
        method : "POST"
    },
    logout : {
        url : `${backendDomain}/api/auth/logout`,
        method : "POST"
    },
    addNote : {
        url : `${backendDomain}/api/notes/`,
        method : "POST"
    },
    getNote : {
        url : `${backendDomain}/api/notes/`,
        method : "GET"
    },
   

}
export default SummaryApi
