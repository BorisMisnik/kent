
$( document ).ready(
function() {

    var
        // form elements
        brandFileds = $( 'select.skuA' ),
        skuFileds = $( 'select.skuB' ),

        // gathered data from server
        count = 2,
        brands,
        sku;

    // Data

    $
        .ajax({ url: '/js/data/brands.json' })
        .success( function( data ) {
            // console.log( 'brands', data );
            brands = data;
            if ( !--count ) init();
        });
    $
        .ajax({ url: '/js/data/sku.json' })
        .success( function( data ) {
            // console.log( 'sku', data );
            sku = data;
            if ( !--count ) init();
        });

    function init() {
        fillBrands();
        fillSku();
        // init fields caption
        //brandFileds.val('');
        //skuFileds.val('');
        visualUpdate();
    }

    // Form

    function fillBrands() {
        // fill select
        brandFileds.change(
            function() {
                var
                    el = $( this ),
                    val = el.val(),
                    linked = el.attr( 'linked' ),
                    link = $( linked );
                // console.log( 'CHANGE', arguments, el, val );
        
                selectCaption( el, val );
                fillSelect( link, sku[ val ]);

                // visualUpdateCurrent( linked );
                setTimeout( function() {

                   skuFileds.selectpicker('refresh');

                   $('.skuB .dropdown-menu').mCustomScrollbar("destroy");
                   $('.skuB .dropdown-menu').mCustomScrollbar({
                            advanced:{
                                updateOnContentResize: true
                            },
                            mouseWheel : true
                        });

                }, 0 );
            });
        fillSelect( brandFileds, brands );
    }

    function fillSku() {

    }

    // Helpers

    function selectCaption( select, name ) {
        $( select )
            .prev( '.select__text' )
            .text( brands[ name ] || name );
    }

    function fillSelect( elem, data ) {
        // check
        if ( !data
            || !elem.length)
            return;
        // fill
        elem.each(
            // each <select>
            function() {
                var
                    el = $( this ),
                    current = el.attr( 'current' ),
                    first = true,
                    opt,
                    val;

                if( el.is('.btn-group') )
                    el = el.prev('select');
 
                // fill brands
                el.empty();
                for ( val in data ) {

                    // <option> element
                    opt =
                        $( '<option />', {
                            value: val,
                            text: data[ val ]
                        });
                    // mark current
                    if ( current == val )
                        opt.attr( 'selected', true );
                    // add <option> to select
                    opt.appendTo( el );

                    if ( first ) {
                        first = false;
                        el.val( val );
                    }
                }

                // remove mark of current
                if ( current )
                    el.attr( 'current', null );

                // events
                el.change();

                // show caption
                // console.log( 'current', current, val );
                //selectCaption( el, el.val( val ));

            });

      
    }

    function defaultValue(){}


    function visualUpdate() {

       skuFileds.selectpicker('refresh');

       $('.skuB .dropdown-menu').mCustomScrollbar("destroy");
       $('.skuB .dropdown-menu').mCustomScrollbar({
            advanced:{
                updateOnContentResize: true
            },
            mouseWheel : true
        });
    }
});