package com.a2m.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bills")
public class Bills {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "bill_code")
    private String billCode;

    @Column(name = "bar_code")
    private String barCode;

    @Column(name = "status")
    private Integer status;
    
    @Column(name = "total_price")
    private Integer totalPrice;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Accounts customer;
    
    @OneToMany(mappedBy = "bill")
    private List<Tickets> listTickets;

}
