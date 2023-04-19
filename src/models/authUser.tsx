export interface AuthUser {
  access_token:string, 
  user: {
      email: string;
      id: string;
      nome: string
  }
  
}