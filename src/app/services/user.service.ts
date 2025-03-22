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
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
  private apiUser = `${environment.apiBaseUrl}/users`;

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

  register(registerDTO: RegisterDTO): Observable<any> {
    debugger
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }
  
  getUserDetail(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.apiUserDetail, { headers });
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

  getUsers( keyword: string, page: number, limit: number
    ): Observable<User[]> {
      const params = {
        keyword: keyword,
        page: page.toString(),
        limit: limit.toString()
      };
      return this.http.get<User[]>(this.apiUser, { params });
    }
  
    getUserbyId(id: number): Observable<any> {
      const url = `${this.apiUser}/details/${id}`;
      return this.http.get<any>(url);
    }

    updateUser(id: number, body: any): Observable<any> {
      const url = `${this.apiUser}/details/${id}`;
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
    //grantRole/{userId}/{active}

    blockOrEnableUser(userId: number, isActive: number): Observable<any> {
      debugger
      const url = `${this.apiUser}/block/${userId}/${isActive}`; 
      console.log(url);
      return this.http.put(url, {}); // Gửi một body rỗng vì endpoint không yêu cầu payload
    }  
    
    grantRole(userId: number, roleId: number): Observable<any> {
      const url = `${this.apiUser}/grantRole/${userId}/${roleId}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      return this.http.put(url, null, { headers });
    } 
}
