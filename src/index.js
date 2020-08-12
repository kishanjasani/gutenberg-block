const { registerBlockType } = wp.blocks;

registerBlockType( 'jk/custom-cta', {

	// built-in attributes
	title: 'Custom Block',
	description: 'Block to generate a custom Call to Action',
	icon: 'format-image',
	category: 'layout',

	// custom attributes
	attributes: {
		author: {
			type: 'string'
		}
	},

	// built-in functions
	edit( { attributes, setAttributes } ) {
		// custom functions
		function updateAuthor( e ) {
			setAttributes( { author: e.target.value } );
		}

		return (
			<input type="text" value={ attributes.author } onChange={ updateAuthor } />
		);
	},

	save( { attributes } ) {
		return (
			<div>
				<p> Author Name: <i> { attributes.author } </i> </p>
			</div>
		);
	},
} );
