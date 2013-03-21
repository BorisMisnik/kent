$(function() {
    if (window.PIE) {
        $('.wrapper-form').each(function() {
            PIE.attach(this);
        });
    }
});