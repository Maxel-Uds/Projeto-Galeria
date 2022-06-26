import $ from 'jquery';
const animationDuration = 300;

function filterByCity(city) {
    $('[wm-city]')
        .each(function(index, element) {
            const isTarget = $(this).attr('wm-city') === city || city === null;

            if(isTarget) {
                $(this).parent().removeClass('d-none');
                $(this).fadeIn(animationDuration);
            }
            else {
                $(this).fadeOut(animationDuration, () => {
                    $(this).parent().addClass('d-none');
                });
            }
        });
}

$.fn.cityButtons = function() {
    const cities = new Set();
    $('[wm-city]').each((index, element) => {cities.add($(element).attr('wm-city'))});

    const btns = Array.from(cities).map(city => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info'])
            .html(city);
        
        btn.click(e => {filterByCity(city)});
        return btn;
    });

    const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas as Fotos');
    btnAll.click(e => {filterByCity(null)});
    btns.push(btnAll);

    const btnGroup = $('<div>').addClass(['btn-group']);
    btnGroup.append(btns);

    $(this).html(btnGroup);

    return this;
}

$('[wm-city-buttons]').cityButtons();