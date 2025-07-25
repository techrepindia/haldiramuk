$(document).ready(function(){


  // milestone presence
  $('.tablinks').click(function(){
    if($(this).hasClass('adtab')){
      $(this).parents('.milestone-wrapper').addClass('milestone-origins');
      $('#milestone-origin').show();
    } else{
      $('#milestone-origin').hide();
      $(this).parents('.milestone-wrapper').removeClass('milestone-origins');
    }
  });
  
  
  var minVale = 0, maxVale = 20; // Set Max and Min values
  // Increase product quantity on cart page
  $(".qty_plus-btn").on('click', function(){
      $(this).siblings('.minus-btn').attr('disabled', false)
      var arrival_input_value = $(this).siblings(".new_arrival_qty_input").val();
      if (arrival_input_value < maxVale) {
          arrival_input_value++;
        $(this).siblings(".new_arrival_qty_input").val(arrival_input_value);
        var arrivalId = $(this).parent().attr('data-valuee-id');
        new_data = {
            "id": arrivalId,
            "quantity": 1
        }
        $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: new_data,
          dataType: 'json',
          success: function(data) {
            $.getJSON('/cart.js',function(response){
            var count = response.item_count;
            $('.cart-count-bubble').show();
            $('.cart-count-bubble').text(count);
            $("#order-confirm").addClass('addactive');
            $('#order-confirm .order-con-msg').html('Added!!');
            setTimeout(function() { $("#order-confirm").removeClass('addactive'); }, 3000);
            // $('#cart-icon-bubble .cart-count-bubble span:last-child').text(count + ' items');  
          });
          },
          error: function() {
            // Do something if there is an error adding the item to cart
            alert('You have added all the available quantity of this product to the cart.');
          }
        });
      }

        
  });
  // Decrease product quantity on cart page
  $(".minus-btnn").on('click', function(){
      var arrival_value = $(this).siblings(".new_arrival_qty_input").val();
      if (arrival_value >= 1) {
        $(this).attr('disabled', false);
        arrival_value--;
      } else if (arrival_value == 0){
        $(this).attr('disabled', true);
      }
      var arvid = $(this).parent().attr('data-valuee-id');
      $(this).siblings(".new_arrival_qty_input").val(arrival_value);
    var new_qtyy = arrival_value;
      arrv_data_remove = {
        "id": arvid,
        "quantity": new_qtyy
      };
      $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data: arrv_data_remove,
        dataType: 'json',
        success: function(data) {
          $.getJSON('/cart.js',function(response){
            var count = response.item_count;
            $('.cart-count-bubble').show();
            $('.cart-count-bubble').text(count);
            $("#order-confirm").addClass('addactive');
            $('#order-confirm .order-con-msg').html('Removed!!');
            setTimeout(function() { $("#order-confirm").removeClass('addactive'); }, 3000);
            // $('#cart-icon-bubble .cart-count-bubble span:last-child').text(count + ' items');  
          });
        },
        error: function() {
          // Do something if there is an error removing the item from cart
          alert('Error removing item from cart');
        }
      });
  });


  

    // address delete************************
    $('.del-address').click(function(){
    $(this).find('.loader-btn').show();
    var del_mess = $(this).parents('.adddress-item').find('.confirm-del');
    var form_id = $(this).data('formid');
    var deData = {
     '_method': 'delete'
    };
    var del = $.ajax({
      type: "POST",
      url: '/account/addresses/' + form_id ,
      data: deData,
      dataType: 'html',
      success : function(){
        del_mess.show();
        $('.loader-btn').hide();
        setTimeout(function() { 
          location.reload();
        }, 1000);
      }
    });
      
  });

      // Account edit button
  
