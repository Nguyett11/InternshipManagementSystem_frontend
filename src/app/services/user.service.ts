import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { HttpUtilService } from "./http.util.service";
import { RegisterDTO } from "../dtos/user/register.dto";
import { Observable } from "rxjs";
import { Inject, inject, Injectable } from "@angular/core";
import { LoginDTO } from "../dtos/user/login.dto";
import { DOCUMENT } from "@angular/common";
import { UserResponse } from "../responses/user/user.response";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/Users/register`;
  private apiLogin = `${environment.apiBaseUrl}/Users/login`;
  private apiUser = `${environment.apiBaseUrl}/Users`;
  private apiUserDetail = `${environment.apiBaseUrl}/Users/profile`;

  private http = inject(HttpClient);
  private httpUtilService = inject(HttpUtilService);  

  localStorage?:Storage;

  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  }

  constructor(        
    @Inject(DOCUMENT) private document: Document
  ) { 
    this.localStorage = document.defaultView?.localStorage;
  }

  private userId: number | null = null;

  setUserId(id: number): void {
    this.userId = id;
  }

  getUserId(): number | null {
    return this.userId;
  }

  register(user : User): Observable<any> {
    const formData = new FormData();
    formData.append('full_name', user.full_name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('phone_number', user.phone_number);
    formData.append('gender', user.gender);

    const dateOfBirthStr = new Date(user.date_of_birth).toISOString();
    formData.append('date_of_birth', dateOfBirthStr);
    
    formData.append('desired_role', user.desired_role);
    formData.append('role_id', user.role_id.toString());

    return this.http.post(`${this.apiUser}/register`, formData);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }

  getUserById(id: number): Observable<User> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.apiUser}/${id}`, { headers });
  }
  
  getUserDetail(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.apiUserDetail, { headers });
  }

  getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<User[]>(this.apiUser, { headers });
  }
  
  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if(userResponse == null || !userResponse) {
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJSON = JSON.stringify(userResponse);  
      // Save the JSON string to local storage with a key (e.g., "userResponse")
      localStorage.setItem('user', userResponseJSON);  
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }
  getUserResponseFromLocalStorage():UserResponse | null {
    try {
      // Retrieve the JSON string from local storage using the key
      const userResponseJSON = this.localStorage?.getItem('user'); 
      if(userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      // Parse the JSON string back to an object
      const userResponse = JSON.parse(userResponseJSON!);  
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error retrieving user response from local storage:', error);
      return null; // Return null or handle the error as needed
    }
  }
  
  removeUserFromLocalStorage():void {
    try {
      // Remove the user data from local storage using the key
      localStorage.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
      // Handle the error as needed
    }
  }
    getUserbyId(id: number): Observable<any> {
      const url = `${this.apiUser}/${id}`;
      return this.http.get<any>(url);
    }

    updateUser(id: number, body: any): Observable<any> {
      const url = `${this.apiUser}/${id}`;
      return this.http.put<any>(url, body);
    }

    deleteUser(id: number): Observable<any> {
      const url = `${this.apiUser}/details/${id}`;
      return this.http.delete<any>(url);
    }

    logout(): Observable<any> {
      // Xóa user từ local storage /logout
      this.removeUserFromLocalStorage();
  
      // Thực hiện yêu cầu logout tới backend (nếu cần)
      const url = `${this.apiUser}/logout`;
      return this.http.post(url, {});
    }
}
