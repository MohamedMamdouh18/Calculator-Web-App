import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions: Object = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
  }), responseType: 'text'
};

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent implements OnInit {
  result_num :string = '0' ;
  last_op_name : string = 'Add' ;
  last_op_symbol : string = '+' ;
  input_num : string = '0' ;

  output_num : string = '';
  dots:number = 0 ;
  equality : boolean = false ;
  start_typing : boolean = false ;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  //function responsible of deleting processes for C,CE,DEL
  public deleting_function(type:string){
    if(this.equality){
      this.equality = false ;
      type = 'last_operand' ;
    }
    if(type == 'last_char'){
      if(this.input_num.length == 1) this.input_num = '0' ;
      else{
        if(this.input_num[this.input_num.length-1]  == '.') this.dots = 0 ;
        this.input_num = this.input_num.slice(0,-1);
      }
    }
    else if(type == 'last_operand'){
      this.input_num = '0';
      this.dots = 0 ;
      this.start_typing = false ;
    }
    else if(type == 'all_history'){
      this.input_num = '0';
      this.result_num= '0' ;
      this.last_op_name = 'Add' ;
      this.output_num = '';
      this.dots = 0 ;
      this.equality = false ;
      this.start_typing = false ;
    }
  }

  //change the operande value on screen based on number pressed
  public change_input_screen(input:string){
    if(this.equality){
      if(this.input_num[0] == '-') this.input_num = '-';
      else this.input_num = '0' ;
      this.equality = false ;
    }
    if(this.input_num.length - this.dots >= 9) return
    this.start_typing = true ;
    if(input == '.'){
      if(this.dots == 0){
        this.input_num += input ;
        this.dots += 1 ;
      }
    }
    else{
      if(this.input_num == '0') this.input_num = input ;
      else this.input_num += input ;
    }
  }

  public equal() {

    let op1:number = Number.parseFloat(this.result_num) ;
    let op2:number = Number.parseFloat(this.input_num) ;

    this.http.post<string>(`http://localhost:8080/Two_Way_Operation/${this.last_op_name}`, JSON.stringify
    ({"result_num": op1, "input_num": op2}), httpOptions).
    subscribe(response => {
        this.input_num = response;
        this.equality = true ;
        this.result_num= '0' ;
        this.last_op_name = 'Add' ;
        this.output_num = '';
        this.dots = 0 ;
      }
    )
  }

  public two_way_operation(input:string , op:string){
    if(!this.start_typing){
      this.last_op_symbol = op ;
      this.last_op_name = input ;
      this.output_num = this.result_num + ' ' + op ;
      return ;
    }
    let op1:number = Number.parseFloat(this.result_num) ;
    let op2:number = Number.parseFloat(this.input_num) ;

    this.http.post<string>(`http://localhost:8080/Two_Way_Operation/${this.last_op_name}`, JSON.stringify
      ({"result_num": op1, "input_num": op2}), httpOptions).
    subscribe(response => {
        this.result_num = response;
        this.input_num = '0' ;
        this.output_num = this.result_num + ' ' + op ;
        this.last_op_name = input ;
        this.last_op_symbol = op ;
        this.dots = 0 ;
        this.start_typing = false ;
        if(response == 'Error'){
          this.deleting_function('all_history') ;
          this.input_num = 'Error' ;
          this.equality = true ;
        }
      }
    )
  }

  public one_way_operation(input:string ,sign:boolean){
    let op:number = Number.parseFloat(this.input_num) ;

    this.http.post<string>(`http://localhost:8080/One_Way_Operation/${input}`, JSON.stringify
    ({"result_num": op, "input_num": null}), httpOptions).
    subscribe(response => {
      this.input_num = response;
      if(sign) return ;
      if(response == 'Error'){
        this.deleting_function('all_history') ;
        this.input_num = response;
        this.equality = true ;
        return ;
      }
      this.equal() ;
      }
    )
  }
}