$('#edit-address-form').submit(function(eer){
  eer.preventDefault();
  var first_name = $('.fname').val();
  var last_name = $('.lname').val();
  var phone = $('.phone-number').val();
  var company = $('.company').val();
  var zip = $('.Addresszip').val();
  var city = $('.Addresscity').val();
  var province = $('#proedit').val();
  var address = $('.AddressAddress1').val();
  var addreess = $('.AddressAddress2').val();
  var invalid_edit = false;
  var formData = $(this).serialize();
  var url = $(this).attr('action');

  if(first_name.length == 0){
      $(".er-fname-ed").show();
      invalid_edit = true;
    }
  if (phone.length == 0 ) {
      $(".er-phn-ed").show();
      invalid_edit = true;
    } 
  if (zip.length == 0 ) {
      $(".er-zip-ed").show();
      invalid_edit = true;
    } 
  if (city.length == 0 ) {
      $(".er-city-ed").show();
      invalid_edit = true;
    } 
  if (address.length == 0 ) {
      $(".er-add-ed").show();
      invalid_edit = true;
    } 

  if(invalid_edit != true) { 

  var form = this;
  $('.loader-btn',form).show()
  $.ajax({
    url:url,
    type:'POST',
    data:formData,
    success:function(response){
      $('.loader-btn',form).hide();
      $('.edit_address_save .success').show();
      setTimeout(function() { 
          location.reload();
        }, 2000);
    },
    error:function(){
      $('.edit_address_save .error').show();
    }
    
  });
  }
});

   // New Address

  $('#address_form_new').submit(function(ev){
  ev.preventDefault();
    var first_name = $('#AddressFirstNameNew').val();
    var last_name = $('#AddressLastNameNew').val();
    var phone = $('#AddressPhoneNew').val();
    var zip = $('#AddressZipNew').val();
    var city = $('#AddressCityNew').val();
    var province = $('#AddressprovinceNew').val();
    var address = $('#AddressAddress1New').val();
    var address2 = $('#AddressAddress2New').val();
    var invalid_add = false;

    if(first_name.length == 0){
      $(this).find('.er-fname').show();
      invalid_add = true;
    } 
    if(phone.length == 0){
      $(this).find('.er-phn').show();
      invalid_add = true;
    } 
    if(city.length == 0){
      $(this).find('.er-city').show();
      invalid_add = true;
    } 
    if(zip.length == 0){
      $(this).find('.er-zip').show();
      invalid_add = true;
    } 
    if(address.length == 0){
      $(this).find('.er-add').show();
      invalid_add = true;
    } 
    $('#AddressFirstNameNew').keyup(function(){
      $('#address_form_new').find('.er-fname').hide();
    });
    $('#AddressPhoneNew').keyup(function(){
      $('#address_form_new').find('.er-phn').hide();
    });
    $('#AddressCityNew').keyup(function(){
      $('#address_form_new').find('.er-city').hide();
    });
    $('#AddressZipNew').keyup(function(){
      $('#address_form_new').find('.er-zip').hide();
    });
    $('#AddressAddress1New').keyup(function(){
      $('#address_form_new').find('.er-add').hide();
    });
    
    
    if(invalid_add != true){
    var form = this;
    $('.loader-btn',form).show()
    $('#new-address-form .adderror').html('');
    $('#new-address-form .adsuccess').html('');
    $.ajax({
      url:$(form).attr('action'),
      type:'POST',
      data:$(this).serialize(),
      success:function(response){
        $('.loader-btn',form).hide();
        $('#new-address-form .adsuccess').html('Address has been added !!');
        setTimeout(function() { 
            location.reload();
          }, 2000);
      },
      error:function(){
        $('.loader-btn',form).hide();
        $('#new-address-form .adderror').html('Server Error, Please try again');
      }
  });
    }
    
});


 

  
  $('.edit-form-cancel').click(function(){
    $(this).parents('.edit-address').hide();
    $(this).parents('.edit-address').siblings('.adddress-item').show();
    $('body').find('.account-boxed>h2').text('Account Details');
    $('.cancel-button').show();
  });
  
  $('.edit-address-btn').click(function(){
    $(this).parents('.adddress-item').hide();
    $(this).parents('.adddress-item').siblings('.edit-address').show();
    $('body').find('.account-boxed>h2').text('Edit address');
    $('.cancel-button').hide();
  });
  $('.add-new-address').click(function(){
    $('.address-table').hide();
    $('#new-address-form').show();
    $('body').find('.account-boxed>h2').text('Add New Address');
  });
  $('.cancel-form-new').click(function(){
    $('#new-address-form').hide();
    $('.address-table').show();
    $('body').find('.account-boxed>h2').text('Account Details');
  });
  
  $('.view-address').click(function(){
    $(this).parents('.address-table').hide();
    $('#addresss-all').show();
    $('.cancel-button').show();
  });
  $('.cancel-button').click(function(){
    $('#addresss-all').hide();
    $(this).hide();
    $('.address-table').show();
  });
  
  $('.account-btn-primary').click(function(){
    $(this).addClass('account-active');
    $(this).siblings().removeClass('account-active');
  })
  $('#address').click(function(){
    $('body').find('.account-boxed>h2').text('Account Details');
    $('.account-wrapper').find('#dashboard').hide();
    $('.account-wrapper').find('#address').show();
    $('.account-wrapper').find('#orders').hide();
    $('.address-table').show();
    $('#new-address-form').hide();
    $('#addresss-all').hide();
    $('.cancel-button').hide();
  });
  $('#orders').click(function(){
    $('body').find('.account-boxed>h2').text('Orders');
    $('.account-wrapper').find('#dashboard').hide();
    $('.account-wrapper').find('#address').hide();
    $('.account-wrapper').find('#orders').show();
  });
  $('#dashboard').click(function(){
    $('body').find('.account-boxed>h2').text('Dashboard');
    $('.account-wrapper').find('#dashboard').show();
    $('.account-wrapper').find('#address').hide();
    $('.account-wrapper').find('#orders').hide();
  });

  $("#scroller").click(function() {
    $('html, body').animate({
        scrollTop: $("#main-collection-filters").offset().top
    }, 1000);
});
  
  $('.close--menu-drawer').click(function(){
    $('body').removeClass('overflow-hidden-tablet');
  })
  // Ensure all menu items are closed by default on page load
