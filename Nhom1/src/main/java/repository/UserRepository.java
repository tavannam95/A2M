package repository;

import org.springframework.data.jpa.repository.support.CrudMethodMetadata;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import Person.Person;

@Repository
public interface UserRepository extends CrudRepository<Person, Integer>{
	
}