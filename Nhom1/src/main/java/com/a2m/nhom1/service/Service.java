package com.a2m.nhom1.service;

import com.a2m.nhom1.entity.*;

public interface Service{
	public Person CreateUser(Person person);
	public Person UpdatePerson(Person person, int id);
	public void DeletePerson(int id);
	public Person findByID(int id);
	Iterable<Person> findAll();
}