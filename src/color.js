const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'jk/custom-color', {

	// built-in attributes
	title: __( 'Custom Color Pallate' ),
	description: __( 'Block to generate a custom Color Pallate to Action' ),
	icon: 'format-image',
	category: 'layout',

	// custom attributes
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: 'h2'
		},
		body: {
			type: 'string',
			source: 'html',
			selector: 'p'
		}
	},

	// built-in functions
	edit( { attributes, setAttributes } ) {

		const { title, body } = attributes;
		// custom functions
		function onChangeTitle( newTitle ) {
			setAttributes( { title: newTitle } );
		}

		function onChangeBody( newBody ) {
			setAttributes( { body: newBody } );
		}

		return ( [
			<div className="cta-container">
			<RichText key="editable"
		tagName="h2"
		placeholder={ __( "Your CTA Title", 'jk' ) }
		value={ title }
		onChange={ onChangeTitle } />

		<RichText key="editable"
		tagName="p"
		placeholder= { __( "Your CTA Description", 'jk' ) }
		value={ body }
		onChange={ onChangeBody } />
		</div>
	] );
	},

	save( { attributes } ) {
		const { title, body } = attributes;
		return (
			<div className="cta-container">
			<h2>{ title }</h2>
			<RichText.Content tagName="p"
		value={ body } />
		</div>
	);
	},
} );
