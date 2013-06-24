
copyright_boilerplate = """
  Life Contributions, a Coffeescript life implementation for Github pages

  Copyright (C) 2013  Martin Keegan

  This programme is free software; you may redistribute and/or modify
  it under the terms of the Apache License v2.0
"""

life = (weeks) ->
    x0 = 0
    y0 = 0
    xmax = 54
    ymax = 6
    
    directions = [
        [-1, -1],  [0, -1],  [1, -1],
        [-1,  0],            [1,  0],
        [-1,  1],  [0,  1],  [1,  1]
        ]

    colour_of_day = (day) ->
        if not day
        then "eeeeee;"
        else
            style = day.getAttribute "style"
            style.split(" #")[1]

    style_means_live = (style) ->
        style != "eeeeee;"

    tile = (x, y) ->
        weeks[x]?.childNodes[y] # hack: assuming tiles in chrono order

    set_tile = (x, y, colour) ->
        style = "fill: #" + colour
        elt = tile(x, y)
        elt?.setAttribute("style", style)

    cell_live = (x, y) ->
        elt = tile(x, y)
        colour = colour_of_day elt
        style_means_live colour

    col_live = (x) ->
        cell_live(x, y) for y in [y0 .. ymax]

    cells = () ->
        col_live(x) for x in [x0 .. xmax]

    neighbours = (x, y, board) ->
        tmp =
            for dir in directions
                [dx, dy] = dir
                if board[x + dx]?[y + dy] then 1 else 0
        tmp.reduce (x, y) -> x + y

    regenerate = (x, y, current, board) ->
        n = neighbours(x, y, board)

        (current and 2 <= n <= 3) or ((not current) and n == 3)

    board = cells()

    for x in [x0 .. xmax]
        for y in [y0 .. ymax]
            current = board[x]?[y] or false
            v = regenerate(x, y, current, board)
            if v != current
                set_tile(x, y, if v then "d6e685;" else "eeeeee;")

tick = () ->
    selector = "div#contributions-calendar div.js-graph svg g g"
    query = document.querySelectorAll selector

    if query then life query else null

window.setTimeout (() -> window.setInterval tick, 1000), 1500

