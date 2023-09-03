$(document).ready(function () {
    "use strict";
    tw_anim_init('[data-anim]');
});
function tw_anim_init($items) {
    "use strict";
    $($items).each(function () {
        var $sAc = $(this);
        var $sAcAnim = $sAc.data('anim');
        var $sAcAnimTarget = $sAcAnim ? $($sAcAnim, $sAc) : false;
        var $sAcAnimIn = $sAc.data('anim-in');
        if ($sAcAnimTarget && $sAcAnimTarget.length && $sAcAnimIn) {
            $sAcAnimTarget.addClass('tw-outview');
        }
    });
}
function tw_out($outs) {
    "use strict";
    $outs.each(function () {
        var $sAc = $(this);
        var $sAcAnim = $sAc.data('anim-out-target') ? $sAc.data('anim-out-target') : $sAc.data('anim');
        var $sAcAnimTarget = $sAcAnim ? $($sAcAnim, $sAc) : false;
        var $sAcAnimOut = $sAc.data('anim-out') ? $sAc.data('anim-out') : 'tw-anim-hide';
        var $sAcAnimDelay = $sAc.data('anim-delay') ? parseInt($sAc.data('anim-delay'), 10) : 0;
        if ($sAcAnimTarget && $sAcAnimTarget.length && $sAcAnimOut) {
            $sAcAnimTarget.each(function (i) {
                var $delAnim = $(this).removeClass($sAcAnimOut).removeClass('tw-outview').css({ opacity: '', visibility: '' });
                setTimeout(function () {
                    $delAnim.addClass($sAcAnimOut);
                    setTimeout(function () {
                        $delAnim.removeClass($sAcAnimOut).addClass('tw-outview');
                    }, 500);
                }, i * $sAcAnimDelay);
            });
        }
    });
}
function tw_in($ins) {
    "use strict";
    $ins.each(function (j) {
        var $sAc = $(this);
        var $sAcAnim = $sAc.data('anim');
        var $sAcAnimTarget = $sAcAnim ? $($sAcAnim, $sAc) : false;
        var $sAcAnimIn = $sAc.data('anim-in');
        var $sAcAnimDelay = $sAc.data('anim-delay') ? parseInt($sAc.data('anim-delay'), 10) : 0;
        if ($sAcAnimTarget && $sAcAnimTarget.length && $sAcAnimIn) {
            $sAcAnimTarget.addClass('tw-outview');
            setTimeout(function () {
                $sAcAnimTarget.each(function (i) {
                    var $delAnim = $(this).removeClass($sAcAnimIn);
                    setTimeout(function () {
                        $delAnim.removeClass('tw-outview').addClass($sAcAnimIn).css({ opacity: '', visibility: '' });
                        if ($delAnim[0]._scrollspy) {
                            $delAnim[0]._scrollspy.inview = true;
                        }
                        var $cntrUpAnim = $delAnim.filter('.tw-counterup').length ? $delAnim.filter('.tw-counterup') : $('.tw-counterup', $delAnim);
                        $cntrUpAnim.each(function () {
                            var $crCntrUpCont = $(this);
                            var $crSlctr = $crCntrUpCont.data('slctr') ? $crCntrUpCont.data('slctr') : 'h1';
                            var $crCntrUp = $($crSlctr, $crCntrUpCont);
                            if ($crCntrUp.length) {
                                $crCntrUp.trigger('tw-animate');
                            }
                        });
                        setTimeout(function () {
                            $delAnim.removeClass($sAcAnimIn);
                        }, 500);
                    }, (i + 1) * $sAcAnimDelay);
                });
            }, (j + 1) * $sAcAnimDelay);
        }
    });
}
function tw_data_parse($data) {
    "use strict";
    var $newData = [];
    if ($data) {
        $data.split(';').forEach(function ($item) {
            $item = $item.trim();
            if ($item) {
                $item = $item.split(':');
                $newData[$item[0].trim()] = $item[1].trim();
            }
        });
    }
    return $newData;
}
function tw_anim_data_con($els, $preIn, $preOut) {
    "use strict";
    var $datas = [];
    $els.each(function () {
        var $el = $(this);
        var $elData = $el.data('uk-scrollspy') ? $el.data('uk-scrollspy') : ($el.attr('uk-scrollspy') ? $el.attr('uk-scrollspy') : false);
        if ($elData) {
            $elData = tw_data_parse($elData);
            $datas.push($elData);
            if ($elData.target) {
                $el.data('anim', ($preIn ? $preIn : '') + $elData.target);
                $el.data('anim-out-target', ($preOut ? $preOut : '') + $elData.target);
            }
            if ($elData.cls) {
                $el.data('anim-in', $elData.cls);
            }
            if ($elData.delay) {
                $el.data('anim-delay', $elData.delay);
            }
        }
    });
    return $datas;
}
