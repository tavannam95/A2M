package Service.Impl;

import org.springframework.beans.factory.annotation.Autowired;

import Person.Person;
import Service.UserService;
import repository.UserRepository;

public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userrepository;

	@Override
	public Person CreateUser(Person person) {
		// TODO Auto-generated method stub
		Person fromDB = userrepository.findById(person.id).orElse(null);
		if (fromDB != null) {
			fromDB.setName(person.getName());
			return userrepository.save(fromDB);
		} else {
			if (person.getName() != null || person.getName().isEmpty()) {
				return null;
			}
			return userrepository.save(person);
		}
	}

	@Override
	public Person UpdatePerson(Person person, int id) {
		// TODO Auto-generated method stub
		Person fromDB = userrepository.findById(id).orElse(null);
		fromDB.setName(person.getName());
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

}