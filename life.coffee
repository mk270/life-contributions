
life = (query) ->
    null

tick = () ->
    selector = "div#contributions-calendar div.js-graph svg"
    query = document.querySelector selector

    if query then life query else null

window.setInterval tick, 3000