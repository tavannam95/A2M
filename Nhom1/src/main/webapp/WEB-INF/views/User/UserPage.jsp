<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<h1>Person List</h1>
   
    <br/><br/>
    <div>
      <table border="1">
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
        <c:forEach  items="${persons}" var ="person">
        <tr>
          <td>${person.id}</td>
          <td>${person.name}</td>
        </tr>
        </c:forEach>
      </table>
    </div>
</body>
</html>