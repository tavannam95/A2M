<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<h1>Person List</h1>

	<br />
	<br />
	<div>
		<table border="1">
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Age</th>
				<th>Option</th>
			</tr>
			<c:forEach items="${persons}" var="person">
				<tr>
					<td>${person.id}</td>
					<td>${person.name}</td>
					<td>${person.age}</td>
					<td>
						<a href = "/person/edit/${person.id}">Edit</a>
						<a href = "/Del/${person.id}">Del</a>
					</td>
				</tr>
			</c:forEach>
		</table>
	</div>
	<a href="/User/CreateUser">Add</a>
</body>
</html>