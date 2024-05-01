const dialogEvent = new Event('dialogEvent');

(() => {
  document.addEventListener('dialogEvent', () => {
    document.querySelectorAll('.dialog').forEach(el => {
      let isClose = false;
        $(el).dialog({
          autoOpen: false,
          modal: true,
          draggable: false,
          resizable: false,
          title: $(el).data('title'),
          dialogClass: 'mdo-dialog',
          open: () => {
            if (!$('body').hasClass('signIn-modal-active')) {
              $('.ui-widget-overlay').css('opacity', '0.6');
              $('.mdo-dialog').css('opacity', '1');
              $('.main-content').css('filter', 'blur(3px)');
              $('body').addClass('modal-open');
            }
            setTableHeight();
          },
          beforeClose: (e) => {
            if (!isClose) {
              e.preventDefault();
              $('.ui-widget-overlay').css('opacity', '0');
              $('.mdo-dialog').css('opacity', '0');
              $('.main-content').css('margin', 'unset');
              isClose = true;
              if (window.innerWidth < 1150) {
                setTimeout(() => $(el).dialog( 'close' ), 300);
              } else {
                $(el).dialog( 'close' )
              }
            } else {
              isClose = false;
            }
          },
          close: () => {
            $('.main-content').css('filter', '');
            $('body').removeClass('modal-open');
          }
        })
      }
    )
  });
})();
