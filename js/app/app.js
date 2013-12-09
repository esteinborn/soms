  var $body             = $('body'),
      $circForm         = $('#circumstancesForm');
      $tipCheckBox      = $circForm.find('input'),
      $tips             = $('.tipsContainer'),
      $tipHighUrgency   = $tips.find('.highUrgency'),
      $tipMediumUrgency = $tips.find('.mediumUrgency'),
      $tipLowUrgency    = $tips.find('.lowUrgency'),
      $panelTrigger     = $('.panelTrigger'),
      $panelContent     = $('.panelContent'),
      $panelSubmitted   = $('.iamaPanelSubmitted'),
      $iamaField        = $('.iama'),
      $respondingField  = $('.responding'),
      $iamaValue        = $('.iamaValue'),
      $respondingValue  = $('.respondingValue'),
      $circError  = $('.circError');


  var togglePlusMinus = function(selector, isReset){
    // If the panel is open, we're closing it so turn the minus into a plus
    // If we're not resetting the panel to default
    var $selector = $(selector) || null,
        isReset = isReset || false,
        isPanelOpen = $selector.hasClass('openPanel');

    console.log(selector);
    console.log(isPanelOpen);


    if (isPanelOpen && !isReset){
      // console.log("open, closing");
      $selector
        .find('.fi-minus').addClass('hide').end()
        .find('.fi-plus').removeClass('hide').end()
        .removeClass('openPanel');
    } else if (!isPanelOpen || isReset) {
    // console.log("closed, opening");
    // If the panel is closed, we're opening it so turn the plus into a minus
    // OR if we're resetting the panel to default
      $selector
        .find('.fi-minus').removeClass('hide').end()
        .find('.fi-plus').addClass('hide').end()
        .addClass('openPanel');
    }
  };

  $body.on('submit', '#searchForm', function(e){
    e.preventDefault();

    var $fields = $(this).find("input, select"),
        hasChecked = false,
        isValid = false,
        numValid = 0,
        noValid = true;

    $('.columns > .error, .clear-field').addClass('hide');
    $('.columns.error').removeClass('error');
    $('.noValid, .multiValid').removeClass('hide');

    $fields.each(function(){
      var $this = $(this);

      if ($this.val()){
        isValid = true;
        numValid++;
        noValid = false;
      }

      if (numValid > 1) {
        isValid = false;
      }

      if (numValid === 0) {
        isValid = false;
        noValid = true;
      }

    });

    // If you checked a circumstance, show tips/contacts
    if (isValid && numValid < 2) {
      $('.search').slideUp();
      togglePlusMinus('.searchTrigger');
      $('.resultsPanel').slideDown();

      // window.scrollTo(0, 0);
    } else if (numValid > 1) {
      $fields.each(function(){
        var $this = $(this);
        if ($this.val()) {
          $(this).parent('.columns').addClass('error').find('.error').removeClass('hide').end().next('.columns').find('.clear-field').removeClass('hide');
        }
        $('.multiValid').removeClass('hide');
        $('.noValid').addClass('hide');
      });

    // If you didnt select a checkbox, throw an error
    } else {
      $fields.each(function(){
        var $this = $(this);
        $(this).parent('.columns').addClass('error').find('.error').removeClass('hide');
        $('.noValid').removeClass('hide');
        $('.multiValid').addClass('hide');
      });
    }
  });

  $body.on('click', '.clear-field', function(e){
    e.preventDefault();
    $(this).parent().parent().prev('.columns').removeClass('error').find('input, select').val('').end().find('.error').addClass('hide');
    $(this).addClass('hide');

  });

  $body.on('click', '.addl-photo-link', function(e){
    e.preventDefault();
    $('.addl-photo-popup').fadeIn(250, function(){
      $('.addl-photo-close').animate({top: "88%"}, 250);
    });
  });

  $body.on('click', '.addl-photo-close', function(e){
    e.preventDefault();
    $('.addl-photo-close').animate({top: "100%"}, 250, function(){
      $('.addl-photo-popup').fadeOut(250);
    });

  });

  $body.on('click', '.resultsPanel a', function(e){
    e.preventDefault();
    $('.resultsPanel, .searchTrigger').slideUp();
    $('.detailsPanel').slideDown();
  });


  // Clicks to both restart button and panel headings
  $body.on('click', '.panelTrigger', function(e){
    e.preventDefault();

    var $this = $(this),
        panelClass = $this.data('panel'),
        $panel = $('.' + panelClass);

    // Slide Toggle the panel that this trigger targets
    $panel.slideToggle();

    // If you clicked to open or close teh circumstances panel
      // Toggle the pluis minus sign to indicate that its possible
    togglePlusMinus($this, false);

      // Slide Toggle the tips
      // $tips.slideToggle();

    // If you clicked the Restart Button
    if (panelClass == 'search') {
      $('.resultsPanel').slideUp();
    }


    if (panelClass == 'iamaPanel') {

      $circForm[0].reset();
      $circError.hide();

      // hide all the tips individually
      hideTips();

      // If tips is visible, slide toggle it
      $tips.slideUp();

      // Close the filled "I Am A" Panel
      $panelSubmitted.slideUp();

      // Close teh Circumstances Panel
      $('.circumstancesContainer').slideUp();

      // Reset the Plus Minus state of the Circ Panel
      togglePlusMinus(null, true);

    }
  });
