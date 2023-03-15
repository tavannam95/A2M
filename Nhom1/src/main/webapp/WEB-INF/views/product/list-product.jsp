<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div class="container">
		<div class="title">
			<h1>Product</h1>
		</div>
		<div class="item" style="display = flex">
		
		<a style="padding-right:200px, width:100px">Product name</a>
		<a style="padding-right:200px, width:100px">Price</a>
		<a href="/Base-mvc/form-product">Insert</a>
		</div>
		<c:forEach var="product" items="${products}" >
		<div class="list" style="display = flex">
		<a style="padding-right:200px, width:100px">${product.productName}</a>
		<a style="padding-right:200px, width:100px">${product.price}</a>
		<a href="/edit_product_form?productName=${product.productName}">edit</a>
		<a href="/delete_product?productName=${product.productName}">delete</a>
		</div>
		</c:forEach>
	</div>
</body>
</html>