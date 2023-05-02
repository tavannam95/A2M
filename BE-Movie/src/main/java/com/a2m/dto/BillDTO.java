package com.a2m.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;

import com.a2m.entities.Tickets;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class BillDTO {
    private Long id;

    private String billCode;

    private String barCode;
    
    private Integer totalPrice;
    
    private Date createdDate;
    
    private AccountDTO customer;
    
    private List<Tickets> listTickets ;
}
