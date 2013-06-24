
console.log "life begins at onLoad()"

life = (query) ->
    console.log "life()"
    null

tick = () ->
    console.log "tick"

    selector = "div#contributions-calendar div.js-graph svg"
    query = document.querySelector selector

    if query then life query else null

window.setInterval tick, 3000