<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<form action = "/UserPage" modelAttribute="person" method="post">
		<input type = "text" name = "Name"></input>
		<input type = "text" name = "Age"></input>
		<input type = "submit" value = "Create"></input>
	</form>
</body>
</html>