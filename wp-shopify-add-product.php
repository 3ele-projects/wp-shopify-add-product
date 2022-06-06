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

if(!function_exists('wp_shopify_add_js')){
    function wp_shopify_add_js() {


        global $post;
     
        $deps = array('jquery');
        $version= '1.0'; 
        $in_footer = true;
	
	
       
     
}
}

function add_product_shortcode( $atts = [], $content = null, $tag = '' ) {
    // normalize attribute keys, lowercase
    
    $atts = array_change_key_case( (array) $atts, CASE_LOWER );
	$domain = "";
		$storefrontAccessToken = "";



    // override default attributes with user attributes
    $wporg_atts = shortcode_atts(
        array(
            'product_id' => 'WordPress.org',
            'second_product_id' => 'WordPress.org',
            'count' => 12,
            'second_product_title' => 'Mehrwertpfand',
        ), $atts, $tag
    );
    wp_enqueue_script('wp_shopify_add_js', plugins_url( '/js/add_product.js', __FILE__ ), array('jquery'), '', true);
    wp_localize_script('wp_shopify_add_js', 'script_vars', array(
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
<div  id='product-component-<?php echo $wporg_atts['product_id'] ?>-<?php echo $wporg_atts['second_product_id'] ?>'></div>
                   


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
function shortcodes_init() {
    add_shortcode( 'add_product_shortcode', 'add_product_shortcode' );
}
 
add_action( 'init', 'shortcodes_init' );