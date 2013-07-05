$(function(){

    var direction = '';

    // use global variables to access from other site modules
    window.gallery = {};
    window.currentAlbum = null;
    // photos list
    var json = [];

    // get gallery albums list from server
    $.get( '/gallery' )
        .done( function( res ) {
            if ( !res || !res.success || !res.success.length ) return;

            // settings
            var albums = [],
                url = '/photos/',
                sep = ' &nbsp; ';

            // parse and normalize albums
            res.success.forEach( function( album )
            {
                // parse photos
                var photos = [];
                album.photos &&
                album.photos.forEach( function( photo ) {
                    photos.push({
                        'large-photo': url + photo.name + '.' + photo.ext,
                        'big-photo': url + photo.name + '_middle.' + photo.ext,
                        'medium-photo': url + photo.name + '_small.' + photo.ext
                    });
                });

                // add album
                albums.push({
                    // id: album._id,
                    short: album.date || album.club,
                    full: sep+ album.date +sep+ album.club +sep+ album.city +sep,
                    photos: photos
                });
            });

            // prepare variables ( locals and globals )

            // global gallery
            window.gallery = albums;
            // fill gallery
            json = null !== currentAlbum
                && gallery[ currentAlbum ]
                && gallery[ currentAlbum ].photos;

            // init album titles ( right menu )
            initTitlesMenu( albums );
            // open first album
            window.currentAlbum = albums.length && 0;
            if ( albums.length )
                updateGallery( currentAlbum );
        });

    /**
     * Refresh gallery with updated content ( other album photos )
     * @param {Integer} albumIndex
     */
    function updateGallery( albumIndex ) {
        // checks
        if ( undefined === albumIndex ) return;
        var list = gallery[ albumIndex ]
            && gallery[ albumIndex ].photos;
        if ( !list || !list.length ) return;
        // update photos list
        json = list;
        // set album as current
        currentAlbum = albumIndex;
        // init gallery viewer
        init();
    }

    /**
     * Fill album titles menu ( right menu list )
     * @param {Array} albums
     */
    function initTitlesMenu( albums ) {
        if ( !albums || !albums.length ) return;

        // parse each album and create menu items
        albums.forEach( function( album, index ) {
            var item = $( '<li name="putty'+ ( index + 1) +'" class="putty" data-album="'+ index +'">'+ album.full +'</li>' );
            $( '#albumTitles' ).append( item );

            // show album in gallery viewer ( on click )
            item.click( function( e ) {
                e.preventDefault();
                var index = $( e.target ).attr( 'data-album' );
                updateGallery( index );
            })
        });
    }

    /**
     * Initialize gallery viewer
     */
    function init() {

        var start = 0;
        var count = 7;
        var carouselInner = $('#myCarousel .carousel-inner');
        var carouselInnerSamll = $('#smallCarousel .carousel-inner');
        //var json = $.parseJSON( $('#allImg').val() );

        // clean old gallery content
        carouselInner.empty();
        carouselInnerSamll.empty();

        if( navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/) ){
            count = 3;
        }

        // parse img
        var divSmall =  $('<div>',{
            'class' : 'item active'
        });
        divSmall.appendTo(carouselInnerSamll);

        for(var i = start; i < count; i++){
            creatItem(json[i], start);
            start++;
        }

        function creatItem(obj, start){

            if ( !obj ) return; // :(

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
                'src' : obj['big-photo'],
                'data-item' : start
            });

            a.appendTo(carouselInner);
            img.appendTo(a);

            div.appendTo(carouselInnerSamll.find('.item:last'));
            imgTwo.appendTo(div);
        }

        carouselInner.find('.item').eq(0).addClass('active');

        var large = carouselInner.find('.active img').data('large');
        var bid = carouselInner.find('.active img').attr('src');

        $('#donwload').attr('href', large);
        $('#lightbox').find('img').attr('src', bid);



        function creatNewElements(){
            console.log( 'creatNewElements' );
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

        }

        // init carousel
        $('.carousel').each(function(){
            $(this).carousel({
                interval: false,
                cycle: false
            });
        });

        // stop slide
        $('#myCarousel').off('slid').on('slid', function(){  // big carousel
            var active = carouselInner.find('.active');
            var img;
            console.log( 123 );
            if(  active.index() % count === 0 ){

                var itemScroll = active.index() / count;
                itemScroll === 0 ? 1 : itemScroll;

                $('#smallCarousel').carousel(itemScroll);
                creatNewElements();
            }

            if( direction === 'standart' || direction === '') {
                img = active.find('img');
            }

            if ( !img ) return;
            var large = img.data('large');
            var bid = img.attr('src');

            $('#lightbox').find('img').attr('src', bid) // popup photo
            $('#donwload').attr('href', large)  // button download

        });

        $('#myCarousel').off('slide').on('slide', function(){
            var active = carouselInner.find('.active');
            var img;
           
            if( direction === 'next' ){
                img = active.next().find('img');
            }
            else if( direction === 'prev' ){
                img = active.prev().find('img');
            }

            if( !img ) return;
            var large = img.data('large');
            var bid = img.attr('src');

            $('#lightbox').find('img').attr('src', bid) // popup photo
            $('#donwload').attr('href', large)  // button download

        });

        $('#myCarousel').off('click').on('click', '.left', function(){
            var active = carouselInner.find('.active');
            direction = 'standart';
            if(  active.index() % count === 0 ){

                var itemScroll = active.index() / count;
                itemScroll--;
                $('#smallCarousel').carousel(itemScroll);

            }
        });

        $('#myCarousel').off('click').on('click', '.right', function(){
            direction = 'standart';
        });


        //  small carousel
        $('#smallCarousel').off('slid').on('slid', function(){ // small carousel
            if( !carouselInnerSamll.find('.active').next().length ){
                creatNewElements();
            }

        });
        $('#smallCarousel').on('click', '.right', function(e){
            var active = $('#smallCarousel').find('.active');
            if( active.length === 1 ){
                console.log( 'crate new elements' );
                 creatNewElements();
            }

            if( active.length === 0){
                console.log( 'stop sliding' );
                return false;
            }
        });
        //
        $('.carousel-control.left').off('click').on('click', function(){
            var active = $(this).parent().find('.active');
            if( active.index() === 0 ){
                return false; 
            }

        });

        $('#smallCarousel').off('click').on('click', 'img', function(){
            direction = 'standart';
            $('#myCarousel').carousel( $(this).data('item') );
        });


        // lightBox
        var lightBox = $('#lightbox');
        var lightBoxContent = $('.lightbox-content');
        lightBox.lightbox({
            show:false
        });

        // lightBox event show
        lightBox.on('show', function(){
            var active = carouselInner.find('.active');

            if( active.index() === 0 ){
                $('.prev-photo').hide();
            }
            else{
                $('.prev-show').hide();
            }
                
        });

        // next button lightBox
        $('.next-photo').on('click', function(e){
            e.preventDefault();

            direction = 'next';
            $('.carousel').carousel('next');
            $('.prev-photo').show();
            lightBox.lightbox('preloadSize');

        });

        // prev button lightBox
        $('.prev-photo').on('click', function(e){
            e.preventDefault();

            var active = carouselInner.find('.active');

            direction = 'prev';

            $('.carousel').carousel('prev');
            lightBox.lightbox('preloadSize');

            if( active.index() - 1 === 0 )
                $('.prev-photo').hide();

        });

        // donwload click
        $('#donwload').on('click', function(){
            window.location = $(this).attr('href');
        });

        //  click category patty, refresh carousel
        $('.nav-photo').on('click vclick', 'li', function(){
            $this = $(this);

            // var url = '/putty/' + $this.data('name');
            // $.getJSON(url, carousel);

            // var url = '/putty';
            // $.getJSON(url, { putty: $this.data('name') }, carousel);
            // function carousel(data){

            // 	$('#allImg').val(data);

            // 	carouselInner.find('.item').remove();
            // 	carouselInnerSamll.find('.item').remove();
            // 	start = 0;
            // 	json = $.parseJSON( $('#allImg').val() );

            // 	var divSmall =  $('<div>',{
            // 		'class' : 'item active'
            // 	});
            // 	divSmall.appendTo(carouselInnerSamll);

            // 	for(var i = start; i < count; i++){
            // 		creatItem(json[i], start);
            // 		start++;
            // 	}
            // 	carouselInner.find('.item').eq(0).addClass('active');
            // 	carouselInnerSamll.find('.item').eq(0).addClass('active');

            // 	$('.putty').removeClass('putty');
            // 	$this.addClass('putty');

            // }

        });
    }

    // (!)
    // slide to photo section (for only #photo url hash)
    var hash = document.URL.substr(document.URL.indexOf('#') + 1); // ie supported
    if ( hash && 'gallery' == hash ) {
        //$target.carousel({ slide: 'photo' });
        // warning! imitate click on DOM element by its attribute
        $( '[data-slide="photo"]' ).click();
    }

});
