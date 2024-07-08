import { FileHandle } from "./file-handle.model";

export class User {
    id?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    
    // new default fields to add
    company?: string;
    address?: string;
    city?: string;
    country?: string;
    postCode?: string;
    aboutMe?: string;    
    // image?: string;
    image?: FileHandle[]
    // new default fields to add
    
    email?: string;    
    password?: string;
    isLoggedIn?: boolean;
    token?: string;
}

export interface PatientData {
    expanded: boolean;
    id: number;
    level: number;
}

export interface CnnData {
    expanded: boolean;
    id: number;
    level: number;
}

export interface LstmData {
    expanded: boolean;
    id: number;
    level: number;
}