$(document).ready(function () {
    $('.menu-item-child-mobile').hide(); // Hide all child menus
    $('.menuitem-in-mobile').removeClass('active-mob'); // Remove any active class
});

// Handle click event for mobile menu items
$('.menuitem-in-mobile').click(function (e) {
    e.preventDefault(); // Prevent default behavior

    let isActive = $(this).hasClass('active-mob'); // Check if the clicked item is already active

    // Close all other menus and remove active class
    $('.menuitem-in-mobile').removeClass('active-mob');
    $('.menu-item-child-mobile').slideUp();

    // If the clicked menu was not active, open it
    if (!isActive) {
        $(this).addClass('active-mob');
        $(this).siblings('.menu-item-child-mobile').slideDown();
    }
});
  

  $('.menu-hr-block h3').click(function(){
    $(this).toggleClass('menu-active-m');
    $(this).siblings('.collaps-mobile').slideToggle();
    $(this).parent().siblings().children('.collaps-mobile').slideUp();
    $(this).parent().siblings().children('h3').removeClass('menu-active-m');
  });

  // Faq
  $('.hr-question').click(function(){
    $(this).toggleClass('active-ques');
    $(this).parent().siblings().children('.hr-question').removeClass('active-ques');
    $(this).siblings('.hr-answer').slideToggle('linear');
    $(this).parent().siblings().children('.hr-answer').hide();
  });

  
  $('.add-cart-btn').click(function(e){
    e.preventDefault();
    $(this).parents('.btn-group-cart').find('.qty_plus-btn').trigger('click');
    $(this).hide();
    $(this).siblings('.add-btn-hr').show();
    $(this).siblings('.quantity-selctors-hr').show();
  });
  // $('.minus-btn').click(function(){
  //   var qq = $(this).val();
  //   if(qq == 0){
  //     $(this).parent().parent().parent().hide();
  //   }
  // });

  $('.primary-add-to-cart').click(function(){
    $(this).parents('.product-pick-form').find('.add-plus').trigger('click');
    $(this).hide();
    $(this).siblings('quantity_container').show();
  });

  var minVal = 0; // Set Max and Min values
  // Increase product quantity on cart page
  $(".add-plus").on('click', function(){
    var maxVal = Number($(this).siblings('.quantity_add_input').attr('data-max'));
    var thisis = $(this);
      $(this).siblings('.minus').attr('disabled', false)
      var value = $(this).siblings(".quantity_add_input").val();
      if (value < maxVal) {
          value++;
        $(this).siblings(".quantity_add_input").val(value);
        $(this).next(".quantity_add_input").attr('value',value);
        console.log(value, 'check');
        var fieldid = $(this).parent().attr('data-value-id');
        field_data = {
            "id": fieldid,
            "quantity": 1
        }
        $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: field_data,
          dataType: 'json',
          success: function(data) {
            $.getJSON('/cart.js',function(response){
            var count = response.item_count;
            $('.cart-count-bubble').show();
            $('.cart-count-bubble').text(count);
            $("#order-confirm").addClass('addactive');
            $('#order-confirm .order-con-msg').html('Added!!');
            setTimeout(function() { $("#order-confirm").removeClass('addactive'); }, 3000);
            if (value == maxVal){$('#maxQuantity').addClass('actmes');}
            if (thisis.attr("tinvalue") == 'true'){
              $('.tin-confirm').show();
            }
              setTimeout(function(){
              $('#maxQuantity').removeClass('actmes');
              $('.tin-confirm').hide();
            }, 5000);
            // $('#cart-icon-bubble .cart-count-bubble span:last-child').text(count + ' items');  
          });
          },
          error: function() {
            // Do something if there is an error adding the item to cart
            alert('You have added all the available quantity of this product to the cart.');
          }
        });
      } 
      else {
        $('#maxQuantity').addClass('actmes');
        if ($(this).attr("tinvalue") == 'true'){
          $('.tin-confirm').show();
        }
        setTimeout(function(){
          $('#maxQuantity').removeClass('actmes');
          $('.tin-confirm').hide();
        }, 5000);
      }

        
  });



