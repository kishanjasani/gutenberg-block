<?php
/**
 * Plugin Name:       My Gutenberg Block
 * Plugin URI:        https://kishanjasani.github.io/portfolio/gutenberg-basics/
 * Description:       Custom gutenberg plugin.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Kishan Jasani
 * Author URI:        https://kishanjasani.github.io/portfolio/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       jk
 * Domain Path:       /languages
 */

/**
 * Custom Gutenberg functions
 */

function jk_gutenberg_default_colors() {
	add_theme_support(
		'editor-color-palette',
		[
			[
				'name'  => 'White',
				'slug'  => 'white',
				'color' => '#ffffff',
			],
			[
				'name'  => 'Black',
				'slug'  => 'black',
				'color' => '#000000',
			],
			[
				'name'  => 'Pink',
				'slug'  => 'pink',
				'color' => '#ff4444',
			],
		]
	);

	add_theme_support( 'experimental-custom-spacing' );
}

add_action( 'init', 'jk_gutenberg_default_colors' );

function jk_gutenberg_blocks() {
	wp_register_script( 'custom-cta-js', plugins_url( '/build/index.js', __FILE__ ), array( 'wp-blocks', 'wp-editor', 'wp-i18n' ) );
	wp_register_script( 'custom-color-js', plugins_url( '/build/color.js', __FILE__ ), array( 'wp-blocks', 'wp-editor', 'wp-i18n', 'wp-components' ) );
	register_block_type( 'jk/custom-cta', array(
		'editor_script' => 'custom-cta-js',
	) );

	register_block_type( 'jk/custom-color', array(
		'editor_script' => 'custom-color-js',
	) );
}
add_action( 'init', 'jk_gutenberg_blocks' );
