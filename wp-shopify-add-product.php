<?php

/**
 * Plugin Name:     Wp Shopify Add Product
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     wp-shopify-add-product
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Wp_Shopify_Add_Product
 */

// Your code starts here.

if (!function_exists('wp_shopify_add_js')) {
    function wp_shopify_add_js()
    {


        global $post;

        $deps = array('jquery');
        $version = '1.0';
        $in_footer = true;
    }
}

add_action('wp_footer', 'wpshout_action_example'); 
function wpshout_action_example() { 
    echo "<div style='display:none' id='product-component-7965061087499'></div>"; 
}


function add_product_shortcode($atts = [], $content = null, $tag = '')
{
    // normalize attribute keys, lowercase

    $atts = array_change_key_case((array) $atts, CASE_LOWER);
    $domain = "";
    $storefrontAccessToken = "";



    // override default attributes with user attributes
    $wporg_atts = shortcode_atts(
        array(
            'product_id' => 'WordPress.org',
            'second_product_id' => 'WordPress.org',
            'count' => 12,
            'second_product_title' => 'Mehrwertpfand',
        ),
        $atts,
        $tag
    );
    wp_enqueue_script('wp_shopify_add_js', plugins_url('/js/add_product.js', __FILE__), array('jquery'), '', true);
    wp_localize_script(
        'wp_shopify_add_js',
        'script_vars',
        array(
            'domain' => $domain,
            'storefrontAccessToken' => $storefrontAccessToken,
            'product_id' => $wporg_atts['product_id'],
            'second_product_id' => $wporg_atts['second_product_id'],
            'count' => $wporg_atts['count'],
            'second_product_title' => $wporg_atts['second_product_title'],

        )
    );


    ob_start(); //Start remembering everything that would normally be outputted, but don't quite do anything with it yet

?>



    <div id='product-component-<?php echo $wporg_atts['product_id'] ?>'></div>
    <script type="text/javascript">
        /*<![CDATA[*/
        window.addEventListener('load', function() {
            (function() {



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
                    ShopifyBuy.UI.onReady(client).then(function(ui) {



                        ui.createComponent('product', {
                            id: '<?php echo $wporg_atts['product_id'] ?>',
                            node: document.getElementById('product-component-<?php echo $wporg_atts['product_id'] ?>'),
                            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
                            options: {
                                "cart": {
                                    "text": {
                                        "total": "Zwischensumme",
                                        "button": "Checkout"
                                    },
                                    "popup": false,
                                    events: {
                                        addVariantToCart: function(cart){
                                            ui.components.cart[0].updateCacheItem(product.storefrontId,12)
                                        },
                                        updateItemQuantity: function(cart) {




                                            setTimeout(function() {
                                     
                                            
                                                //  console.log(ui.components.cart[0])
                                                //   updateFreeItemToCart(cart.lineItemCache)
                                                //     freeItem(ui.components.cart[0])
                                                freeItem(cart, '<?php echo $wporg_atts['second_product_title'] ?>', <?php echo $wporg_atts['count'] ?>, <?php echo $wporg_atts['second_product_id'] ?>)

                                            }, 1000);
                                        },
                                    },
                                },
                                "product": {
                                    events: {


                                        addVariantToCart: function(product) {



                                            setTimeout(function() {
                                                window.cart = ui.components.cart[0]
                                                freeItem(window.cart, '<?php echo $wporg_atts['second_product_title'] ?>', <?php echo $wporg_atts['count'] ?>, <?php echo $wporg_atts['second_product_id'] ?>)
                                                //  updateFreeItemToCart(window.cart.lineItemCache)
                                            }, 1000);



                                        },
                                        updateQuantity: function(product) {
                                            window.cart = ui.components.cart[0]

                                            setTimeout(function() {
                                                freeItem(window.cart, '<?php echo $wporg_atts['second_product_title'] ?>', <?php echo $wporg_atts['count'] ?>, <?php echo $wporg_atts['second_product_id'] ?>)

                                            }, 1000);

                                        },
                                        openCheckout: function(product) {},
                                    },
                                    "styles": {
                                        "product": {
                                            "@media (min-width: 601px)": {
                                                "max-width": "calc(25% - 20px)",
                                                "margin-left": "20px",
                                                "margin-bottom": "50px"
                                            }
                                        },
                                        "title": {
                                            "font-family": "Droid Sans, sans-serif",
                                            "font-size": "19px",
                                            "color": "#000000"
                                        },
                                        "button": {
                                            "font-family": "PT Sans, sans-serif",
                                            "font-size": "17px",
                                            "padding-top": "16.5px",
                                            "padding-bottom": "16.5px",
                                            ":hover": {
                                                "background-color": "#841f7f"
                                            },
                                            "background-color": "#93228d",
                                            ":focus": {
                                                "background-color": "#841f7f"
                                            },
                                            "border-radius": "17px",
                                            "padding-left": "64px",
                                            "padding-right": "64px"
                                        },
                                        "quantityInput": {
                                            "font-size": "17px",
                                            "padding-top": "16.5px",
                                            "padding-bottom": "16.5px"
                                        },
                                        "price": {
                                            "font-family": "PT Sans, sans-serif",
                                            "font-weight": "bold",
                                            "color": "#0f0f0f"
                                        },
                                        "compareAt": {
                                            "font-family": "PT Sans, sans-serif",
                                            "font-weight": "bold",
                                            "color": "#0f0f0f"
                                        },
                                        "unitPrice": {
                                            "font-family": "PT Sans, sans-serif",
                                            "font-weight": "bold",
                                            "color": "#0f0f0f"
                                        }
                                    },
                                    "text": {
                                        "button": "12er Tray kaufen*"
                                    },
                                    "googleFonts": [
                                        "Droid Sans",
                                        "PT Sans"
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
                                            "font-family": "PT Sans, sans-serif",
                                            "font-size": "17px",
                                            "padding-top": "16.5px",
                                            "padding-bottom": "16.5px",
                                            ":hover": {
                                                "background-color": "#841f7f"
                                            },
                                            "background-color": "#93228d",
                                            ":focus": {
                                                "background-color": "#841f7f"
                                            },
                                            "border-radius": "17px",
                                            "padding-left": "64px",
                                            "padding-right": "64px"
                                        },
                                        "quantityInput": {
                                            "font-size": "17px",
                                            "padding-top": "16.5px",
                                            "padding-bottom": "16.5px"
                                        },
                                        "title": {
                                            "font-family": "Helvetica Neue, sans-serif",
                                            "font-weight": "bold",
                                            "font-size": "26px",
                                            "color": "#4c4c4c"
                                        },
                                        "price": {
                                            "font-family": "Helvetica Neue, sans-serif",
                                            "font-weight": "normal",
                                            "font-size": "18px",
                                            "color": "#4c4c4c"
                                        },
                                        "compareAt": {
                                            "font-family": "Helvetica Neue, sans-serif",
                                            "font-weight": "normal",
                                            "font-size": "15.299999999999999px",
                                            "color": "#4c4c4c"
                                        },
                                        "unitPrice": {
                                            "font-family": "Helvetica Neue, sans-serif",
                                            "font-weight": "normal",
                                            "font-size": "15.299999999999999px",
                                            "color": "#4c4c4c"
                                        }
                                    },
                                    "googleFonts": [
                                        "PT Sans"
                                    ],
                                    "text": {
                                        "button": "Add to cart"
                                    }
                                },
                                "option": {},
                                "toggle": {
                                    "styles": {
                                        "toggle": {
                                            "font-family": "PT Sans, sans-serif",
                                            "background-color": "#93228d",
                                            ":hover": {
                                                "background-color": "#841f7f"
                                            },
                                            ":focus": {
                                                "background-color": "#841f7f"
                                            }
                                        },
                                        "count": {
                                            "font-size": "17px"
                                        }
                                    },
                                    "googleFonts": [
                                        "PT Sans"
                                    ]
                                }
                            },
                        });
                    });
                }
            })();

        });
        /*]]>*/



    </script>

<?php

    $output = ob_get_contents(); //Gives whatever has been "saved"
    ob_end_clean(); //Stops saving things and discards whatever was saved
    ob_flush(); //Stops saving and outputs it all at once
    return $output;
}

/**
 * 
 * style="display:none!important"
 * 
 * Central location to create all shortcodes.
 */
function shortcodes_init()
{
    add_shortcode('add_product_shortcode', 'add_product_shortcode');
}

add_action('init', 'shortcodes_init');
