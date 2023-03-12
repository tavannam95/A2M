<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<form action = "/person/save" method = "post">
		<input type="hidden" name="id" value="${person.id}" />
		<input type = "text" name = "Name" value = "${person.name}"></input>
		<input type = "text" name = "Age" value = "${person.age}"></input>
		<input type = "submit" value = "Create"></input>
	</form>
</body>
</html>