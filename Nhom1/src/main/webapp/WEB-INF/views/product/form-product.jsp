<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Contact</title>
</head>

<body>
    <div class="row">
        <div class="container">
                <div class="main">
                    <div class="name">
                        <a>Form Product</a>
                    </div>
                     <div class="form">
                        <form:form action="/add_product" method="post" modelAttribute="product">
                            <div class="item">
                                <label for="">Product name</label>
                            </div>
                            <div class="input1">
                                <form:input type="text" class ="form-control" name="name" id="idName" path="productName" value="${product.productName}"></form:input>
                            </div>
                            <div class="item">
                                <label for="">price</label>
                            </div>
                            <div class="input1">
                                <form:input type="number" class ="form-control" name="name" id="idName" path="price" value="${product.price}"></form:input>
                            </div>
                            <div class="btn">
                                <button type="submit">Submit</button>
                            </div>
                        </form:form>
                </div>
            </div>
        </div>
    </div>
	<!-- JS -->
</body>

</html>