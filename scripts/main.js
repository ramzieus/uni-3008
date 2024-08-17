document.addEventListener('DOMContentLoaded', () => {
    let map = L.map('map', { zoomControl: false }).setView([38.9637, 35.2433], 8);
    L.tileLayer('assets/turkey/{z}/{x}/{y}.png', {
        maxZoom: 8,
        minZoom: 1,
    }).addTo(map);

    let radarIndex = 1;
    $('#zoom-in').click(function () {
        map.zoomIn(1);
        if (radarIndex != 1){
            radarIndex = radarIndex - 1;
        }
        let radarSrc = `assets/images/radar/radar_${radarIndex}.svg`
        $('#waves').attr('src', radarSrc)
        $('#km').html(`${radarIndex * 100} KM`)
    })

    $('#zoom-out').click(function () {
        map.zoomOut(1);
        if (radarIndex != 8){
            radarIndex = radarIndex + 1;
        }
        let radarSrc = `assets/images/radar/radar_${radarIndex}.svg`
        $('#waves').attr('src', radarSrc)
        $('#km').html(`${radarIndex * 100} KM`)
    })



    let tiltIndex = 0;
    let panIndex = 0;

    $('#tilt-plus').click(async function () {
        animatedButton('#tilt-plus', 'tilt_plus.svg', 'clicked_tilt_plus.svg')
        if (tiltIndex != 11) {
            tiltIndex = tiltIndex + 1;
            $('#pan').attr('src', `assets/images/panel-pan/open-panel/open-panel-${panIndex}.svg`);
        }
        $('#waves').show();
        let tiltSrc = `assets/images/tilt/tilt-${tiltIndex}.svg`
        let centerPanelSrc = `assets/images/center_panel/center-panel-${tiltIndex}.svg`
        $('#tilt').attr('src', tiltSrc);
        $('#center-panel').attr('src', centerPanelSrc);
        $('#tilt-value').html(`${tiltIndex * 10}˚`)
    });

    $('#tilt-minus').click(async function () {
        animatedButton('#tilt-minus', 'tilt_minus.svg', 'clicked_tilt_minus.svg');
        if (tiltIndex != 0) {
            tiltIndex = tiltIndex - 1;
            $('#pan').attr('src', `assets/images/panel-pan/open-panel/open-panel-${panIndex}.svg`);
        }
        if (tiltIndex === 0) {
            $('#waves').hide();
            $('#pan').attr('src', `assets/images/panel-pan/close-panel/close-panel-${panIndex}.svg`);
        }
        let tiltSrc = `assets/images/tilt/tilt-${tiltIndex}.svg`
        let centerPanelSrc = `assets/images/center_panel/center-panel-${tiltIndex}.svg`
        $('#tilt').attr('src', tiltSrc);
        $('#center-panel').attr('src', centerPanelSrc);
        $('#tilt-value').html(`${tiltIndex * 10}˚`)
    });

    $('#pan-plus').click(function () {
        animatedButton('#pan-plus', 'pan_right.svg', 'clicked_pan_right.svg');
        if (panIndex != 18) {
            panIndex = panIndex + 1;
        }
        let panSrc = '';
        if (tiltIndex > 0) {
            panSrc = `assets/images/panel-pan/open-panel/open-panel-${panIndex}.svg`
        } else {
            panSrc = `assets/images/panel-pan/close-panel/close-panel-${panIndex}.svg`
        }

        $('#pan').attr('src', panSrc);
        $('#pan-value').html(`${panIndex * 10}˚`)
    });

    $('#pan-minus').click(function () {
        animatedButton('#pan-minus', 'pan_left.svg', 'clicked_pan_left.svg');
        if (panIndex != -18) {
            panIndex = panIndex - 1;
        }

        let panSrc = '';
        if (tiltIndex > 0) {
            panSrc = `assets/images/panel-pan/open-panel/open-panel-${panIndex}.svg`
        } else {
            panSrc = `assets/images/panel-pan/close-panel/close-panel-${panIndex}.svg`
        }
        $('#pan').attr('src', panSrc);
        $('#pan-value').html(`${panIndex * 10}˚`)
    });

    $('.dropdown-button').on('click', function() {
        $('.dropdown-menu').not($(this).siblings('.dropdown-menu')).addClass('hidden');
            
            // Toggle the dropdown menu related to this button
            $(this).siblings('.dropdown-menu').toggleClass('hidden');
    });

    // Close the dropdown if clicked outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown-button').length) {
            $('.dropdown-menu').addClass('hidden');
        }
    });

});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animatedButton(src, empty, filled) {
    let imgSrc = 'assets/images/';
    $(src).attr('src', imgSrc + filled);
    await delay(100);
    $(src).attr('src', imgSrc + empty);
}