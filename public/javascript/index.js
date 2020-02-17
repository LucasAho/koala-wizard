$(".scrape-new").on("click", event => {
    event.preventDefault();
    $.ajax('/scrape', {
        type: "GET"
    }).then(function() {
        location.reload()
    });
});