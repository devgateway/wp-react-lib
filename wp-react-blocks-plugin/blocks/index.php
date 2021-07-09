<?php

/**
 * Plugin Name: WP React Lib UI Components
 * Plugin URI:
 * Description:
 * Version: 1.0.2
 * Author: Sebastian Dimunzio
 *
 * @package wp-react-lib
 */

defined( 'ABSPATH' ) || exit;


/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'wp_react_lib_init' );

function wp_react_lib_init() {
      // automatically load dependencies and version

        $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

        wp_register_script(
            'wp-lib-block-editor',
            plugins_url( 'build/index.js', __FILE__ ),
            $asset_file['dependencies'],
            $asset_file['version']
        );

        wp_register_style(
            'wp-lib-block-editor',
            plugins_url( 'editor.css', __FILE__ ),
            array( ),
            filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
        );

        wp_register_style(
            'wp-lib-block-block',
            plugins_url( 'style.css', __FILE__ ),
            array( ),
            filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
        );

        register_block_type( 'wp-react-lib/wp-react-lib-blocks', array(
            'editor_script' => 'wp-lib-block-editor',
            'editor_style'  => 'wp-lib-block-editor',
            'style'         => 'wp-lib-block-block',
        ) );

}
