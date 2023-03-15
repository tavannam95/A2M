package com.a2m.nhom1.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.a2m.nhom1.entities.Product;
import com.a2m.nhom1.service.ProductService;


@Controller

public class ProductController {
	@Autowired
	ProductService productService;
	
	@RequestMapping(value = { "/list-product" }, method = RequestMethod.GET)
	public String list(final Model model, final HttpServletRequest request, final HttpServletResponse response) {
		List<Product> products = productService.findAll();
		model.addAttribute("products", products);
		return "product/list-product";
	}

	@RequestMapping(value = { "/edit/{id}" }, method = RequestMethod.GET)
	public String edit(final Model model, final HttpServletRequest request, final HttpServletResponse response,
						@PathVariable("id") Integer id) {
		Optional<Product> productOptional = productService.findById(id);
		if (productOptional.isPresent()) {
            Product product = productOptional.get();
            model.addAttribute("product", product);
            return "product/edit-product";
        } else {
            // Handle the case where the product is not found
            return "redirect:list-product";
        }
	}

	@RequestMapping(value = { "/edit" }, method = RequestMethod.POST)
	public String update(final Model model, final HttpServletRequest request, final HttpServletResponse response,
			@ModelAttribute("product") Product product) 
	{
		productService.insert(product);
        return "redirect:/list-product";
	}

	@GetMapping("/add")
	public String showAddProductForm(Model model) {
		model.addAttribute("product", new Product());
		return "product/add-product";
	}
	
	@PostMapping("/add")
	public String addProduct(@ModelAttribute("product") Product product) {
		productService.insert(product);
		return "redirect:/list-product";
	}
	
	@GetMapping("/delete/{id}")
	public String deleteProduct(@PathVariable("id") Integer id) {
		Optional<Product> product = productService.findById(id);

		productService.delete(product.get());
		return "redirect:/list-product";
	}
}
