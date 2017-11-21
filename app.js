var topics = ["cat", "dog", "ferret", "star wars", "space", "storm", "kinetic sculpture"];
for (let i in topics) {
    $('#button-container').append($('<button>').attr('value', topics[i]).text(topics[i]).attr('class', 'giphy'));
}

var url = 'https://api.giphy.com/v1/gifs/search';

var param = {
    api_key: 'U6rxccdkNVQX1ZRq9R4UzyXzbWYaZSBC',
    limit: '10',
    rating: 'pg'
};

$('#add-button').click(function(event) {
    event.preventDefault(); //prevent page refresh on form submission
    var input = $("#button-input").val().trim();
    var newButton = $('<button>');
    newButton.text(input)
        .attr('value', input);
    $('#button-container').append(newButton);
    topics.push(input);
});

$(document).click(function(event) {
    if ($(event.target).is('button')) {
        param.q = $(event.target).val();
        url += "?" + $.param(param); //jQuery's .param() will convert an object into a series of "key=value" strings, perfect for an API call.
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function(result) {
            //console.log(JSON.stringify(result));
            $('#giphy-container').empty();
            $("#giphy-container").append($("<div class='container'>"));
            for (let i = 0; i < param.limit; i++) {
                if (param.limit % 4 === 0) {
                    $("#giphy-container div").append($("<div class='row'>"));
                }
                var target = $("#giphy-container div div:last-child"); //The last row div in the container

                var newDiv = $('<div class="col-sm-4">');
                var newImage = $('<img>');
                var newP = $('<p>');
                newP.text(result.data[i].rating);
                $(newImage).attr('src', result.data[i].images.fixed_height_still.url)
                    .attr('data-still', result.data[i].images.fixed_height_still.url)
                    .attr('data-animated', result.data[i].images.fixed_height.url);
                $(newDiv).append(newImage).append(newP);
                $('#giphy-container').append(newDiv);
            }

        });

    }
    else if ($(event.target).is('img')) {
        if ($(event.target).attr('src') === $(event.target).attr('data-still')) {
            $(event.target).attr('src', $(event.target).attr('data-animated'));
        }
        else {
            $(event.target).attr('src', $(event.target).attr('data-still'));
        }
    }
});
