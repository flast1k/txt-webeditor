function uploadFormData() {
    $('#content').html('');
    let oMyForm = new FormData();
    oMyForm.append("file", file.files[0]);

    $.ajax({
        url: 'files/upload',
        data: oMyForm,
        dataType: 'text',
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            let parsedData = JSON.parse(data);
            $('#content-group').show();
            $('#content').val(parsedData.content);
            $('#name').val(parsedData.name);
            showInfoAlert("Успешно загружено");
        },
        error: function (jqXHR) {
            // console.log(jqXHR);
            showDangerAlert(jqXHR.statusText);
            $('#content-group').hide();
        },
    });
}

function showAlert(msg, selector) {
    selector.text(msg);
    selector.removeClass("d-none");
    selector.fadeTo(2000, 500).slideUp(500, function () {
        selector.slideUp(500);
    });
}

function showInfoAlert(msg) {
    let alert = $("#info-alert-box");
    showAlert(msg, alert);
}

function showDangerAlert(msg) {
    let alert = $("#danger-alert-box");
    showAlert(msg, alert);
}

function updateFileInfo() {
    let name = $('#name').val();
    let content = $('#content').val();
    let fileInfo = {
        "name": name,
        "content": content
    };
    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: "files/update",
        data: JSON.stringify(fileInfo),
        success: function () {
            showInfoAlert("Успешно обновлено");
        }
    });
}

function proceed() {
    let form = document.createElement('form');
    form.setAttribute('method', 'get');
    form.setAttribute('action', 'files/download');
    form.style.display = 'hidden';
    document.body.appendChild(form);
    form.submit();
}

$('#content-group').hide();