export class StatusError implements Error {
    constructor(public status:number, public message:string, 
                public name: string, public error?: string) {
    }
  }
export class StatusTextError implements StatusError {
    constructor(public status:number, public message:string, 
      public name: string, public error: string) {
      
    }
  }
export class ResponseError implements Error {
  constructor(public status:number, public message:string, 
    public name: string, public error?: string) {
    
  }
}