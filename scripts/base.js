$(document).ready(function () {
    showFirstCard();
    getSessionData();
});

function showFirstCard(){
    $(document).on('click', '.menu-handler', function(){
      $('.card.intro-card').addClass('hide');
      setTimeout(function(){
      $('.card.intro-card').removeClass('show');

      $('.card.desc-card').addClass('show');
        
      },300);
      // setTimeout(function(){
      // },800);
    });
}


/*START: Fetch Data*/
function getSessionData() {
  // showLoader();
  $.ajax({
      url: 'assets/data/data.json',
      type: 'get',
      dataType: 'json',
      contentType: 'application/json'
  }).pipe(
      function (returnData) {
          if (returnData && returnData.RISDBSessionData && returnData.RISDBSessionData.responseHeader && returnData.RISDBSessionData.responseHeader.successFlag && returnData.RISDBSessionData.responseHeader.successFlag.toLowerCase() === 'true') {
              console.log(returnData);
          } else { }
      },
      function (jqXHR, textStatus, errorThrown) {
          // hideLoader();
      }
  );
}
/*END: Fetch Data*/

