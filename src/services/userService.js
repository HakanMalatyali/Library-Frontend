import axios from "axios"

export default class UserService{
    
    addUser(user){
        return axios.post("http://localhost:8080/api/users/addUser", user)
    }

    login(userName,password){
        return axios.get(`http://localhost:8080/api/users/findByUsernameAndPassword?password=${password}&username=${userName}`)
    }
}