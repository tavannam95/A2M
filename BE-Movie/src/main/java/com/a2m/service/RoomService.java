package com.a2m.service;

import com.a2m.entities.Rooms;

public interface RoomService {
    Rooms createRoom(Rooms rooms);

    Rooms updateRoom(Rooms rooms);

    Rooms activeOrInactive(Rooms rooms);
}