$('.closemaxQty').click(function(){
  $(this).parent().removeClass('actmes');
  $('.tin-confirm').hide();
});



  // Decrease product quantity on cart page
  $(".minus").on('click', function(){
      var value = $(this).siblings(".quantity_add_input").val();
      if (value >= 1) {
        $(this).attr('disabled', false);
        value--;
      } else if (value == 0){
        $(this).attr('disabled', true);
      }
      var fieldid = $(this).parent().attr('data-value-id');
      $(this).siblings(".quantity_add_input").val(value);
    var new_qty = value;
      field_data_remove = {
        "id": fieldid,
        "quantity": new_qty
      };
      $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data: field_data_remove,
        dataType: 'json',
        success: function(data) {
          $.getJSON('/cart.js',function(response){
            var count = response.item_count;
            $('.cart-count-bubble').show();
            $('.cart-count-bubble').text(count);
            $("#order-confirm").addClass('addactive');
            $('#order-confirm .order-con-msg').html('Removed!!');
            setTimeout(function() { $("#order-confirm").removeClass('addactive'); }, 3000);
            // $('#cart-icon-bubble .cart-count-bubble span:last-child').text(count + ' items');  
          });
        },
        error: function() {
          // Do something if there is an error removing the item from cart
          alert('Error removing item from cart');
        }
      });
  });

  
  // $('.add-cart-btn-pr').click(function(e){
  //   e.preventDefault();
  //   var loader = $(this).children('.loader');
  //   var text = $(this).children('.text-add');
  //   var textcheck = $(this).children('.check');
  //   var fieldid = $(this).attr('data-value-id');
  //   var originalText = ('+');
  //   field_data = {
  //     "id" :  fieldid 
  //   };
  //   console.log(field_data);
  //     var add_to_carts = $.ajax({
  //       type: "POST",
  //       url: '/cart/add',
  //       data: field_data,
  //       beforeSend:     
  //       function() {    
  //         loader.show();
  //         text.hide();
  //       },
  //       success : function(data){
  //         $.getJSON('/cart.js',function(response){
  //           loader.hide();textcheck.show();
  //           setTimeout(function() {
  //             text.show();
  //             textcheck.hide();
  //           }, 2000);
  //           $(this).find('span').show();
  //           $(this).find('span').text('Added');
  //           var count = response.item_count;
  //           $('.cart-count-bubble').show();
  //           $('.cart-count-bubble').text(count);
  //           $("#order-confirm").addClass('addactive');
  //           setTimeout(function() { $("#order-confirm").removeClass('addactive'); }, 3000);
  //           // $('#cart-icon-bubble .cart-count-bubble span:last-child').text(count + ' items');  
  //         });
  //       },
  //       error: function() { // if error occured
  //       alert("You have added the all the available quantity of this product.");
  //       }
  //     });
  // });

  $('.hr-slider-items').slick({
  infinite: false,
  slidesToShow: 5.2,
  slidesToScroll: 3,
  arrows: true,
    responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4.2,
        slidesToScroll: 2,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3.2,
        slidesToScroll: 2,
        infinite: false,
        dots: false
      }
    },
      {
      breakpoint: 900,
      settings: {
        slidesToShow: 3.2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 641,
      settings: {
        slidesToShow: 2.2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

  $('.recommendation-product').slick({
  infinite: false,
  slidesToShow: 5.2,
  slidesToScroll: 3,
  arrows: true,
    dots: false,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4.2,
        slidesToScroll: 2,
        infinite: true
      }
    },
      {
      breakpoint: 768,
      settings: {
        slidesToShow: 3.2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2.2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

  $('.swiper-wrapper-discover').slick({
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: false,
        dots: false
      }
    },
      {
      breakpoint: 768,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

  
  $('.collection-hr-item').slick({
    dots: false,
    infinite: true,
    speed: 300,
    infinite: false,
    slidesToShow: 1.6,
    lazyLoad: 'ondemand',
    adaptiveHeight: false,
    responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
    // add to cart form
  // $('.new-arrival-form-submit').submit(function(e){
  //   e.preventDefault();
  //   var vdata = $(this).serialize();
  //   console.log(vdata);
  // });
$('.add-btn-hr').click(function(e){
      e.preventDefault();
      var fields = $(this).attr('valuee');
      var qqty = $(this).parent().parent().find('.quantity__input').val();
      data = {
        "id": fields,
        "quantity" : qqty
      };
  console.log(data);
      var add_to_cart = $.ajax({
        type: "POST",
        url: '/cart/add',
        data: data,
        dataType: 'json',
        success : function(data){
          $.getJSON('/cart.js',function(response){
            var count = response.item_count;
            $('.cart-count-bubble').show();
            $('.cart-count-bubble').text(count);
            $("#order-confirm").addClass('addactive');
            setTimeout(function() { $("#order-confirm").removeClass('addactive'); }, 3000);
            // $('#cart-icon-bubble .cart-count-bubble span:last-child').text(count + ' items');  
          });
        },
        error: function() { // if error occured
        alert("You have added the all the available quantity of this product.");
        }
      });
    });

  $('.buy-slider').slick({
  dots: false,
  arrows: true,
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

// buy-with

  // buy-with

let isProcessingAddToCart = false;

$('.btn-buy').click(function(e) {
  e.preventDefault();

  if (isProcessingAddToCart) return; // prevent spamming
  isProcessingAddToCart = true;

  const $this = $(this);
  const productId = $this.attr('cardvalue'); // Shopify variant ID
  const hasLimit = $this.attr('data-limit') === 'true'; // only check limit if this is true

  $this.prop('disabled', true); // disable button
  $this.children('.lds-dual-ring').show();

  $.getJSON('/cart.js', function(cart) {
    let currentQtyInCart = 0;

    // Check how many of this product already in cart
    cart.items.forEach(function(item) {
      if (item.id == productId) {
        currentQtyInCart = item.quantity;
      }
    });

    if (hasLimit && currentQtyInCart == 4) {
      $('#maxQuantity').addClass('actmes');

      if ($this.attr("tinvalue") === 'true') {
        $('.tin-confirm').show();
      }

      setTimeout(function() {
        $('#maxQuantity').removeClass('actmes');
        $('.tin-confirm').hide();
      }, 5000);

      isProcessingAddToCart = false;
      $this.prop('disabled', false);
      $this.children('.lds-dual-ring').hide();
      return;
    }

    // Proceed with add to cart
    const data = { id: productId };

    $this.addClass('hide');

    $.ajax({
      type: "POST",
      url: '/cart/add',
      data: data,
      dataType: 'json',
      success: function() {
        $.getJSON('/cart.js', function(updatedCart) {
          const count = updatedCart.item_count;
          $('.cart-count-bubble').show().text(count);

          $("#order-confirm").addClass('addactive');
          setTimeout(function() {
            $("#order-confirm").removeClass('addactive');
          }, 3000);
        });
      },
      error: function() {
        alert("You have added all the available quantity of this product.");
      },
      complete: function() {
        isProcessingAddToCart = false;
        $this.removeClass('hide');
        $this.children('.lds-dual-ring').hide();
        $this.prop('disabled', false);
      }
    });
  }).fail(function() {
    isProcessingAddToCart = false;
    $this.prop('disabled', false);
    alert("Could not Process the request. Please try again.");
  });
});
  
  // $('.btn-buy').click(function(e){
  //   e.preventDefault();
  //   var max_data = $(this).attr('data-max');
  //   var $this = $(this);
  //   var actualQty = Number($(this).attr('data-cart-total'));
  //   if (actualQty >= max_data){
  //     $('#maxQuantity').addClass('actmes');
  //     if ($this.attr("tinvalue") == 'true'){
  //       $('.tin-confirm').show();
  //     }
  //       setTimeout(function(){
  //       $('#maxQuantity').removeClass('actmes');
  //       $('.tin-confirm').hide();
  //     }, 5000);
  //   } else {
  //         var buy_data = $(this).attr('cardvalue');
  //   data = {
  //     "id" : buy_data
  //   }
  //   console.log(data);
  //   var buy_with_it = $.ajax({
  //       type: "POST",
  //       url: '/cart/add',
  //       data: data,
  //       dataType: 'json',
  //     async:false,
  //       beforeSend:function(){
  //         $(this).addClass('hide');
  //         $(this).children('.lds-dual-ring').show();
  //       },
  //       success : function(){
  //         $.getJSON('/cart.js',function(response){
  //           var newUpdateQty = actualQty + 1;
  //           $this.attr('data-cart-total',newUpdateQty);
  //           var count = response.item_count;
  //           $('.cart-count-bubble').show();
  //           $('.cart-count-bubble').text(count);
  //           $("#order-confirm").addClass('addactive');
  //           setTimeout(function() { $("#order-confirm").removeClass('addactive'); }, 3000);
  //           // $('#cart-icon-bubble .cart-count-bubble span:last-child').text(count + ' items');  
  //         });
  //       },
  //       error: function() { // if error occured
  //       alert("You have added the all the available quantity of this product.");
  //       }
  //     });
  //   }
  // });

  //pdp--page--start---here
 $('.product-pdp-slide').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots:false, 
  fade: true,
  responsive: [
  {
      breakpoint: 750,
      settings: {
        dots: true,
        arrows: true,
      }
    }
  ]
});
$('.product-pdp-slide-nav').slick({
  arrows:true,
  slidesToShow: 3,
  dots:false,
  slidesToScroll: 1,
  infinite: true,
  asNavFor: '.product-pdp-slide',
  focusOnSelect: true,
  verticalSwiping:true,
  vertical: true
});
$('.product-pdp-slide-nav .slick-slide').on('click', function (event) {
   $('.product-pdp-slide').slick('slickGoTo', $(this).data('slickIndex'));
});

  $('.recover-btn').click(function(){
    $('.recover-acc').show();
    $('.login-acc').hide();
  });
  if (window.location.href.indexOf("#recover") > -1) {
      $('.recover-acc').show();
      $('.login-acc').hide();
  } else {
    $('.recover-acc').hide();
  }
  if (window.location.href.indexOf("#login") > -1) {
      $('.recover-acc').hide();
    $('.login-acc').show();
  }
  $('.log-cancel').click(function(){
    $('.recover-acc').hide();
    $('.login-acc').show();
  });

  $('.reset-form-validation').click(function(e){
      var email_value = $('.reset-email').val();
      if(email_value.length == 0 || email_value == null ){
        $('.reset-emp-error').show();
        e.preventDefault();
      }
    });

$('.signin-form-validation').click(function(e){
      var email_value = $('.email-info').val();
     var pass_value = $('.passlogin').val();
      if(email_value.length == 0 || email_value == null ){
        $('.login-emp-error').show();
        e.preventDefault();
      }
      if(pass_value.length == 0 ){
        $('.login-pass-emp').show();
        e.preventDefault();
      }
    });

  $('.email-info').click(function(){
      $('.login-emp-error').hide();
    });
$('.passlogin').click(function(){
      $('.login-pass-emp').hide();
    });
  $('.reset-email').click(function(){
      $('.reset-emp-error').hide();
    });

  $('.form-register').click(function(e){
    var email_reg_value = $('.email-register').val();
    var fname_reg_value = $('.fname').val();
    var lname_reg_value = $('.lname').val();
    var password = $('.passreg').val();
    var invalid = false;
    $('.err-field').hide();
    if(email_reg_value.length == 0 || email_reg_value == null ){
        $('.email-emp-error').show();
      invalid = true;
        //e.preventDefault();
    } 
    if(fname_reg_value.length == 0) {
      $('.fname-emp-error').show();
      invalid = true;
      //e.preventDefault();
    } 
    if(password.length == 0) {
      $('.pass-emp-error').show();
      invalid = true;
      //e.preventDefault();
    } 
    if( password.length > 0  && password.length < 4) {
      $('.pass-emp-error').hide();
      $('.pass-emp-val').show();
      invalid = true;
      //e.preventDefault();
    }
    if(invalid === true){
      e.preventDefault();
    }
  });
  $('.fname').click(function(){
      $('.fname-emp-error').hide();
    });
$('.email-register').click(function(){
      $('.email-emp-error').hide();
    });
  $('.passreg').click(function(){
      $('.pass-emp-error').hide();
    });

  $('.contact-submit').click(function(e){
    var c_name = $('#ContactForm-name').val();
    var c_email = $('#ContactForm-email').val();
    var c_phn = $('#ContactForm-phone').val();
    var c_mess = $('#ContactForm-body').val();
    var c_type = $('#country').val();
    if(c_name.length == 0 || c_name == null ){
        $('.c_name-error').show();
        e.preventDefault();
      }
    if(c_email.length == 0 || c_email == null ){
        $('.conatct-emp-error').show();
        e.preventDefault();
      }
    if(c_phn.length == 0 || c_phn == null ){
        $('.phone-emp-error').show();
        e.preventDefault();
      }
    if(c_mess.length == 0 || c_mess == null ){
        $('.content-emp-error').show();
        e.preventDefault();
      }
    if(c_type == "" || c_type == null ){
        $('.sel-emp-error').show();
        e.preventDefault();
      }
    
  });
  $('#ContactForm-name').click(function(){
      $('.c_name-error').hide();
    });
  $('#ContactForm-email').click(function(){
      $('.conatct-emp-error').hide();
    });
  $('#ContactForm-phone').click(function(){
      $('.phone-emp-error').hide();
    });
  $('#country').click(function(){
      $('.sel-emp-error').hide();
    });
  $('#ContactForm-body').click(function(){
      $('.content-emp-error').hide();
    });


$('.instantBuy').click(function (e){
   e.preventDefault();
   var formParams = $(this).attr('data-id');
  var dataQty = $('quantity-input').find('.quantity__input').val();
    data = {
      "id" : formParams,
      "quantity" : dataQty
    }
   $.ajax({
    url: "/cart/add",
    type: "POST",
    data: data,
     dataType: "json",
    success: function(){ 
     window.location.href = "/checkout";
    },
    error: function(){
    }
   });
 });

$(document).on("click", ".cart-inc", function(e){
    var cartItemVal = $(this).siblings('.quantity__input').val();
    var cartItemMax = parseInt($(this).siblings('.quantity__input').attr('data-max'));
    var cartTinVal = $(this).attr('tinvalue');
    if(cartItemVal == cartItemMax && cartTinVal == 'false'){
      $('#maxQuantity').addClass('actmes');
      setTimeout(function(){
        $('#maxQuantity').removeClass('actmes');
        $('.tin-confirm').hide();
      }, 5000);
    } else if (cartItemVal == cartItemMax && cartTinVal == 'true'){
      $(this).attr('disabled',true)
      $('#maxQuantity').addClass('actmes');
      $('.tin-confirm').show();
      setTimeout(function(){
        $('#maxQuantity').removeClass('actmes');
        $('.tin-confirm').hide();
      }, 5000);
    } else {
      $('#maxQuantity').removeClass('actmes');
      $('.tin-confirm').hide();
    }
});



});
  function onlyNumberKey(s){
    var e=s.which?s.which:s.keyCode;
    return!(e>31&&(e<48||e>57))
  }

