package com.example.CaculatorBackend;

import java.math.BigDecimal;

public class operands {
    private BigDecimal result_num ;
    private BigDecimal input_num ;

    public BigDecimal getInput_num() {
        return input_num;
    }
    public BigDecimal getResult_num() {
        return result_num;
    }

    public void setInput_num(BigDecimal input_num) {
        this.input_num = input_num;
    }
    public void setResult_num(BigDecimal result_num) {
        this.result_num = result_num;
    }
}
