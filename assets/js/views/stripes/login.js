define(
    [ 'js!raphael!order' ],
    function() {

        var that = {},
            sin,
            cos,
            angleoff,
            ang,
            cratesPath = [],
            timer;

        function init() {
            that.sin = 0.01;
            that.cos = 0.005;
            that.angleoff = 1.9;

            sin = that.sin;
            cos = that.cos;

            angleoff = that.angleoff;
            ang = that.ang;

            cratesPath = [];

            // post
            timer &&
            clearTimeout( timer );
            onresize();
            crateCanvas();
            firstBackground();
        }

        function onresize() {
            that.w =
                $( window ).width();
            that.h =
                $( window ).height() -
                $( '.xv' ).outerHeight( true ) +
                $( 'footer' ).outerHeight( true );
            that.p &&
            that.p.setSize( that.w, that.h );
        }



        // original >

        function crateCanvas() {
            that.p = new Raphael(
                $( '#svg' ).empty().get( 0 ),
                that.w, that.h);

            var h = that.h;
            var w = that.w;

            var lines = [
                "M0 "+(h*0.52)+"R"+(w*0.64)+" "+(h*0.49)+" "+w+" "+(h*0.04),
                "M0 "+(h*0.57)+"R"+(w*0.64)+" "+(h*0.54)+" "+w+" "+(h*0.1),
                "M0 "+(h*0.62)+"R"+(w*0.64)+" "+(h*0.59)+" "+w+" "+(h*0.16),
                "M0 "+(h*0.67)+"R"+(w*0.64)+" "+(h*0.64)+" "+w+" "+(h*0.22),
                "M0 "+(h*0.72)+"R"+(w*0.64)+" "+(h*0.69)+" "+w+" "+(h*0.28),
                "M0 "+(h*0.77)+"R"+(w*0.64)+" "+(h*0.74)+" "+w+" "+(h*0.34),
                "M0 "+(h*0.82)+"R"+(w*0.64)+" "+(h*0.79)+" "+w+" "+(h*0.40),
                "M0 "+(h*0.87)+"R"+(w*0.64)+" "+(h*0.84)+" "+w+" "+(h*0.46),
                "M0 "+(h*0.93)+"R"+(w*0.64)+" "+(h*0.90)+" "+w+" "+(h*0.52),
            ];

            for (var i = 0; i < lines.length; i++) {
                cratesPath.push(that.p.path(lines[i]).attr({'stroke':'#c6c7c7','stroke-opacity':0.2}));
            }
        }

        function firstBackground() {
            clearTimeout(timer);
            var p = that.p;

            var h = that.h;
            var w = that.w;

            var y  = 0.05 * Math.sin(angleoff) + 0.3;
            var x  = 0.05 * Math.sin(angleoff) + 0.5;

            var lines = [
                "M0 "+(h*0.54)+"R"+(w*0.5)+" "+((h+100) - 100)+" "+w+" "+(h*0.54),
                "M0 "+(h*0.54 + 40)+"R"+(w*0.5 + 20)+" "+((h+100)-130)+" "+w+" "+(h*0.54 + 40),
                "M0 "+(h*0.54 + 80)+"R"+(w*0.5 + 40)+" "+((h+100)-160)+" "+w+" "+(h*0.54 + 80),
                "M0 "+(h*0.54 + 120)+"R"+(w*0.5 + 60)+" "+((h+100)-190)+" "+w+" "+(h*0.54 + 120),
                "M0 "+(h*0.54 + 160)+"R"+(w*0.5 + 80)+" "+((h+100)-220)+" "+w+" "+(h*0.54 + 160),
                "M0 "+(h*0.54 + 200)+"R"+(w*0.5 + 100)+" "+((h+100)-250)+" "+w+" "+(h*0.54 + 200),
                "M0 "+(h*0.54 + 240)+"R"+(w*0.5 + 120)+" "+((h+100)-280)+" "+w+" "+(h*0.54 + 240),
                "M0 "+(h*0.54 + 280)+"R"+(w*0.5 + 140)+" "+((h+100)-310)+" "+w+" "+(h*0.54 + 280),
                "M0 "+(h*0.54 + 320)+"R"+(w*0.5 + 160)+" "+((h+100)-340)+" "+w+" "+(h*0.54 + 320)
            ];

            for (var i = 0; i < cratesPath.length; i++) {
                cratesPath[i].animate({
                    path : lines[i],
                    'stroke-opacity' : '1'
                },2000,'cubic-bezier(.39,.58,.56,1)');
            }

            // setTimeout(function(){
            // 	animate(0.11)
            // },2000);
            animate(0.11)
            function animate(angleoffdelta){

                var h = that.h;
                var w = that.w;

                var y  = 0.4 * Math.sin(angleoff) + 0.54;
                var y2  = 0.2 * Math.sin(angleoff) + 0.54;
                var x  = 0.1 * Math.sin(angleoff) + 0.5;

                var lines = [
                    "M0 "+(h*y2)+"R"+(w*x)+" "+((h+100) - 100)+" "+w+" "+(h*y),
                    "M0 "+(h*y2 + 40)+"R"+(w*x + 20)+" "+((h+100)-130)+" "+w+" "+(h*y + 40),
                    "M0 "+(h*y2 + 80)+"R"+(w*x + 40)+" "+((h+100)-160)+" "+w+" "+(h*y + 80),
                    "M0 "+(h*y2 + 120)+"R"+(w*x + 60)+" "+((h+100)-190)+" "+w+" "+(h*y + 120),
                    "M0 "+(h*y2 + 160)+"R"+(w*x + 80)+" "+((h+100)-220)+" "+w+" "+(h*y + 160),
                    "M0 "+(h*y2 + 200)+"R"+(w*x + 100)+" "+((h+100)-250)+" "+w+" "+(h*y + 200),
                    "M0 "+(h*y2 + 240)+"R"+(w*x + 120)+" "+((h+100)-280)+" "+w+" "+(h*y + 240),
                    "M0 "+(h*y2 + 280)+"R"+(w*x + 140)+" "+((h+100)-310)+" "+w+" "+(h*y + 280),
                    "M0 "+(h*y2 + 320)+"R"+(w*x + 160)+" "+((h+100)-340)+" "+w+" "+(h*y + 320)
                ];

                for (var i = 0; i < cratesPath.length; i++) {
                    cratesPath[i].animate({
                        path : lines[i]
                    },500);
                }

                angleoff += angleoffdelta;
                timer = setTimeout(function(){animate(angleoffdelta)},500);

            }
        }

        // < original



        // control
        function start() {
            // stop previousely
            stop();
            // inint and start
            // stripes animation
            init();
            // listen window resize
            $( window ).resize( onresize );
        }
        function stop() {
            // stop animation
            timer = timer &&
                clearTimeout( timer );
            // stop resize listen
            $( window ).off( 'resize', onresize );
        }

        // API
        return {
            start: start,
            stop: stop
        };
    }
);