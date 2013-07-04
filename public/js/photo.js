$(function(){

//    var json = [
//        {"large-photo":"img/photo.jpg","big-photo":"img/photo.jpg","medium-photo":"img/photo.jpg"},
//        {"large-photo":"img/switch_ie8.png","big-photo":"img/switch_ie8.png","medium-photo":"img/switch_ie8.png"},
//        {"large-photo":"img/photo/3.jpg","big-photo":"img/photo/3.jpg","medium-photo":"img/photo/3.jpg"},
//        {"large-photo":"img/photo/4.jpg","big-photo":"img/photo/4.jpg","medium-photo":"img/photo/4.jpg"},
//        {"large-photo":"img/photo/5.jpg","big-photo":"img/photo/5.jpg","medium-photo":"img/photo/5.jpg"},
//        {"large-photo":"img/photo/6.jpg","big-photo":"img/photo/6.jpg","medium-photo":"img/photo/6.jpg"},
//        {"large-photo":"img/photo/7.jpg","big-photo":"img/photo/7.jpg","medium-photo":"img/photo/7.jpg"},
//        {"large-photo":"img/photo/8.jpg","big-photo":"img/photo/8.jpg","medium-photo":"img/photo/8.jpg"},
//        {"large-photo":"img/photo/9.jpg","big-photo":"img/photo/9.jpg","medium-photo":"img/photo/9.jpg"},
//        {"large-photo":"img/photo/1.jpg","big-photo":"img/photo/1.jpg","medium-photo":"img/photo/1.jpg"},
//        {"large-photo":"img/photo/2.jpg","big-photo":"img/photo/2.jpg","medium-photo":"img/photo/2.jpg"},
//        {"large-photo":"img/photo/3.jpg","big-photo":"img/photo/3.jpg","medium-photo":"img/photo/3.jpg"},
//        {"large-photo":"img/photo/4.jpg","big-photo":"img/photo/4.jpg","medium-photo":"img/photo/4.jpg"},
//        {"large-photo":"img/photo/5.jpg","big-photo":"img/photo/5.jpg","medium-photo":"img/photo/5.jpg"},
//        {"large-photo":"img/photo/6.jpg","big-photo":"img/photo/6.jpg","medium-photo":"img/photo/6.jpg"},
//        {"large-photo":"img/photo/7.jpg","big-photo":"img/photo/7.jpg","medium-photo":"img/photo/7.jpg"},
//        {"large-photo":"img/photo/8.jpg","big-photo":"img/photo/8.jpg","medium-photo":"img/photo/8.jpg"},
//        {"large-photo":"img/photo/9.jpg","big-photo":"img/photo/9.jpg","medium-photo":"img/photo/9.jpg"}];

    var json = [];
    $.get( '/gallery/all' )
        .done( function( res ) {
            if ( !res || !res.success || !res.success.length ) return;
            json = res.success;
            console.log( 'photos:', json );
            // fill gallery
            init();
        });

    function init() {

        var start = 0;
        var count = 7;
        var carouselInner = $('#myCarousel .carousel-inner');
        var carouselInnerSamll = $('#smallCarousel .carousel-inner');
        //var json = $.parseJSON( $('#allImg').val() );

        // parse img
        var divSmall =  $('<div>',{
            'class' : 'item active'
        });

        if( navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/) ){
            count = 3;
        }

        divSmall.appendTo(carouselInnerSamll);

        for(var i = start; i < count; i++){
            creatItem(json[i], start);
            start++;
        }

        function creatItem(obj, start){

            var a = $('<a>',{
                'class' : 'item',
                'href' : '#lightbox',
                'data-toggle' : 'lightbox'
            });

            var img = $('<img>',{
                'src' : obj['big-photo'],
                'data-medium' : obj['medium-photo'],
                'data-large' : obj['large-photo']
            });

            var div = $('<div>')
            var imgTwo = $('<img>',{
                'src' : obj['medium-photo'],
                'data-item' : start
            });

            a.appendTo(carouselInner);
            img.appendTo(a);

            div.appendTo(carouselInnerSamll.find('.item:last'));
            imgTwo.appendTo(div);
        }
        carouselInner.find('.item').eq(0).addClass('active');

        // init carousel
        $('.carousel').carousel({
            interval: false,
            cycle: false
        });

        var href = carouselInner.find('.active img').data('large');
        $('#donwload').attr('href', href);
        $('#lightbox').find('img').attr('src', href);



        function creatNewElements(){

            var divSmall =  $('<div>',{
                    'class' : 'item'
                });
            divSmall.appendTo(carouselInnerSamll);

            for(var i = 0; i < count; i++){
                if( json[start] === undefined ) break;
                creatItem(json[start], start);
                start++;
            }
            if( !carouselInnerSamll.find('.item:last').children().length ){
                carouselInnerSamll.find('.item:last').remove();
            }
            $('.carousel').carousel({
                interval: false,
                cycle: false
            });
        }
        // stop slide
        $('#myCarousel').on('slid', function(){  // big carousel
            var active = carouselInner.find('.active');
            var img = active.find('img');

            if( !active.next().length ){
                creatNewElements();
            }

            if(  active.index() % count === 0 ){

                var itemScroll = active.index() / count;
                itemScroll === 0 ? 1 : itemScroll;

                $('#smallCarousel').carousel(itemScroll);
            }

            $('#donwload').attr('href', img.data('large'))  // button download
            $('#lightbox').find('img').attr('src', img.data('medium')) // popup photo

        });

        $('#smallCarousel').on('slid', function(){ // small carousel
            if( !carouselInnerSamll.find('.active').next().length ){
                creatNewElements();
            }

        });

        //  small carousel
        $('#smallCarousel').on('click', '.right', function(){
            if( $('#smallCarousel .item').length === 1 ){
                creatNewElements();
            }
        });

        $('#myCarousel').on('click', '.left', function(){
            var active = carouselInner.find('.active');
            if(  active.index() % count === 0 ){

                var itemScroll = active.index() / count;
                itemScroll--;
                $('#smallCarousel').carousel(itemScroll);

            }
        });


        //
        $('.carousel-control.left').on('click', function(){
            var active = $(this).parent().find('.active');
            if( active.index() === 0 ){
                return false;
            }

        });

        $('#smallCarousel').on('click', 'img', function(){
            $('#myCarousel').carousel( $(this).data('item') );
        });


        // light box
        $('#lightbox').lightbox({
            show:false
        })

        // (!)
        // slide to photo section (for only #photo url hash)
        var hash = document.URL.substr(document.URL.indexOf('#') + 1); // ie supported
        if ( hash && 'gallery' == hash ) {
            //$target.carousel({ slide: 'photo' });
            // warning! imitate click on DOM element by its attribute
            $( '[data-slide="photo"]' ).click();
        }

    }

});