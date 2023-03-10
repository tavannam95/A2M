<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="/category/save-or-update" method="post">
	<label>Id</label> <br>
	<input name="id" value="${ category.id }" readonly><br><br>
	<label>Name</label><br>
	<input name="name" value="${ category.name }"><br><br>
	<button type="submit">Update</button>
</form>
</body>
</html>