const { registerBlockType } = wp.blocks;

registerBlockType( 'jk/custom-cta', {

	// built-in attributes
	title: 'Custom Block',
	description: 'Block to generate a custom Call to Action',
	icon: 'format-image',
	category: 'layout',

	// custom attributes
	attributes: {},

	// custom functions

	// built-in functions
	edit() {
		return (
			<div>Hello</div>
		);
	},

	save() {},
} );
