<%--
  Created by IntelliJ IDEA.
  User: flast1k
  Date: 25.07.2018
  Time: 22:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link href="webjars/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <h1>Редактор текстовых файлов</h1>
    <div class="alert alert-primary d-none" id="info-alert-box" role="alert"></div>
    <div class="alert alert-danger d-none" id="danger-alert-box" role="alert"></div>
    <form id="form" method="post" action="files/upload" enctype="multipart/form-data">
        <div class="form-group">
            <label for="file">Выберите файл</label>
            <input type="file" id="file" class="form-control-file" type="file" accept="text/plain">
        </div>
    </form>
    <button class="btn btn-primary" onclick="uploadFormData()">Загрузить</button>
    <br>
    <div class="form-group" id="content-group">
        <label for="content">Содержимое файла:</label>
        <textarea class="form-control" rows="10" id="content"></textarea>
        <input id="name" name="name" type="hidden">
        <br>
        <button class="btn btn-primary" onclick="updateFileInfo()">Обновить</button>
        <button class="btn btn-primary" onclick="proceed();">Скачать обновленный файл</button>
    </div>
</div>
<script src="webjars/jquery/3.3.1-1/jquery.min.js"></script>
<script src="webjars/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="resources/js/utils.js"></script>
</body>
</html>
