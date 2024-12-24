import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private userProfileSubject = new BehaviorSubject<User | null>(null);
  public userProfile$ = this.userProfileSubject.asObservable();

  constructor() {}

  setUserProfile(profile: User): void {
    this.userProfileSubject.next(profile);
  };

  getUserProfile(): User | null {
    return this.userProfileSubject.value;
  };

  clearUserProfile(): void {
    this.userProfileSubject.next(null);
  };
};
