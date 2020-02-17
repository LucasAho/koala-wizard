$(function () {
    displayArticles = articles => {
        articles.forEach(article => {
            console.log(article);
        });
    }

    $(".scrape-new").on("click", event => {
        event.preventDefault();
        $.ajax('/scrape', {
            type: "POST"
        }).then(function(res) {
            console.log(res);
        });
    });
});