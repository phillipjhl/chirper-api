$(document).ready(() => {
     
    $("#chirp-post").click(() => {
        let name = $("#chirp-name").val();
        let text = $("#chirp-text").val();
        let data = {
            name: name,
            text: text
        };
        console.log(data);
        $.post({url: "http://localhost:3000/api/chirps", data: JSON.stringify(data), contentType: 'application/json; charset=UTF-8'});
    });

});