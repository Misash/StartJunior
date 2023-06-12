import axios from "axios"

// export const url = "http://localhost:4000"
export const url = process.env.REACT_APP_BACKEND_URL 


//create new project's post
export const createProject = async (data,func) => {
    await axios.post(`${url}/createProject `, data).then(func)
}

// get skills technologies 
export const getTechs = async (func) => {
    await axios.get(`${url}/techs`).then(func)
}

// // get skill types 
// export const getTypes = async (func) => {
//     await axios.get(`${url}/types`).then(func)
// }

// // get skill expLevel 
// export const getExpLevels = async (func) => {
//     await axios.get(`${url}/expLevels`).then(func)
// }

//get Impact Areas
export const getImpactAreas = async (func) => {
    await axios.get(`${url}/impactAreas`).then(func)
} 

//get topics
export const getTopics = async (func) =>{
    await axios.get(`${url}/topics`).then(func)
}

//get basic projects info
export const getbasicProjectsInfo = async (func)=>{
    await axios.get(`${url}/basicprojects`).then(func)
}

//get basic projects filtering 
export const getFilterProjects = async (filters,func)=>{
    await axios.get(`${url}${filters}`).then(func)
}

//get all project info by id
export const getProjectById= async (id,func)=>{
    await axios.get(`${url}/project/${id}`).then(func)
}