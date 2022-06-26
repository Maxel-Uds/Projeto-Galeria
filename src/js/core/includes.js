import $ from 'jquery';

function loadIncludes(parent) {
    if(!parent) parent = 'body'
    console.log(parent);

    $(parent)
        .find('[wm-include]')
        .each(function(index, element) {
            console.log(element);
            const url = $(element).attr('wm-include');
            $.ajax({
                url,
                success(data) {
                    $(element).html(data);
                    $(element).removeAttr('wm-include');

                    loadIncludes(element);
                }
            });
        });
}

loadIncludes();