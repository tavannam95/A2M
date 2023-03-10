<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1>
		Category page
	</h1>
	<a href="category/create">Create</a>
	<table>
		  <tr>
		    <th>Id</th>
		    <th>Name</th>
		    <th>Options</th>
		  </tr>
		  	<c:forEach items="${listCategories}" var="c">
			  <tr>
			  		<td>${c.id}</td>
			  		<td>${c.name}</td>
			  		<td>
			  			<a href="category/update/${ c.id }">Edit</a>
			  			<a href="category/delete/${ c.id }">Delete</a>
			  		</td>
			  </tr>
			</c:forEach>	
	</table>
	
	
	
</body>
</html>