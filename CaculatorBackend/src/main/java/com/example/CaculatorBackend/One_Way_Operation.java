package com.example.CaculatorBackend;


import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.MathContext;

@CrossOrigin()
@RestController
@RequestMapping("/One_Way_Operation")
public class One_Way_Operation {

    @PostMapping("/Square")
    public String Square(@RequestBody operands param) {
        var cont = new MathContext(8);
        BigDecimal Square = param.getResult_num().pow(2).round(cont) ;
        return Square.toPlainString();
    }

    @PostMapping("/Sqrt")
    public String Sqrt(@RequestBody operands param) {
        if(param.getResult_num().compareTo(BigDecimal.valueOf(0)) < 0) {
            return "Error" ;
        }
        var cont = new MathContext(8);
        BigDecimal Sqrt = param.getResult_num().sqrt(cont).round(cont);
        return Sqrt.toPlainString();
    }

    @PostMapping("/Invert")
    public String Invert(@RequestBody operands param) {
        if(param.getResult_num().compareTo(BigDecimal.valueOf(0)) == 0) {
            return "Error" ;
        }
        var cont = new MathContext(8);
        BigDecimal Invert = BigDecimal.valueOf(1/param.getResult_num().doubleValue()).round(cont);
        return Invert.toPlainString();
    }

    @PostMapping("/Change_Sign")
    public String Change_Sign(@RequestBody operands param) {
        BigDecimal Change_Sign = param.getResult_num().multiply(BigDecimal.valueOf(-1));
        return Change_Sign.toPlainString();
    }

    @PostMapping("/Percentage")
    public String Percentage(@RequestBody operands param) {
        BigDecimal Percentage = param.getResult_num().divide(BigDecimal.valueOf(100));
        return Percentage.toPlainString();
    }
}
