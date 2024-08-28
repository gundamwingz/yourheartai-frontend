import { User, PatientChdData } from "./interface/model"

export const NewUser: User = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  role: '',
  company: '',
  address: '',
  city: '',
  country: '',
  postCode: '',
  aboutMe: '',  
  email: '',    
  password: '',
  isLoggedIn: false,
  token: '',
  image: [],
}


export const NewCHDPatient: PatientChdData = {
  id: '',
  age: 0,
  gender: 0,
  chestPain: 0,
  restingBP: 0,
  serumCholestrol: 0,
  fastingBloodSugar: 0,
  restingRElectro: 0,
  maxHeartRate: 0,
  exerciseAngia: 0,
  oldPeak: 0,
  slope: 0,
  noOfMajorVessels: 0,
}