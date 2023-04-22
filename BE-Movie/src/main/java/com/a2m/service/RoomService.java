package com.a2m.service;

import com.a2m.entities.Rooms;
import com.a2m.model.request.RoomRequest;

import java.util.List;

public interface RoomService {
    Rooms createRoom(RoomRequest roomRequest);

    Rooms updateRoom(Rooms rooms);

    Rooms activeOrInactive(Rooms rooms);
}
