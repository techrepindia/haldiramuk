// Add to cart and add to bundle works on input radios selected as limiter. each of the limitter has its conditions set but they are static fixed to 6 9 and 16

$(document).ready(function () {
  var bundleArray = [];
  var cartProperties = {};

  $(document).on("click", ".action-bundle", function () {
    var $this = $(this);
    var $thisparent = $(this).parent(".bundle-card-action");
    var $variant = $this.data("variant-id");
    var $priceholder = $thisparent.find(".bundle-quantity-helper");
    var $input = $thisparent.find(".bundlequantiy");
    var limitter = $('.bundle-filters input[name="bundle"]:checked').val();
    var $productName = $this.parents(".bundle-content-desc").find("h3").text();

    $priceholder.show();
    $this.hide();
    var currentQty = parseInt($input.val());
      
    $("#bundlecart").addClass("active-bundleCart");
    if (limitter == 6) {
      var product = $('.pack-detail-six h4').text();
      var $updatedQty = currentQty + 1;
      $input.val($updatedQty);
      $('.detail-pack-inner ul li').each(function(){
        var name = $(this).find('.prname').text();
        bundleArray.unshift({
          variantId: name,
          quantity: 1,
        });
      })
      
      $("#bundlecart").find(".bundleprods").append(`<p><span class="prname">${product}</span> x <span class="sizebun">1</span></p>`);
      
      if($('.bundleprods p').length == 1){
        $(".add-to-bundle").attr("disabled", false);
      }
      
      $thisparent.find(".plus-quantiy").attr("disabled", true);
      
    } else if (limitter == 9){
      var $updatedQty = currentQty + 3;
      $input.val($updatedQty);
      
      bundleArray.unshift({
        variantId: $variant,
        quantity: 3,
      });
      
      $("#bundlecart")
        .find(".bundleprods")
        .append(
          `<p><span class="prname">${$productName}</span> x <span class="sizebun">3</span></p>`
        );
      
      if($('.bundleprods p').length == 3){
        $('.action-bundle').attr('disabled',true);
        $(".add-to-bundle").attr("disabled", false);
      }
      
      $thisparent.find(".plus-quantiy").attr("disabled", true);
      
    } else if (limitter == 16){
      var $updatedQty = currentQty + 4;
      $input.val($updatedQty);
      
      bundleArray.unshift({
        variantId: $variant,
        quantity: 4,
      });
      
      $("#bundlecart")
        .find(".bundleprods")
        .append(
          `<p><span class="prname">${$productName}</span> x <span class="sizebun">4</span></p>`
      );
      
      if($('.bundleprods p').length == 4){
        $('.action-bundle').attr('disabled',true);
        $(".add-to-bundle").attr("disabled", false);
      }
      
      $thisparent.find(".plus-quantiy").attr("disabled", true);
    }

    var totalQuantity = 0;
    var bundleSize = $("#bundlecart")
      .find(".bundleprods p")
      .each(function () {
        var quantity = parseInt($(this).find("span.sizebun").text());
        if (!isNaN(quantity)) {
          totalQuantity += quantity;
        }
      });

  });

  $(document).on("click", ".minus-quantiy", function () {
    var $this = $(this);
    var $thisAdd = $this.parents(".bundle-card-action").find(".action-bundle");
    var $priceholder = $this.parents(".bundle-quantity-helper");
    var $input = $this.parent().find(".bundlequantiy");
    var currentQty = parseInt($input.val());
    var $variant = $thisAdd.data("variant-id");
    var $thisaddplus = $priceholder.find(".plus-quantiy");
    var limitter = $('.bundle-filters input[name="bundle"]:checked').val();
    var $productName = $this.parents(".bundle-content-desc").find("h3").text();
    var updatedQty;


      var matchedItem = null;
      $("#bundlecart")
        .find(".bundleprods p")
        .each(function () {
          if ($(this).text().includes($productName)) {
            matchedItem = $(this);
          }
        });
      if (limitter == 6){
        if (currentQty > 0) {
          updatedQty = currentQty - 1;
          $input.val(updatedQty);
          $thisaddplus.attr('disabled',true)
        }
        if (updatedQty == 0) {
          $priceholder.hide();
          $thisAdd.show();
          $thisaddplus.attr('disabled',false)
        }
        if (matchedItem) {
          var matchedQty = parseInt(matchedItem.find("span.sizebun").text());
          var newMatchedQty = matchedQty - 1;

          if (newMatchedQty > 0) {
            matchedItem.html(
              `<span class="prname">${$productName}</span> x <span class="sizebun">${newMatchedQty}</span>`
            );
          } else {
            matchedItem.remove();
          }
        }
        
        bundleArray = [];
        
      } else if (limitter == 9){
        
        if (currentQty > 0) {
          updatedQty = currentQty - 3;
          $input.val(updatedQty);
        }
        if (updatedQty == 0) {
          $priceholder.hide();
          $thisAdd.show();
        }
        if (matchedItem) {
          var matchedQty = parseInt(matchedItem.find("span.sizebun").text());
          var newMatchedQty = matchedQty - 3;
  
          if (newMatchedQty > 0) {
            matchedItem.html(
              `<span class="prname">${$productName}</span> x <span class="sizebun">${newMatchedQty}</span>`
            );
          } else {
            var matchremove = matchedItem.text().split(' x ');console.log(matchremove[0])
            matchedItem.remove();
            bundleArray = bundleArray.filter(function(bundleItem) {
              return bundleItem.variantId !== matchremove[0];
            });
          }
        }
        
      } else if (limitter == 16){
        if (currentQty > 0) {
          updatedQty = currentQty - 4;
          $input.val(updatedQty);
        }
        if (updatedQty == 0) {
          $priceholder.hide();
          $thisAdd.show();
        }
        if (matchedItem) {
          var matchedQty = parseInt(matchedItem.find("span.sizebun").text());
          var newMatchedQty = matchedQty - 4; // Decrease quantity
  
          if (newMatchedQty > 0) {
            matchedItem.html(
              `<span class="prname">${$productName}</span> x <span class="sizebun">${newMatchedQty}</span>`
            );
          } else {
            var matchremove = matchedItem.text().split(' x ');console.log(matchremove[0])
            matchedItem.remove();
            bundleArray = bundleArray.filter(function(bundleItem) {
              return bundleItem.variantId !== matchremove[0];
            });
          }
        }
      }

      if (bundleArray.length == 0){
          $('#bundlecart').removeClass('active-bundleCart');
        }
      var a = 0;

      $("#bundlecart")
        .find(".bundleprods p")
        .each(function () {
          var b = parseInt($(this).find("span.sizebun").text());
          if (!isNaN(b)) {
            a += b;
          }
        });

      // Subtract the current product's quantity from the total
      a -= currentQty;

      // Add the new updatedQty of the current item to the total again
      a += updatedQty;

      var existingItem = bundleArray.find(
        (item) => item.variantId === $variant
      );
      if (existingItem) {
        // If the variant exists, update the quantity
        existingItem.quantity = updatedQty;
      }
      console.log(a)

      // Enable/disable buttons based on updated bundle size
      if (limitter > a) {
        $(".action-bundle").attr("disabled", false);
        $(".add-to-bundle").attr("disabled", true);
      }
    
  });

  $(document).on("click", ".plus-quantiy", function () {
    var $this = $(this);
    var $input = $this.parent().find(".bundlequantiy");
    var currentQty = parseInt($input.val()) || 0; // Parse the value to an integer, default to 0 if NaN
    var $thisAdd = $this.parents(".bundle-card-action").find(".action-bundle");
    var $variant = $thisAdd.data("variant-id");
    var limitter = $('.bundle-filters input[name="bundle"]:checked').val();
    var $productName = $this
      .parents(".bundle-content-desc")
      .find("h3")
      .text()
      .trim(); // Trim whitespace

    var updatedQty = currentQty + 1; // Increment the quantity by 1
    $input.val(updatedQty); // Update the input field with the new value

      if (limitter == 9 && updatedQty == 3){
        $this.attr('disabled',true);
      } else if (limitter == 16 && updatedQty == 4){
        $this.attr('disabled',true);
      } else {
        $this.attr('disabled',false);
      }


      
      var totalQuantity = 0; // Variable to track total quantity in the cart

      // Calculate total quantity from the existing items in the bundle cart
      $("#bundlecart")
        .find(".bundleprods p")
        .each(function () {
          var b = parseInt($(this).find("span.sizebun").text()); // Extract the quantity
          if (!isNaN(b)) {
            totalQuantity += b; // Sum up the quantities
          }
        });

      // Check if we can add more items based on the limitter
      if (limitter > totalQuantity) {
        var matchedItem = null;

        // Find the matched product by exact name
        $("#bundlecart")
          .find(".bundleprods p .prname")
          .each(function () {
            var itemText = $(this).text().trim(); // Get text and trim whitespace for accurate comparison
            if (itemText === $productName) {
              // Exact match check
              matchedItem = $(this).closest("p"); // Store the parent paragraph element
            }
          });

        if (matchedItem) {
          // Update the quantity for the matched product
          var newText = `<span class="prname">${$productName}</span> x <span class="sizebun">${updatedQty}</span>`;
          matchedItem.html(newText); // Update the HTML with new quantity
        } else {
          // Optional: Handle case where the product is not found
          $("#bundlecart .bundleprods").append(
            `<p><span class="prname">${$productName}</span> x <span class="sizebun">${updatedQty}</span></p>`
          );
        }
      }

      var existingItem = bundleArray.find(
        (item) => item.variantId === $variant
      );
      if (existingItem) {
        // If the variant exists, update the quantity
        existingItem.quantity += 1;
      } else {
        // If the variant doesn't exist, add it at the beginning of the array
        bundleArray.unshift({
          variantId: $variant,
          quantity: 1,
        });
      }
      // Disable buttons if the limit is reached
      if (limitter === totalQuantity + 1) {
        $(".quantity--holder .plus-quantiy").attr("disabled", true);
        $(".action-bundle").attr("disabled", true);
        $(".add-to-bundle").attr("disabled", false);
      }
    
  });

  $(document).on("change", '.bundle-filters input[name="bundle"]', function () {
      var cart_id = $(this).data('product-id');
      $('.add-to-bundle').attr('data-cart-id',cart_id);
    if ($(this).is(":checked")) {
      var bundlePrice = $(this).data('pack-price');
      $('#bundlecart').find('.bundle--price').text(bundlePrice);
      var $value = $(this).attr('id');
      $('.grid-block-tab').each(function(){
        var tabVal = $(this).data('tab');
        if (tabVal == $value){
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      })
    }
    bundleArray = [];
    cartProperties = {}

    $(".bundlecart-strip").removeClass("active-bundleCart");
    $('.add-to-bundle').attr('disabled',true)
    $(".bundleprods").html("");
    $(".bundlequantiy").val("0");
    $(".bundle-quantity-helper").hide();
    $(".plus-quantiy").attr("disabled", false);
    $(".action-bundle").show().attr("disabled", false);
    var d = 0;
    var bundleSize = $("#bundlecart")
      .find(".bundleprods p")
      .each(function () {
        var c = parseInt($(this).find("span").text()); // Extract the quantity as an integer
        if (!isNaN(c)) {
          // Ensure the value is a valid number
          d += c; // Add it to the total
        }
      });
  });

$(document).on("click", ".add-to-bundle", function () {
var addCartId = $(this).attr('data-cart-id');console.log(addCartId)
// Iterate over bundleArray and add each item and quantity to the cartProperties
bundleArray.forEach(function (bundleItem, index) {
  // Use the index to make each property unique, or you can use any other key convention
  cartProperties[`item_${index + 1}`] = bundleItem.variantId + ' x ' + bundleItem.quantity;
});

// Construct the data object with one product ID and custom properties
var data = {
  items: [
    {
      id: addCartId, // The single product ID
      quantity: 1,   // Set the quantity for the main product
      properties: cartProperties // Include the entire bundleArray in properties
    }
  ]
}; console.log(data)

    $.ajax({
      type: "POST",
      url: "/cart/add.js",
      dataType: "json",
      data: data,
      success: function () {
        window.location.href = "/cart";
      },
      error: function (xhr, status, error) {
        $('.add-confirmation').addClass('addactive');
        $('.add-confirmation').find('.order-con-msg').text(xhr.responseJSON.description);
        setTimeout(function(){
          $('.add-confirmation').removeClass('addactive');
          $('.add-confirmation').find('.order-con-msg').text('Added!!');
        },3000);
      }
    });
  });
});
