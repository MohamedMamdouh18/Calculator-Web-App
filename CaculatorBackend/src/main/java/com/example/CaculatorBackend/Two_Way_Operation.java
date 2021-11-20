package com.example.CaculatorBackend;

import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

@CrossOrigin()
@RestController
@RequestMapping("/Two_Way_Operation")
public class Two_Way_Operation {

    @PostMapping("/Add")
    public String addition(@RequestBody operands param){
        BigDecimal addition  = param.getInput_num().add(param.getResult_num()) ;
        return addition.stripTrailingZeros().toPlainString();
    }

    @PostMapping("/Sub")
    public String subtraction(@RequestBody operands param) {
        BigDecimal subtraction  = param.getResult_num().subtract(param.getInput_num()) ;
        return subtraction.stripTrailingZeros().toPlainString();
    }

    @PostMapping("/Mult")
    public String multiplication(@RequestBody operands param) {
        BigDecimal multiplication  = param.getResult_num().multiply(param.getInput_num()) ;
        var cont = new MathContext(8);
        return multiplication.round(cont).toPlainString();
    }

    @PostMapping("/Div")
    public String division(@RequestBody operands param) {
        if(param.getInput_num().compareTo(BigDecimal.valueOf(0)) == 0) {
            return "Error" ;
        }
        BigDecimal division  = param.getResult_num().divide(param.getInput_num() , 8 , RoundingMode.DOWN) ;
        return division.stripTrailingZeros().toPlainString();
    }
}
