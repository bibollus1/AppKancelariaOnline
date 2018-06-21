(function(){
    var resize = function (node) {
        var offset = node.offsetHeight - node.clientHeight;
        jQuery(node).css('height', 'auto').css('height', node.scrollHeight + offset);
    };
    jQuery(document).bind("ready", function(){
        jQuery('textarea[data-autoresize]')
            .bind('keyup input', function () {
                resize(this);
            })
            .removeAttr('data-autoresize')
            .addClass("resizing")
            .trigger("input");
    });
    jQuery(document).trigger("ready");
})();
