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

                                        //    freeItem(window.cart)

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
                                        hideInfo(ui.components.cart[0])
                                 
                                        freeItem(ui.components.cart[0])
                                        hideInfo(ui.components.cart[0])
                                    }, 1000);
                                  
                                },




                            },

        
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

    function hideInfo(cart) {
        index = getIndex(script_vars.second_product_title, cart.lineItemCache)
        

        document.getElementsByName('frame-cart')[0].contentWindow.document.getElementById(cart.lineItemCache[index].id).getElementsByClassName('shopify-buy__btn--seamless shopify-buy__quantity-decrement')[0].style.display = 'none';
        document.getElementsByName('frame-cart')[0].contentWindow.document.getElementById(cart.lineItemCache[index].id).getElementsByClassName('shopify-buy__btn--seamless shopify-buy__quantity-increment')[0].style.display = 'none';


    }

    function calc_quanties(lineItems) {
        let quanties = 0
        for (i = 0; i < lineItems.length; i++) {
            if (lineItems[i].title != script_vars.second_product_title) {

                quanties = quanties + lineItems[i].quantity
            }
            window.quanties = quanties
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
                            events: {


                                addVariantToCart: function (product) {
                                    //       window.cart.setQuantity(product, 12)
                                    hideInfo(ui.components.cart[0])



                                },

                            },
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
        count_quanties(index, mycart.lineItemCache)


        if (index == -1 && mycart.lineItemCache.length >= 1) {
            addFreeItemToCart()
            id = getID(script_vars.second_product_title,mycart.lineItemCache )
            console.log(id)
            { return; }
        }
        else if ((index == 0) && mycart.lineItemCache.length == 1) {

            mycart.empty()
            mycart.close()



        }
        else if ((index >= 0) && mycart.lineItemCache.length >= 2) {

            console.log(mycart.lineItemCache[index].id);
            mycart.updateCacheItem(mycart.lineItemCache[index].id, window.quanties * 12)

 
       
            { return; }

        }

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
    function getID(product_title, array) {
        
        return array[getIndex(product_title, array)].id
       
    }


    function displayOut(id) {
        setInterval(function () {
            if (document.getElementsByName('frame-cart')[0].contentWindow.document.getElementById(mycart.lineItemCache[index].id) != null) {
                  document.getElementsByName('frame-cart')[0].contentWindow.document.getElementById(mycart.lineItemCache[index].id).querySelectorAll("[data-element='lineItem.quantity']")[0].style.display = "none";
              }
          }, 100);
    }
 



    function addFreeItemToCart() {
        document.getElementsByName('frame-product-' + script_vars.second_product_id)[0].contentWindow.document.getElementsByClassName('shopify-buy__quantity')[0].value = 12;
        document.getElementsByName('frame-product-' + script_vars.second_product_id)[0].contentWindow.document.getElementsByClassName('shopify-buy__btn  shopify-buy__beside-quantity')[0].click();
     
    }

})