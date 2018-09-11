$(document).ready(() => {
    
    getChirps();

    class ChirpCard {
        constructor(id, name, text) {
            this.id = id;
            this.name = name;
            this.text = text;
            this.div = $(`<div class="card"><div id="${this.id}"class='card-body'></div></div>`);
            $("#Timeline").prepend(this.div);
            $(`#${this.id}`).append(`<h5 class="card-title">${this.name}</h5>`);
            $(`#${this.id}`).prepend(`<button id="close" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>`);
            $(`#${this.id}`).append(`<p class="card-text" id="card-text-${this.id}">${this.text}</p>`);
            $(`#${this.id}`).append(`<button class="btn btn-primary" type="button" id="edit-btn">Edit</button>`);
            $(this.div).addClass("my-3");

            //when 'x' is clicked, call delete method
            $("#close").click(() => {
                this.deleteChirp();
            });

            //when chirp is clicked, call update method
            $("#edit-btn").click(() => {
                this.updateChirp();
            });
        }

        //deletes current chirp data from server and then removes card fromm DOM
        deleteChirp() {
            $.ajax({
                url: `http://localhost:3000/api/chirps/${this.id}`,
                type: 'DELETE',
                success: () => {
                    $(this.div).remove();
                },
                error: error=> alert(error)
            });
        }

        //pop up a modal to edit the contents and then use ajax method to put new data to server
        updateChirp() {
            let text = this.text;
            console.log(this.id);
            $("#edit-chirp-modal").modal('toggle');
            $("#edit-chirp-name").val(this.name)
            $("#edit-chirp-text").val(this.text);
            $("#save-change").click(() => {
                var updatedText = {
                    name: $("#edit-chirp-name").val(),
                    text: $("#edit-chirp-text").val()
                };
                console.log(updatedText);
                $.ajax({
                    url: `http://localhost:3000/api/chirps/${this.id}`,
                    type: 'PUT',
                    data: JSON.stringify(updatedText),
                    contentType: 'application/json; charset=UTF-8',
                    success: () => {
                        getChirps()
                    },
                    error: error=>alert(error)
                });
            });
        }
    }

    //click event to handle new post
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
        getChirps();
    });


    //calls ajax request to get all chirps from server
    function getChirps() {
        $("#Timeline").empty();
        $.ajax({
            url: "http://localhost:3000/api/chirps",
            success: (result) => {
                for (const id in result) {
                    if (result[id].name !== undefined) {
                        new ChirpCard(id, result[id].name, result[id].text);
                    };
                };
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

});
