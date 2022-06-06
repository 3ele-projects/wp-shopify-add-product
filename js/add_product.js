console.log(script_vars.product_id);
console.log(script_vars.second_product_id);
console.log(script_vars.second_product_title);
console.log(script_vars.count);
window.addEventListener('load', function () {
    (function () {
        var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        if (window.ShopifyBuy) {
            if (window.ShopifyBuy.UI) {
                ShopifyBuyInit();
            } else {
                loadScript();
            }
        } else {
            loadScript();
        }

        function loadScript() {
            var script = document.createElement('script');
            script.async = true;
            script.src = scriptURL;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
            script.onload = ShopifyBuyInit;
        }

        function ShopifyBuyInit() {
            var client = ShopifyBuy.buildClient({
                domain: 'pahua-drink.myshopify.com',
                storefrontAccessToken: 'f08170a8fcb02e56abbc5c4304f565ed',
            });
            ShopifyBuy.UI.onReady(client).then(function (ui) {


                ui.createComponent('product', {
                    id: script_vars.product_id,
                    node: document.getElementById('product-component-' + script_vars.product_id),
                    moneyFormat: '%24%7B%7Bamount%7D%7D',
                    options: {
                        "product": {

                            events: {


                                addVariantToCart: function (product) {
                                    setInterval(function () {

                                        window.cart = ui.components.cart[0]
                                   
                                         freeItem(window.cart)
                                      //  updateFreeItemToCart(window.cart.lineItemCache)
                                    }, 200);


                                    setTimeout(function () {
                                        window.cart = ui.components.cart[0]
                                        freeItem(window.cart)
                                      //  updateFreeItemToCart(window.cart.lineItemCache)
                                    }, 1000);



                                },
                                updateQuantity: function (product) {
                                    window.cart = ui.components.cart[0]

                                    setTimeout(function () {
                                        //   console.log(product)
                                    //    updateFreeItemToCart(window.cart.lineItemCache)
                                    
                                        freeItem(window.cart)
                                     
                                    }, 1000);

                                },
                                openCheckout: function (product) {
                                },
                            },
                            "styles": {
                                "product": {
                                    "@media (min-width: 601px)": {
                                        "max-width": "calc(25% - 20px)",
                                        "margin-left": "20px",
                                        "margin-bottom": "50px"
                                    }
                                }
                            },
                            "contents": {
                                "img": false,
                                "title": false,
                                "price": false
                            },
                            "text": {
                                "button": "Zum Warenkorb"
                            },

                        },
                        "productSet": {
                            "styles": {
                                "products": {
                                    "@media (min-width: 601px)": {
                                        "margin-left": "-20px"
                                    }
                                }
                            }
                        },
                        "modalProduct": {
                            "contents": {
                                "img": false,
                                "imgWithCarousel": true,
                                "button": false,
                                "buttonWithQuantity": true
                            },
                            "styles": {
                                "product": {
                                    "@media (min-width: 601px)": {
                                        "max-width": "100%",
                                        "margin-left": "0px",
                                        "margin-bottom": "0px"
                                    }
                                }
                            },
                            "text": {
                                "button": "zum Warenkorb"
                            }
                        },
                        "cart": {
                            "text": {
                                "total": "Zwischensumme",
                                "button": "Checkout"
                            },
                            "popup": false,
                            events: {

                                updateItemQuantity: function (cart) {




                                    setTimeout(function () {
                                        console.log(cart)

                                        //  console.log(ui.components.cart[0])
                                     //   updateFreeItemToCart(cart.lineItemCache)
                                             freeItem(ui.components.cart[0])
                                    }, 1000);
                                },

                            },
                            /*
                                  DOMEvents: {
      
                                      'onchange .shopify-buy__cart-item__quantity-input': (e, target) => { 
      console.log('change')
      
                                      },
      
        
      
                                      'click .shopify-buy__quantity-decrement': (e, target) => {
                                      
                                          let product_name = target.closest('.shopify-buy__cart-item').getElementsByClassName('shopify-buy__cart-item__title')[0].innerHTML
                                          find_product(target, product_name)
                                          if (product_name == script_vars.second_product_title) {
                                              console.log(target.closest('.shopify-buy__cart-item').getElementsByClassName('shopify-buy__cart-item__title')[0].innerHTML)    
                                          }
                                          else {
                                              stock = target.closest('.shopify-buy__cart-item').getElementsByClassName('shopify-buy__quantity shopify-buy__cart-item__quantity-input')[0].value
                                              console.log(stock * script_vars.count)
                                              document.getElementsByName('frame-product-' + script_vars.second_product_id)[0].contentWindow.document.getElementsByClassName('shopify-buy__quantity')[0].value = stock * script_vars.count;
                                          }
                                     
                                      },
                                      'click .shopify-buy__quantity-increment': (e, target) => {
                                          console.log('increment')
                                          let product_name = target.closest('.shopify-buy__cart-item').getElementsByClassName('shopify-buy__cart-item__title')[0].innerHTML
      
                                          if (product_name == script_vars.second_product_title) {
                                              console.log(target.closest('.shopify-buy__cart-item').getElementsByClassName('shopify-buy__cart-item__title')[0].innerHTML)    
                                          }
                                          else {
      
                                          }
                                      },
                              
                                  },
                                */
                        },


                        "lineItem": {
                            "contents": {
                                quantity: true,
                                quantityIncrement: false,
                                quantityDecrement: false,
                                quantityInput: false,
                            },
                        },
                    },
                });




            });
        }
    })();



    function calc_quanties(lineItems) {
        window.cart_update = false
       

        var index = lineItems.findIndex(function (item) {
            return item.title == script_vars.second_product_title
        });
        console.log('index')
        console.log(index)
        console.log(window.cart_update)
        if (window.cart_update = true) {
            
        
        let quanties = 0
        for (i = 0; i < lineItems.length; i++) {
            if (lineItems[i].title != script_vars.second_product_title) {

                quanties = quanties + lineItems[i].quantity
             
            }
            window.quanties = quanties


            //   var indexOfRemainingArray = lineItems.findIndex(element => element.includes(script_vars.second_product_title))

         

     


        }

        var index = lineItems.findIndex(function (item) {
            return item.title == script_vars.second_product_title
        });
/*
        if (index != -1) {
       
          
            do {
             
                let pfand = lineItems[index].quantity
                let pfand_quantity = document.getElementsByName('frame-cart')[0].contentWindow.document.getElementById(lineItems[index].id).getElementsByClassName('shopify-buy__quantity shopify-buy__cart-item__quantity-input')[0]
                console.log(pfand_quantity.value)
                if (window.quanties * 12 > pfand_quantity.value) {
             
                    console.log(window.quanties * 12 < pfand_quantity.value);
                    let clicks = quanties * script_vars.count
                   // pfand_quantity.value = clicks;
                   // pfand_quantity.onchange;
                    window.cart_update = true

                } else if (window.quanties * 12 == pfand_quantity.value) {
                    console.log(window.quanties * 12, pfand_quantity)
                    window.cart_update = false
                    { break; }
                }
                else if (window.quanties * 12 < pfand_quantity.value) {
                    console.log(window.quanties * 12 < pfand_quantity.value);
                    window.cart_update = false
                    { break; }
                }
                else {
                    { break; }
                }
             
            } while (window.cart_update == true)
         
          
          
        

        




            //   let stock = lineItems[index].getElementsByClassName('shopify-buy__cart-item__title')[0].innerHTML

            //

            //  document.getElementsByName('frame-cart')[0].contentWindow.document.getElementById(lineItems[index].id).querySelectorAll("[data-element='lineItem.quantityDecrement']")[0].click();
            //   document.getElementsByName('frame-product-'+script_vars.second_product_id)[0].contentWindow.document.getElementsByClassName('shopify-buy__btn  shopify-buy__beside-quantity')[0].click();

        } else {

        }
         */
    }
   
    }


    (function () {
        var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        if (window.ShopifyBuy) {
            if (window.ShopifyBuy.UI) {
                ShopifyBuyInit();
            } else {
                loadScript();
            }
        } else {
            loadScript();
        }

        function loadScript() {
            var script = document.createElement('script');
            script.async = true;
            script.src = scriptURL;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
            script.onload = ShopifyBuyInit;
        }

        function ShopifyBuyInit() {
            var client = ShopifyBuy.buildClient({
                domain: 'pahua-drink.myshopify.com',
                storefrontAccessToken: 'f08170a8fcb02e56abbc5c4304f565ed',
            });
            ShopifyBuy.UI.onReady(client).then(function (ui) {

                ui.createComponent('product', {
                    id: script_vars.second_product_id,
                    node: document.getElementById('product-component-' + script_vars.product_id + '-' + script_vars.second_product_id),
                    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
                    options: {
                        "product": {
                            "templates": {
                                "button": '<button id="hidden_prd" class="{{data.classes.product.button}} {{data.buttonClass}}">' +
                                    '{{data.buttonText}}</button>'

                            },
                            "styles": {
                                "product": {
                                    "@media (min-width: 601px)": {
                                        "max-width": "calc(25% - 20px)",
                                        "margin-left": "20px",
                                        "margin-bottom": "50px"
                                    },
                                    "text-align": "left"
                                },
                                "button": {
                                    "font-family": "Playfair Display, serif",
                                    "font-size": "16px",
                                    "padding-top": "16px",
                                    "padding-bottom": "16px",
                                    ":hover": {
                                        "background-color": "#6a9056"
                                    },
                                    "background-color": "#76a060",
                                    ":focus": {
                                        "background-color": "#6a9056"
                                    },
                                    "border-radius": "0px"
                                },
                                "quantityInput": {
                                    "font-size": "16px",
                                    "padding-top": "16px",
                                    "padding-bottom": "16px"
                                }
                            },
                            "buttonDestination": "cart",
                            "contents": {
                                "img": false,
                                "button": false,
                                "buttonWithQuantity": true,
                                "title": false,
                                "price": false
                            },
                            "text": {
                                "button": "Buy now"
                            },
                            "googleFonts": [
                                "Playfair Display"
                            ]
                        },
                        "productSet": {
                            "styles": {
                                "products": {
                                    "@media (min-width: 601px)": {
                                        "margin-left": "-20px"
                                    }
                                }
                            }
                        },
                        "modalProduct": {
                            "contents": {
                                "img": false,
                                "imgWithCarousel": true,
                                "button": false,
                                "buttonWithQuantity": true
                            },
                            "styles": {
                                "product": {
                                    "@media (min-width: 601px)": {
                                        "max-width": "100%",
                                        "margin-left": "0px",
                                        "margin-bottom": "0px"
                                    }
                                },
                                "button": {
                                    "font-family": "Playfair Display, serif",
                                    "font-size": "16px",
                                    "padding-top": "16px",
                                    "padding-bottom": "16px",
                                    ":hover": {
                                        "background-color": "#6a9056"
                                    },
                                    "background-color": "#76a060",
                                    ":focus": {
                                        "background-color": "#6a9056"
                                    },
                                    "border-radius": "0px"
                                },
                                "quantityInput": {
                                    "font-size": "16px",
                                    "padding-top": "16px",
                                    "padding-bottom": "16px"
                                }
                            },
                            "googleFonts": [
                                "Playfair Display"
                            ]
                        },
                        "option": {},
                        "cart": {
                            "styles": {
                                "button": {
                                    "font-family": "Playfair Display, serif",
                                    "font-size": "16px",
                                    "padding-top": "16px",
                                    "padding-bottom": "16px",
                                    ":hover": {
                                        "background-color": "#6a9056"
                                    },
                                    "background-color": "#76a060",
                                    ":focus": {
                                        "background-color": "#6a9056"
                                    },
                                    "border-radius": "0px"
                                },
                                "title": {
                                    "color": "#4c4c4c"
                                },
                                "header": {
                                    "color": "#4c4c4c"
                                },
                                "lineItems": {
                                    "color": "#4c4c4c"
                                },
                                "subtotalText": {
                                    "color": "#4c4c4c"
                                },
                                "subtotal": {
                                    "color": "#4c4c4c"
                                },
                                "notice": {
                                    "color": "#4c4c4c"
                                },
                                "currency": {
                                    "color": "#4c4c4c"
                                },
                                "close": {
                                    "color": "#4c4c4c",
                                    ":hover": {
                                        "color": "#4c4c4c"
                                    }
                                },
                                "empty": {
                                    "color": "#4c4c4c"
                                },
                                "noteDescription": {
                                    "color": "#4c4c4c"
                                },
                                "discountText": {
                                    "color": "#4c4c4c"
                                },
                                "discountIcon": {
                                    "fill": "#4c4c4c"
                                },
                                "discountAmount": {
                                    "color": "#4c4c4c"
                                }
                            },
                            "text": {
                                "title": "Warenkorb",
                                "total": "Gesamtsumme",
                                "empty": "Der Warenkorb ist noch leer",
                                "notice": "Versandkosten und Gutscheine werden im nächsten Schritt verrechnet.",
                                "button": "Bezahlen"
                            },

                        },



                    },
                });
            });
        }

    })();

    function count_quanties(index, lineItems) {
        let quanties = 0
        for (i = 0; i < lineItems.length; i++) {
            if (index != i) {

                quanties = quanties + lineItems[i].quantity
             
            }
            window.quanties = quanties
            return quanties
    }
}
    function freeItem(mycart) {

    
        let index = getIndex(script_vars.second_product_title, mycart.lineItemCache)
        console.log('index' + index)
        console.log('products' + mycart.lineItemCache.length)
        console.log( count_quanties(index, mycart.lineItemCache)) 
        if (index == -1 && mycart.lineItemCache.length >= 1) {
            addFreeItemToCart();
          //  calc_quanties(mycart.lineItemCache)
            mycart.init()
            { return; }
        }
        else if ((index == 0) && mycart.lineItemCache.length == 1) {
           
            let pfand_quantity = document.getElementsByName('frame-cart')[0].contentWindow.document.getElementById(mycart.lineItemCache[index].id).getElementsByClassName('shopify-buy__quantity shopify-buy__cart-item__quantity-input')[0]
            console.log('only pfand')
            pfand_quantity.value = 0
            pfand_decre = document.getElementsByName('frame-cart')[0].contentWindow.document.getElementById(mycart.lineItemCache[index].id).getElementsByClassName('shopify-buy__btn--seamless shopify-buy__quantity-decrement')[0]
            /*shopify-buy__btn--seamless shopify-buy__quantity-decrement */
            //   console.log(pfand)
            //   let pfand = mycart.lineItemCache[index].quantity

           // pfand_decre.click()
            console.log(pfand_decre)
         
            return;
          
        }
        else if ((index > -0) && mycart.lineItemCache.length >= 1) { 
            let pfand_quantity = document.getElementsByName('frame-cart')[0].contentWindow.document.getElementById(mycart.lineItemCache[index].id).getElementsByClassName('shopify-buy__quantity shopify-buy__cart-item__quantity-input')[0]
      
            
            console.log(getMethods(mycart))
            console.log(mycart.lineItemCache[index])
      
            mycart.updateCacheItem(mycart.lineItemCache[index].id, window.quanties * 12)
        //    mycart.updateItem(   product,window.quanties * 12 )
          //  mycart._userEvent()
            console.log(mycart.lineItemCache[index].quantity)
           // pfand_decre = document.getElementsByName('frame-cart')[0].contentWindow.document.getElementById(mycart.lineItemCache[index].id).getElementsByClassName('shopify-buy__btn--seamless shopify-buy__quantity-decrement')[0]
          //  
            return;
          
        }
       

    //    window.freeItemInCart = false;
        //  console.log(mycart);
     /*
        for (i = 0; i < mycart.lineItemCache.length; i++) {

            if (mycart.lineItemCache[i].title == script_vars.second_product_title && mycart.lineItemCache.length == 1) {
               // removeFreeItem(mycart.lineItemCache[i].id);
                { break; }
            }
            else if (mycart.lineItemCache[i].title == script_vars.second_product_title) {
                window.freeItemInCart = true;
                //    alwaysqty(mycart.lineItemCache[i].id);
              //  addFreeItemToCart();
                { break; }
            }
            else if (i == mycart.lineItemCache.length - 1 && freeItemInCart == false) {

                //  console.log(mycart.lineItemCache)
                //  console.log('test');
               // addFreeItemToCart();
                
                window.freeItemInCart = true;
                console.log("PUT");

                { break; }
            }
        }
*/
    }

    const getMethods = (obj) => {
        let properties = new Set()
        let currentObj = obj
        do {
          Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
        } while ((currentObj = Object.getPrototypeOf(currentObj)))
        return [...properties.keys()].filter(item => typeof obj[item] === 'function')
      }

    function getIndex(product_title, array) {
        var index = array.findIndex(function (item) {
            return item.title == product_title
        });
        return index
}


    function change_quantity(id, quantity) {
     
 }

    function addFreeItemToCart() {
            document.getElementsByName('frame-product-' + script_vars.second_product_id)[0].contentWindow.document.getElementsByClassName('shopify-buy__btn  shopify-buy__beside-quantity')[0].click();
   
    }

})