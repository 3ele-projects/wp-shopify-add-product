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
                    id: script_vars.second_product_id,
                    iframe: "false",
                    node: document.getElementById('product-component-' + script_vars.second_product_id),
                    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
                    options: {
                        "cart": {
                            "text": {
                                "total": "Zwischensumme",
                                "button": "Checkout"
                            },
                            "popup": false,
                            events: {
                                openCheckout: function (product) {
                                    alert(product)
                                },
                         
                            },
                        },
                        "product": {
                            "contents":{
                                "img":false,
                                "imgWithCarousel":false,
                                "title":false,
                                "variantTitle":false,
                                "price":false,
                                "description":false,
                                "buttonWithQuantity":true,
                                "quantity":false
                              },
                            iframe: false,
                            events: {


                                addVariantToCart: function (product) {
                                    console.log(window.cart)
                                    console.log(ui.components.cart[0])
                                  //  hideInfo()
                          
                                    //     hideInfo(ui.components.cart[0])



                                },

                            },
                        },
                        "option": {},
                        "modalProduct": {
                            "contents": {
                                "img": false,
                                "imgWithCarousel": true,
                                "buttonWithQuantity": true
                            },
                        },
                        "buttonDestination": "cart",
                        "contents": {
                            "img": false,
                            "button": false,
                            "buttonWithQuantity": true,
                            "title": false,
                            "price": false
                        },
                    },
                });
            });
        }
    })();
});

function count_quanties(index, lineItems) {
    let quanties = 0
    for (i = 0; i < lineItems.length; i++) {
        if (index != i) {

            quanties = quanties + lineItems[i].quantity

        }


    }
    return quanties
}



function freeItem(mycart, product_title, count, product_id) {


    let index = getIndex(product_title, mycart.lineItemCache)
    console.log(getMethods(mycart))

    if (index == -1 && mycart.lineItemCache.length >= 1) {

        addFreeItemToCart(product_id, count)
       
      
   

        { return; }
    }
    else if ((index == 0) && mycart.lineItemCache.length == 1) {

        mycart.empty()
        mycart.close()



    }
    else if ((index >= 0) && mycart.lineItemCache.length > 1) {
        let quanties = count_quanties(index, mycart.lineItemCache)


        mycart.updateCacheItem(mycart.lineItemCache[index].id, quanties * count)
  
        mycart.updateCache(mycart.lineItemCache)

       
        
        { return; }

    }

}

function displayOut(id) {
    setInterval(function () {
        if (document.getElementsByName('frame-cart')[0].contentWindow.document.getElementById(mycart.lineItemCache[index].id) != null) {
            document.getElementsByName('frame-cart')[0].contentWindow.document.getElementById(mycart.lineItemCache[index].id).querySelectorAll("[data-element='lineItem.quantity']")[0].style.display = "none";
        }
    }, 100);
}






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
    console.log(array[getIndex(product_title, array)])
    return array[getIndex(product_title, array)].id

}

function addFreeItemToCart(second_product_id, count) {


    document.getElementById('product-component-'+second_product_id). querySelectorAll('.shopify-buy__quantity')[0].value = count;
    document.getElementById('product-component-'+second_product_id).querySelectorAll('.shopify-buy__btn')[0].click()


}



