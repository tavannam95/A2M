package Service;

import Person.Person;

public interface UserService{
	public Person CreateUser(Person person);
	public Person UpdatePerson(Person person, int id);
	public void DeletePerson(int id);
	public Person findByID(int id);
	Iterable<Person> findAll();
}