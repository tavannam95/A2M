package com.a2m.nhom1.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;

import com.a2m.nhom1.entity.*;
import com.a2m.nhom1.service.*;
import com.a2m.nhom1.repository.*;

@org.springframework.stereotype.Service
public class UserServiceImpl implements Service {

	@Autowired
	UserRepository userrepository;

	@Override
	public Person CreateUser(Person person) {
		// TODO Auto-generated method stub
		Person fromDB = userrepository.findById(person.id).orElse(null);
		if (person.getName() == null || person.getName().equals("")) {
			return null;
		}
		return userrepository.save(person);

	}

	@Override
	public Person UpdatePerson(Person person, int id) {
		// TODO Auto-generated method stub
		Person fromDB = userrepository.findById(id).orElse(null);
		fromDB.setName(person.getName());
		fromDB.setAge(person.getAge());
		return userrepository.save(fromDB);
	}

	@Override
	public void DeletePerson(int id) {
		// TODO Auto-generated method stub
		userrepository.deleteById(id);
	}

	@Override
	public Person findByID(int id) {
		// TODO Auto-generated method stub
		return userrepository.findById(id).orElse(null);
	}

	@Override
	public Iterable<Person> findAll() {
		// TODO Auto-generated method stub
		return userrepository.findAll();
	}

	public int count() {
		return (int) userrepository.count();
	}

}