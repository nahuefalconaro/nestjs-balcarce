import { HttpException, HttpStatus } from "@nestjs/common";

export class MyExceptionCustom extends HttpException {

    constructor(message: string, status: HttpStatus){
        super(message, status);
    }
    
}