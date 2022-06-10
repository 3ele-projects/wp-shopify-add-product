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
  



    // override default attributes with user attributes
    $args = shortcode_atts(
        array(
            'product_id' => 'WordPress.org',
            'second_product_id' => 'WordPress.org',
            'count' => 12,
            'second_product_title' => 'Mehrwertpfand',
            'button_text' => '12er Tray kaufen*',
            'button_bg_color' => '#585dc4',
            'button_bg_color_hover' => '#4f54b0'
        ),
        $atts,
        $tag
    );
    
    wp_enqueue_script('wp_shopify_add_js', plugins_url('/js/add_product.js', __FILE__), array('jquery'), '', true);
    wp_enqueue_script( 'by-button-storefront', 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js', [], '2.0.0', true );

    wp_localize_script(
        'wp_shopify_add_js',
        'script_vars',
        array(
            'product_id' => $args['product_id'],
            'second_product_id' => $args['second_product_id'],
            'count' => $args['count'],
            'second_product_title' => $args['second_product_title'],

        )
    );

 

    ob_start(); //Start remembering everything that would normally be outputted, but don't quite do anything with it yet

?>



    <div id='product-component-<?php echo $args['product_id'] ?>'></div>

    <script>
        window.addEventListener('DOMContentLoaded', function() {
const count = <?php echo $args['count'];?>;
        const client = ShopifyBuy.buildClient({
            domain: 'pahua-drink.myshopify.com',
            storefrontAccessToken: 'f08170a8fcb02e56abbc5c4304f565ed',
        });
        const ui = ShopifyBuy.UI.init( client );

        ui.createComponent('product', {
            
            id: '<?php echo $args['product_id'] ?>',
            node: document.getElementById('product-component-<?php echo $args['product_id'] ?>'),
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: {
                "cart": {
                    DOMEvents: {
                        'click .shopify-buy__quantity-increment': function ( event, target ) {               
                            const cart = this.component; 
                            console.log( 'clicked up' ); 
                            const id = target.getAttribute('data-line-item-id');
                            let index = 0;
                            // get index of clicked product
                            cart.lineItemCache.map( ( k, i ) => {
                                if( id === k.id ) {
                                    index = i;
                                }
                            } );
                            const qnt = cart.lineItemCache[index].quantity;
                            const newQnt = qnt+1;

                            customUpdateItem( cart, index, newQnt )
                                .then( () => {
                                    customUpdatePfandItem( cart, count )
                                } );
                            
                            return true;
                        },
                        'click .shopify-buy__quantity-decrement': function ( event, target ) {
                            const cart = this.component; 
                            console.log( 'clicked down' ); 
                            const id = target.getAttribute('data-line-item-id');
                            let index = 0;      
                            // get index of clicked product
                            cart.lineItemCache.map( ( k, i ) => {
                                if( id === k.id ) {
                                    index = i;
                                }
                            } );
                            const qnt = cart.lineItemCache[index].quantity;
                            const newQnt = qnt-1;

                            customUpdateItem( cart, index, newQnt )
                                .then( () => {
                                    customUpdatePfandItem( cart, count )
                                } );
                            
                            return true;
                        },
                        'blur .shopify-buy__cart-item__quantity-input': function ( event, target ) {
                            const cart = this.component; 
                            const id = target.getAttribute('data-line-item-id');
                            let index = 0;      
                            // get index of clicked product
                            cart.lineItemCache.map( ( k, i ) => {
                                if( id === k.id ) {
                                    index = i;
                                }
                            } );
                            const qnt = cart.lineItemCache[index].quantity;
                           
                            const newQnt = parseInt(target
                            .value);

                            customUpdateItem( cart, index, newQnt )
                                .then( () => {
                                    customUpdatePfandItem( cart, count )
                                } );

                        },
                    },
                    "text": {
                        "total": "Zwischensumme",
                        "button": "Checkout"
                    },
                    "popup": false,
                    events: {
                        addVariantToCart: function(cart){
                    
                        },
                        updateItemQuantity: function( cart ) {                                                                                 
                        
                        },
                    },
                },
                "product": {
                    events: {
                        addVariantToCart: function( product ) {
                            console.log('product: addVariant' )
                       

                            setTimeout( () => {
                                addPfandItem( 
                                    ui.components.cart[0], 
                                    '<?php echo $args['second_product_id'] ?>', 
                                    '<?php echo $args['second_product_id'] ?>', 
                                    12 
                                ).then( () => {
                                    setTimeout( () => {
                                        console.log('update new added item')
                                        customUpdatePfandItem( ui.components.cart[0], 12 );
                                    }, 1000 )
                                } );
                            }, 1000 )
                        },
                        updateQuantity: function(product) {
                            console.log('product: updateQnt')
                            window.cart = ui.components.cart[0]
                        
                            setTimeout(function() {
                                freeItem(window.cart, '<?php echo $args['second_product_title'] ?>', <?php echo $args['count'] ?>, <?php echo $args['second_product_id'] ?>)
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
                                "background-color": "<?php echo $args['button_bg_color_hover'] ?>"
                            },
                            "background-color": "<?php echo $args['button_bg_color'] ?>",
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
                        "button": "<?php echo $args['button_text'] ?>"
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
