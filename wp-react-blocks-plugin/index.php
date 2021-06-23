<?php

/**
 * Plugin Name: WP React Components
 * Plugin URI: https://github.com/devgateway/dg-wp-react
 * Description: Custom UI Components.
 * Version: 0.1.0
 * Author: Sebastian Dimunzio
  * @package dg
 */

defined( 'ABSPATH' ) || exit;

function add_custom_block_categories( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'wp-react-lib-blocks',
				'title' => __( 'React Libs Blocks', 'wp-react-lib-blocks' ),
			),
		)
	);
}


add_filter( 'block_categories', 'add_custom_block_categories', 10, 2);



include 'blocks/index.php';
