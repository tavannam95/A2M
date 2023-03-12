package com.a2m.nhom1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.ui.Model;

import com.a2m.nhom1.entity.Person;
import com.a2m.nhom1.repository.*;
import com.a2m.nhom1.serviceimpl.UserServiceImpl;

@Controller
public class UserPageController{
	@Autowired
	
	UserServiceImpl userserviceimpl;
	@RequestMapping(value = "/User/UserPage",method = RequestMethod.GET)
	public ModelAndView showUserPage() {
		ModelAndView mav = new ModelAndView("/User/UserPage");
		Iterable<Person> persons = userserviceimpl.findAll();
//		System.out.println(userserviceimpl.count());
		System.out.println(persons.toString());
		mav.addObject("persons", persons);
		System.out.println(mav.toString());
		return mav;
	}
	
	@RequestMapping(value = "/User/CreateUser",method = RequestMethod.GET)
	public ModelAndView showCreatePage() {
		ModelAndView mav = new ModelAndView("/User/CreateUser");
		return mav;
	}
	
	@RequestMapping(value = "/UserPage",method = RequestMethod.POST)
	public ModelAndView createUser(@ModelAttribute("person") Person person) {
		ModelAndView mav = new ModelAndView("User/UserPage");
		System.out.println(person.name);
		userserviceimpl.CreateUser(person);
		Iterable<Person> persons = userserviceimpl.findAll();
		mav.addObject("persons", persons);
		return mav;
	}
	
	@RequestMapping(value = "/person/edit/{id}",method = RequestMethod.GET)
	public ModelAndView showEditPage(@PathVariable("id") int id, Model model) {
		ModelAndView mav = new ModelAndView("/User/Edit");
		mav.addObject("person", userserviceimpl.findByID(id));
		return mav;
	}
	
	@RequestMapping(value = "/person/save", method = RequestMethod.POST)
	public ModelAndView EditUser(@ModelAttribute("person") Person person) {
		ModelAndView mav = new ModelAndView("User/UserPage");
		System.out.println("ID: "+person.id);
		userserviceimpl.UpdatePerson(person, person.id);
		Iterable<Person> persons = userserviceimpl.findAll();
		mav.addObject("persons", persons);
		System.out.println(mav.toString());
		return mav;
	}
	
	@RequestMapping(value = "/Del/{id}", method = RequestMethod.GET)
	public ModelAndView DelUser(@PathVariable("id") int id) {
		ModelAndView mav = new ModelAndView("User/UserPage");
		userserviceimpl.DeletePerson(id);
		Iterable<Person> persons = userserviceimpl.findAll();
		mav.addObject("persons", persons);
		return mav;
	}
}