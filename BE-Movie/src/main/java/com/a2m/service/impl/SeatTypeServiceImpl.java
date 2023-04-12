package com.a2m.service.impl;

import com.a2m.repository.SeatTypesRepository;
import com.a2m.service.SeatTypeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SeatTypeServiceImpl implements SeatTypeService {
    private SeatTypesRepository seatTypesRepository;

}
