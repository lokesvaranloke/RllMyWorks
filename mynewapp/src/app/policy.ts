// map to entity class 
export class Policy {

    constructor( public policyNum:number,
        public userId:number,
        public email:string,
        public address:string,
        public phoneNum:number=0,
        public name:string,
        public policytype:string,
        public status:string){}
}
