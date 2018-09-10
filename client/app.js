$(document).ready(() => {

    class ChirpCard {
        constructor(id, name, text) {
            this.id = id;
            this.name = name;
            this.text = text;
            this.div = $(`<div class="card"><div id="${this.id}"class='card-body'></div></div>`);
            $("#Timeline").prepend(this.div);
            $(`#${this.id}`).append(`<h5 class="card-title">${this.name}</h5>`);
            $(`#${this.id}`).prepend(`<button id="close" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>`);
            $(`#${this.id}`).append(`<p class="card-text">${this.text}</p>`);
            $(this.div).addClass("my-3");

            $("#close").click(()=> {
                this.deleteChirp();
            });
        }

        deleteChirp() {
            $.ajax({
                url: `http://localhost:3000/api/chirps/${this.id}`,
                type: 'DELETE',
                success: ()=>{
                    $(this.div).remove();
                },
                error: (error) => alert(error)
            });
        }

        updateChirp() {

        }
    }

    $.ajax({
        url: "http://localhost:3000/api/chirps",
        success: (result) => {
            for (const item in result) {
                if (result[item].name !== undefined) {
                    new ChirpCard(item, result[item].name, result[item].text);
                };
            };
        },
        error: (error) => {
            console.log(error);
        }
    });

    $("#chirp-post").click(() => {
        let name = $("#chirp-name").val();
        let text = $("#chirp-text").val();
        let data = {
            name: name,
            text: text
        };
        $.post({
            url: "http://localhost:3000/api/chirps",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=UTF-8'
        });
        new ChirpCard(null, name, text);
    });



});