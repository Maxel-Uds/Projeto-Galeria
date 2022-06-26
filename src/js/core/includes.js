import $ from 'jquery';

const loadHtmlSuccessCallbacks = new Set();

export function onLoadHtmlSuccess(callback) {
    loadHtmlSuccessCallbacks.add(callback);
}

function loadIncludes(parent) {
    if(!parent) parent = 'body'

    $(parent)
        .find('[wm-include]')
        .each(function(index, element) {
            const url = $(element).attr('wm-include');
            $.ajax({
                url,
                success(data) {
                    $(element).html(data);
                    $(element).removeAttr('wm-include');

                    loadHtmlSuccessCallbacks.forEach(callback => callback(data));
                    loadIncludes(element);
                }
            });
        });
}

loadIncludes();